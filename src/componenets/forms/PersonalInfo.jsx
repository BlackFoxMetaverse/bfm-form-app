import React, { useEffect, useState } from "react";
import style from "../../styles/Form.module.css";
import axios from "axios";
import { IoCameraOutline } from "react-icons/io5";

export default function PersonalInfo({ seller, setSeller, setPage }) {
  let phoneValidateTimeOut;
  let userNameValidateTimeOut;
  const [isPhoneValid, setIsPhoneValid] = useState(null);
  const [isUserNameValid, setIsUserNameValid] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [cities, setCities] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      isPhoneValid !== null &&
      isPhoneValid?.message === "Phone Number is valid" &&
      isUserNameValid
    ) {
      setPage(3);
    }
  };

  const checkPhone = async (value) => {
    try {
      const code = "+91";
      if (value === "") return Promise.resolve(false);
      const uid = sessionStorage.getItem("bfm-form-seller-uid");
      const response = await axios.get(
        `https://api.blackfoxmetaverse.io/check/phone?uid=${uid}&phone_number=${encodeURIComponent(
          code + value
        )}`
      );
      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const checkUserName = async (value) => {
    try {
      if (value === "") return Promise.resolve(false);
      const uid = sessionStorage.getItem("bfm-form-seller-uid");
      const response = await axios.get(
        `https://api.blackfoxmetaverse.io/check/userName?uid=${uid}&userName=${value}`
      );
      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  useEffect(() => {
    if (phoneValidateTimeOut) {
      clearTimeout(phoneValidateTimeOut);
    }
    phoneValidateTimeOut = setTimeout(() => {
      if (seller.phone_number.length < 10) {
        return;
      }
      checkPhone(seller.phone_number)
        .then((res) => {
          if (res) {
            setIsPhoneValid({
              color: "green",
              message: "Phone Number is valid",
            });
          } else {
            setIsPhoneValid({
              color: "red",
              message: "Phone Number already taken",
            });
          }
        })
        .catch((err) => {
          setIsPhoneValid({
            color: "red",
            message: "Phone Number already taken",
          });
        });
    }, 500);
  }, [seller.phone_number]);

  useEffect(() => {
    if (userNameValidateTimeOut) {
      clearTimeout(userNameValidateTimeOut);
    }
    userNameValidateTimeOut = setTimeout(() => {
      checkUserName(seller.userName)
        .then((res) => setIsUserNameValid(res))
        .catch((err) => setIsUserNameValid(false));
    }, 500);
  }, [seller.userName]);

  // =================================================================
  async function getCities(e) {
    try {
      const city = e.target.value;
      setSeller({ ...seller, city: city });
      const res = await axios.get(
        `https://api.blackfoxmetaverse.io/suggestion/cities?keyword=${city}`
      );
      setCities(res.data?.cities);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  }

  const handleCitySelection = (selectedCity) => {
    setSeller({ ...seller, city: selectedCity });
    setCities([]);
  };
  // =================================================================

  return (
    <form onSubmit={handleSubmit} className="formLayout">
      <div className={style.Header}>Personal Information</div>
      <div className={style.Subtext}>
        Please enter your Personal Information. To Become a seller on BFM.
      </div>
      <div className={style.Page}>
        <div className={style.Image}>
          {imageUrl ? (
            <img src={imageUrl} alt="" />
          ) : (
            <img
              src="https://i.pinimg.com/564x/70/dd/61/70dd612c65034b88ebf474a52ccc70c4.jpg"
              alt=""
            />
          )}
          <label htmlFor="image">
            <IoCameraOutline />
            <input
              type="file"
              name="image"
              id="image"
              accept="image/*"
              onChange={(e) => {
                setSeller((prev) => ({
                  ...prev,
                  image: e.target.files[0],
                }));
                setImageUrl(URL.createObjectURL(e.target.files[0]));
              }}
            />
          </label>
          {/* <div /> */}
        </div>
        <div className={style.TextField}>
          <label htmlFor="name" className={style.Label}>
            Name*
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Full Name"
            required
            value={seller.name}
            className={style.TextInput}
            onChange={(e) =>
              setSeller((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
          />
        </div>
        <div className={style.TextField}>
          <label htmlFor="userName" className={style.Label}>
            Username*
          </label>
          <input
            type="text"
            name="userName"
            id="userName"
            placeholder="username@2024"
            className={style.TextInput}
            required
            value={seller.userName}
            onChange={(e) =>
              setSeller((prev) => ({
                ...prev,
                userName: e.target.value,
              }))
            }
          />
          {seller.userName === "" ? null : isUserNameValid ? (
            <h4 style={{ color: "green", margin: 0 }}>Username available</h4>
          ) : (
            <h4 style={{ color: "red", margin: 0 }}>Username already taken</h4>
          )}
        </div>
        <div className={style.TextField}>
          <label htmlFor="gender" className={style.Label}>
            Gender*
          </label>
          <select
            name="gender"
            id="gender"
            value={seller.gender}
            className={style.Dropdown}
            onChange={(e) =>
              setSeller((prev) => ({
                ...prev,
                gender: e.target.value,
              }))
            }
            required
          >
            <option value="" disabled>
              Select a gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>
        </div>
        <div className={style.TextField}>
          <label htmlFor="email" className={style.Label}>
            Email Address*
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="randomemail@gmail.com"
            className={style.TextInput}
            // required
            disabled
            value={seller.email}
          />
        </div>
        <div
          // style={{
          //   display: "none",
          // }}
          className={style.TextField}
        >
          <label htmlFor="phone_number" className={style.Label}>
            Phone Number* (Whatsapp Number)
          </label>
          <div
            style={{
              display: "flex",
            }}
            className={style.NumberField}
          >
            <p className="m-0 font-p">+91</p>
            <input
              name="phone_number"
              type="number"
              id="phone_number"
              maxLength={10}
              required
              placeholder="1234567890"
              value={seller.phone_number}
              onChange={(e) =>
                setSeller({
                  ...seller,
                  phone_number: e.target.value,
                })
              }
            />
          </div>
          {seller.phone_number.length < 10 ? null : isPhoneValid ? (
            <h4 style={{ color: isPhoneValid?.color, margin: 0 }}>
              {isPhoneValid?.message}
            </h4>
          ) : (
            <h4 style={{ color: isPhoneValid?.color, margin: 0 }}>
              {isPhoneValid?.message}
            </h4>
          )}
        </div>
        <div className={style.TextField}>
          <label htmlFor="city" className={style.Label}>
            City*
          </label>
          <input
            type="text"
            name="city"
            id="city"
            className={style.TextInput}
            placeholder="Select Your City"
            required
            value={seller.city}
            onChange={(e) => getCities(e)}
          />
          {seller?.city !== "" && cities.length > 0 && (
            <div className={style.SuggestionContainer}>
              {cities?.map((city, index) => (
                <div
                  key={index}
                  className={style.Suggestion}
                  onClick={() => handleCitySelection(city["ASCII Name"])}
                >
                  {city["ASCII Name"]}
                </div>
              ))}
            </div>
          )}
        </div>
        <button
          disabled={isPhoneValid && !isUserNameValid}
          className="PrimaryBtn"
          type="submit"
        >
          Save & Continue
        </button>
      </div>
    </form>
  );
}
