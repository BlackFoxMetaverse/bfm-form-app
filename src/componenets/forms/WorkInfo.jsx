import React, { useEffect, useRef, useState } from "react";
import style from "../../styles/Form.module.css";
import { FaDribbble, FaGithub, FaLinkedinIn, FaVideo } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
import { SiBehance } from "react-icons/si";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { IoAdd } from "react-icons/io5";
import ThankYouPage from "../Modals/ThankYouPage";
import { Link } from "react-router-dom";
import { getUserPreciseLocation } from "../../utils/location";

const SocialTypes = [
  {
    name: "LinkedIn",
    icon: <FaLinkedinIn />,
  },
  {
    name: "Instagram",
    icon: <RiInstagramFill />,
  },
  {
    name: "Behance",
    icon: <SiBehance />,
  },
  {
    name: "Dribble",
    icon: <FaDribbble />,
  },
  {
    name: "Github",
    icon: <FaGithub />,
  },
];

export default function WorkInfo({ seller, setSeller, setPage }) {
  const [isLoading, setIsLoading] = useState(false);
  const [descriptionwordCount, setDescriptionWordCount] = useState(0);
  const [wordExperienceCount, setExperienceWordCount] = useState(0);

  const [socialType, setSocialType] = useState("");
  const [socialLink, setSocialLink] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [dataToSend, setDataToSend] = useState({
    userName: "",
    uid: "",
  });

  const imagesRef = useRef([]);
  const videoRef = useRef(null);

  const handleAddExperinces = () => {
    setSeller((prev) => {
      return {
        ...prev,
        experienceDetails: [
          ...prev.experienceDetails,
          { title: "", link: "", content: "" },
        ],
      };
    });
  };

  const handleExpFields = ({ index, field, value }) => {
    setSeller((prev) => {
      let expArr = prev.experienceDetails;
      expArr[index][field] = value;
      return { ...prev, experienceDetails: expArr };
    });
  };

  const handleRemoveExp = (index) => {
    setSeller((prev) => {
      const newExpArr = prev.experienceDetails.filter((_, i) => i !== index);
      return { ...prev, experienceDetails: newExpArr };
    });
  };

  function getIconByName(name) {
    const socialType = SocialTypes.find(
      (social) => social.name.toLowerCase() === name?.toLowerCase()
    );
    return socialType ? socialType.icon : null;
  }

  function addSocials({ type, link }) {
    setSeller((prev) => {
      return {
        ...prev,
        socialMediaLinks: [
          ...prev.socialMediaLinks,
          { platformType: type, link: link },
        ],
      };
    });
    setSocialLink("");
    setSocialType("");
  }

  function removeSocials(index) {
    let arr = seller.socialMediaLinks;
    arr.splice(index, 1);
    setSeller({ ...seller, socialMediaLinks: arr });
  }

  const handleMediaAdd = ({ index, file }) => {
    const fileType = file?.type.split("/")[0];
    if (fileType === "video") {
      const video = document.createElement("video");
      video.src = URL.createObjectURL(file);
      video.onloadedmetadata = () => {
        if (video.duration <= 60) {
          setSeller((prev) => {
            let imgsArr = prev.images;
            imgsArr[index] = file;
            return { ...prev, images: imgsArr };
          });
        } else {
          alert("Please upload a video less than 1 minute in duration.");
        }
      };
    } else {
      setSeller((prev) => {
        let imgsArr = prev.images;
        imgsArr[index] = file;
        return { ...prev, images: imgsArr };
      });
    }
  };

  const handleRemoveMedia = (index) => {
    setSeller((prev) => {
      let imgsArr = prev.images;
      imgsArr[index] = null;
      return { ...prev, images: imgsArr };
    });

    if (imagesRef.current[index] && imagesRef.current[index].current) {
      imagesRef.current[index].current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", seller.image);
    formData.append("resume", seller.resume);
    formData.append("name", seller.name);
    formData.append("userName", seller.userName);
    formData.append("gender", seller.gender);
    formData.append("email", seller.email);
    formData.append("phone_number", "+91" + seller.phone_number);
    formData.append("city", seller.city);
    formData.append("profession", seller.profession);
    formData.append("experience", seller.experience);
    formData.append("collegeName", seller.collegeName);
    formData.append("description", seller.description);
    formData.append("services", JSON.stringify(seller.services));
    formData.append("skills", JSON.stringify(seller.skills));
    formData.append(
      "experienceDetails",
      JSON.stringify(seller.experienceDetails)
    );
    formData.append(
      "socialMediaLinks",
      JSON.stringify(seller.socialMediaLinks)
    );

    // Append images
    seller.images.forEach((media, index) => {
      formData.append("images", media);
    });

    if (seller.videos) {
      seller.videos.forEach((vid, index) => {
        formData.append("videos", vid);
      });
    }

    if (descriptionwordCount < 50) {
      setIsLoading(false);

      alert(
        "Error: You have to describe your self in atleast 50 words current word count " +
          descriptionwordCount
      );

      // getUserPreciseLocation()
      //   .then((location) => {
      //     setSeller({ ...seller, coordinates: { ...location } });
      //   })
      //   .catch((error) => {
      //     setSeller({ ...seller, coordinates: { latitude: 0, longitude: 0 } });
      //   });
      // // Append coordinates
      // formData.append("coordinates", JSON.stringify(seller.coordinates));
    } else {
      setIsLoading(true);
      // Append coordinates
      formData.append("coordinates", JSON.stringify(seller.coordinates));

      try {
        const token = sessionStorage.getItem("bfm-form-seller-token");
        const response = await axios.post(
          "https://api.blackfoxmetaverse.io/main/seller",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              token: token,
            },
          }
        );

        console.log(response.data);
        setDataToSend({ ...response.data?.data });
        setIsLoading(false);
        setIsCompleted(true);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
        alert("Some thing went wrong!");
        setIsCompleted(false);
      }
    }
  };

  // =================================================================
  function validateURL(url) {
    try {
      const isUrl = new URL(url);
      if (
        socialType.toLowerCase() ===
        (isUrl.hostname.includes("www")
          ? isUrl.hostname.split(".")[1]
          : isUrl.hostname.split(".")[0])
      ) {
        return true;
      } else {
        throw new Error();
      }
    } catch (err) {
      return false;
    }
  }

  const createFileUrl = (file) => {
    return URL.createObjectURL(file);
  };

  const handlePlay = (e) => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  // Function to update word count for description
  useEffect(() => {
    setDescriptionWordCount(
      seller.description.length && seller.description.split(" ").length
    );
  }, [seller.description]);

  // Function to update word count for experience details
  // useEffect(() => {
  //   seller.experienceDetails.forEach((exp, index) => {
  //     setExperienceWordCount(
  //       exp.content.length && exp.content.split(" ").length
  //     );
  //   });
  // }, [seller.experienceDetails]);
  // =================================================================

  return (
    <form onSubmit={handleSubmit} className="formLayout">
      <div className={style.Header}>Show Your work</div>
      <div className={style.Subtext}>
        Please enter your Work, Projects and Experiences.
      </div>
      <div className={style.Page}>
        <div className={style.TextField}>
          <label htmlFor="description" className={style.Label}>
            Description <span className="required">*</span>
          </label>
          <textarea
            type="text"
            name="description"
            id="description"
            placeholder="Tell us about yourself"
            className={style.TextAreaInput}
            required
            value={seller.description}
            onChange={(e) =>
              setSeller((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
          ></textarea>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <div
              style={{
                color: "red",
                opacity: 0.5,
              }}
            >
              Description should be of 50 to 300 words
            </div>
            <div>{descriptionwordCount} / 300 words</div>
          </div>
        </div>
        <div className={style.TextField}>
          <label htmlFor="socialMediaLinks" className={style.Label}>
            Connect with Social Media <span className="required">*</span>
          </label>
          {seller?.socialMediaLinks?.length > 0 && (
            <ul
              style={{
                display: "flex",
                gap: "1rem",
              }}
            >
              {seller?.socialMediaLinks?.map((social, index) => (
                <li key={index} className={style.SocialType}>
                  <div style={{ fontSize: 25.779 }}>
                    {getIconByName(social.platformType)}
                  </div>
                  <button
                    type="button"
                    className="TeriaryButton"
                    onClick={() => removeSocials(index)}
                  >
                    <RxCross2 />
                  </button>
                </li>
              ))}
            </ul>
          )}
          <div className={style.TextField}>
            <select
              name="social-media"
              id="social-media"
              value={socialType}
              required={seller.socialMediaLinks.length === 0}
              className={style.Dropdown}
              onChange={(e) => setSocialType(e.target.value)}
            >
              <option value="" disabled>
                Select a platform
              </option>
              {SocialTypes?.filter(
                (social) => social !== seller?.socialMediaLinks
              ).map((social, index) => (
                <option key={index} value={social.name}>
                  {social.name}
                </option>
              ))}
            </select>
            {socialType && (
              <input
                placeholder="Enter your profile URL"
                type="url"
                className={style.TextInput}
                value={socialLink}
                onChange={(e) =>
                  setSocialLink(() => {
                    if (e.target.value.trim() === "") {
                      setSocialLink("");
                      return;
                    }

                    // Check if the input value starts with "http://" or "https://"
                    if (
                      !e.target.value.startsWith("http://") &&
                      !e.target.value.startsWith("https://")
                    ) {
                      // If it doesn't, prepend "https://"
                      e.target.value = "https://" + e.target.value;
                    }

                    // Update the social link state
                    setSocialLink(e.target.value);
                  })
                }
              />
            )}
            {socialLink && validateURL(socialLink) ? (
              <button
                type="button"
                className="PrimaryBtn"
                onClick={() =>
                  addSocials({ type: socialType, link: socialLink })
                }
              >
                <IoAdd /> Add
              </button>
            ) : null}
            {socialLink !== "" || socialType ? (
              <button
                type="button"
                style={{
                  color: "#EA615D",
                }}
                className="SecondaryBtn"
                onClick={() => {
                  setSocialLink("");
                  setSocialType("");
                }}
              >
                <RxCross2 /> Clear
              </button>
            ) : null}
          </div>
        </div>
        <div
          style={{
            width: "100%",
          }}
          className="formLayout"
        >
          <label htmlFor="experienceDetails" className={style.Label}>
            Experiences <span className="required">*</span>
          </label>
          {seller.experienceDetails.map((obj, index, idx) => (
            <div key={index} className={style.TextField}>
              {/* <label htmlFor="title" className={style.Label}>
                  Title
                </label> */}
              <input
                type="text"
                name="title"
                required
                placeholder="Enter title of Project"
                className={style.TextInput}
                value={obj.title}
                onChange={(e) =>
                  handleExpFields({
                    index,
                    field: "title",
                    value: e.target.value,
                  })
                }
              />
              {/* <label htmlFor="link">Link</label> */}
              <input
                type="url"
                name="link"
                required
                placeholder="Paste Link"
                className={style.TextInput}
                value={obj.link}
                onChange={(e) =>
                  handleExpFields({
                    index,
                    field: "link",
                    value: e.target.value,
                  })
                }
              />
              {/* <label htmlFor="content">Details</label> */}
              <textarea
                type="text"
                name="content"
                required
                className={style.TextAreaInput}
                value={obj.content}
                onChange={(e) =>
                  handleExpFields({
                    index,
                    field: "content",
                    value: e.target.value,
                  })
                }
                placeholder="Describe your product and service"
              ></textarea>
              {/* <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    color: "red",
                    opacity: 0.5,
                  }}
                >
                  Experience details should be of 50 to 300 words
                </div>
                <div>{wordExperienceCount} / 300 words</div>
              </div> */}
              <button
                type="button"
                style={{
                  color: "#EA615D",
                }}
                className="SecondaryBtn"
                onClick={() => handleRemoveExp(index)}
              >
                <RxCross2 />
                Remove Experience
              </button>
            </div>
          ))}
          <button
            type="button"
            style={{
              color: "#4461F2",
            }}
            className="SecondaryBtn"
            onClick={handleAddExperinces}
          >
            <IoAdd />
            Add Experiences
          </button>
        </div>
        <div className={style.TextField}>
          <label className={style.Label}>
            Show your Gigs (
            <span className="instructions">(Image/Video), if any... </span>)
          </label>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <span className="">
              Note: <span className="required">*</span>
            </span>
            <span className="instructions">
              Video duration should be less than 1 minute
            </span>
          </div>
          <div className={style.GallaryImages}>
            {seller.images.map((media, index) =>
              media ? (
                <div
                  key={index}
                  className={`${style.GallaryImage} ${
                    index === 0 && style.FirstImage
                  }`}
                >
                  {media.type && media.type.startsWith("image/") ? (
                    <img
                      src={createFileUrl(media)}
                      alt=""
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.1)",
                      }}
                    />
                  ) : (
                    <video
                      src={createFileUrl(media)}
                      alt=""
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        cursor: "pointer",
                      }}
                      ref={videoRef}
                      onClick={handlePlay}
                    />
                  )}
                  <button
                    type="button"
                    className={style.ImageButton}
                    onClick={() => handleRemoveMedia(index, media)}
                  >
                    <RxCross2
                      style={{
                        padding: 2,
                        background: "white",
                        borderRadius: "50%",
                      }}
                    />
                  </button>
                  {media.type && media.type.startsWith("video/") && (
                    <button
                      type="button"
                      className={style.VideoButton}
                      onClick={() => handleRemoveMedia(index, media)}
                    >
                      <FaVideo
                        style={{
                          padding: 2,
                          background: "white",
                          borderRadius: "50%",
                        }}
                      />
                    </button>
                  )}
                </div>
              ) : (
                <label
                  htmlFor={media}
                  style={{
                    cursor: "pointer",
                    zIndex: 10,
                  }}
                  className={`${style.GallaryImage} ${
                    index === 0 && style.FirstImage
                  }`}
                  key={index}
                >
                  <input
                    type="file"
                    name={media}
                    id={media}
                    style={{
                      display: "none",
                    }}
                    onChange={(e) =>
                      handleMediaAdd({ index, file: e.target.files[0] })
                    }
                    ref={imagesRef.current[index]}
                  />
                  <IoAdd />
                </label>
              )
            )}
          </div>
        </div>

        <div className={style.CheckBox}>
          <input
            type="checkbox"
            name="agreetoshare"
            id="agreetoshare"
            required
          />
          <label htmlFor="agreetoshare" className={style.Label}>
            I willingly share my details and information. I am aware that my
            contact details will be accessible to both visitors and members of
            the BFM platform due to my personal choice and decision.
          </label>
        </div>
        <div className={style.CheckBox}>
          <input type="checkbox" name="agree" id="agree" required />
          <label htmlFor="agree" className={style.Label}>
            I agree to all{" "}
            <Link to="/terms-and-conditions" target="_blank">
              Terms & Conditions
            </Link>
            <span style={{ textDecoration: "none" }}> and </span>
            <Link to="/terms-and-conditions" target="_blank">
              Privacy Policy
            </Link>
          </label>
        </div>
        <button type="submit" className="PrimaryBtn" disabled={isLoading}>
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </div>
      {isCompleted && <ThankYouPage {...dataToSend} />}
      {seller.coordinates.longitude === 0 &&
        seller.coordinates.latitude === 0 && (
          <div on class="overlay">
            <div class="modal">
              <div class="modal-content">
                <div class="header">
                  <h3>Please allow the location permission</h3>
                  <div class="description">
                    <p>
                      Your location is mendatory to list you on our platform
                    </p>
                  </div>
                </div>
                <div class="footer">
                  <button
                    type="button"
                    onClick={async () => {
                      await getUserPreciseLocation().then((location) => {
                        setSeller({ ...seller, coordinates: { ...location } });
                      });
                    }}
                    class="close-button"
                  >
                    Allow
                  </button>
                  <button
                    type="button"
                    class="close-button"
                    onClick={() => {
                      document.querySelector(".overlay").style.display = "none";
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
    </form>
  );
}
