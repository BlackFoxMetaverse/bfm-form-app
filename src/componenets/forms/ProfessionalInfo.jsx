import React, { useEffect, useState } from "react";
import style from "../../styles/Form.module.css";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";

export default function ProfessionalInfo({ seller, setSeller, setPage }) {
  const [skillInput, setSkillInput] = useState("");
  const [serviceInput, setServiceInput] = useState("");
  const [skills, setSkills] = useState([]);
  const [services, setServices] = useState([]);
  const [profession, setProfession] = useState([]);
  const [colleges, setColleges] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get(
          `https://api.blackfoxmetaverse.io/suggestion/skills?keyword=${skillInput}`
        );
        setSkills(
          response.data?.skills?.filter(
            (skill) => !seller.skills.includes(skill.tag)
          )
        );
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    if (skillInput) {
      fetchSkills();
    } else {
      setSkills([]);
    }
  }, [skillInput, seller.skills]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          `https://api.blackfoxmetaverse.io/suggestion/services?keyword=${serviceInput}`
        );
        setServices(
          response.data?.services?.filter(
            (service) => !seller.services.includes(service.tag)
          )
        );
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    if (serviceInput) {
      fetchServices();
    } else {
      setServices([]);
    }
  }, [serviceInput, seller.services]);

  const handleAddSkills = (skill) => {
    setSeller((prev) => ({
      ...prev,
      skills: [...prev.skills, skill],
    }));
    setSkillInput("");
  };

  const handleAddServices = (service) => {
    setSeller((prev) => ({
      ...prev,
      services: [...prev.services, service],
    }));
    setServiceInput("");
  };

  const handleRemoveSkills = (index) => {
    setSeller((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  const handleRemoveServices = (index) => {
    setSeller((prev) => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index),
    }));
  };

  async function getProfession(e) {
    try {
      const profession = e.target.value;
      setSeller({ ...seller, profession: profession });
      const res = await axios.get(
        `https://api.blackfoxmetaverse.io/suggestion/professions?keyword=${profession}`
      );
      setProfession(res.data?.professions);
    } catch (error) {
      console.error("Error fetching profession:", error);
    }
  }

  const handleProfessionSelection = (selectedProfession) => {
    setSeller({ ...seller, profession: selectedProfession });
    setProfession([]);
  };

  async function getColleges(e) {
    try {
      const college = e.target.value;
      setSeller({ ...seller, collegeName: college });
      const res = await axios.get(
        `https://api.blackfoxmetaverse.io/suggestion/colleges?keyword=${college}`
      );
      setColleges(res.data?.colleges);
    } catch (error) {
      console.error("Error fetching colleges:", error);
    }
  }

  const handleCollegesSelection = (selectedProfession) => {
    setSeller({ ...seller, collegeName: selectedProfession });
    setColleges([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(4);
  };
  return (
    <form onSubmit={handleSubmit} className="formLayout">
      <div className={style.Header}>Professional Information</div>
      <div className={style.Subtext}>
        Please enter your Professional Information.
      </div>
      <div className={style.Page}>
        <div className={style.TextField}>
          <label htmlFor="city" className={style.Label}>
            Profession*
          </label>
          <input
            type="text"
            name="profession"
            id="profession"
            className={style.TextInput}
            placeholder="Select Your Profession"
            required
            value={seller.profession}
            onChange={(e) => getProfession(e)}
          />
          {seller?.profession !== "" && profession.length > 0 && (
            <div className={style.SuggestionContainer}>
              {profession?.map((prof, index) => (
                <div
                  key={index}
                  className={style.Suggestion}
                  onClick={() => handleProfessionSelection(prof["tag"])}
                >
                  {prof["tag"]}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className={style.TextField}>
          <label htmlFor="experience" className={style.Label}>
            Experience*
          </label>
          <select
            name="experience"
            id="experience"
            className={style.Dropdown}
            required
            value={seller.experience}
            onChange={(e) =>
              setSeller((prev) => ({
                ...prev,
                experience: e.target.value,
              }))
            }
          >
            <option value="" disabled>
              Experience in Years
            </option>
            <option value="0-1">0-1</option>
            <option value="1-3">1-3</option>
            <option value="3-5">3-5</option>
            <option value="5 and above">5 and above</option>
          </select>
        </div>
        <div className={style.TextField}>
          <label htmlFor="services" className={style.Label}>
            Services Provided*
          </label>
          {seller.services.length > 0 && (
            <div className={style.TagsContainer}>
              {seller.services.map((service, index) => (
                <div key={index} className={style.Tag}>
                  <button
                    className={style.Remove}
                    type="button"
                    onClick={() => handleRemoveServices(index)}
                  >
                    <RxCross1 />
                  </button>
                  <span>{service}</span>
                </div>
              ))}
            </div>
          )}
          {seller.services.length <= 7 && (
            <input
              type="text"
              name="services"
              id="services"
              required={seller.services.length === 0}
              placeholder="Enter Service"
              className={style.TextInput}
              value={serviceInput}
              onChange={(e) => setServiceInput(e.target.value)}
            />
          )}
          {serviceInput !== "" && services.length > 0 && (
            <div className={style.SuggestionContainer}>
              {services.map((service, index) => (
                <div
                  key={index}
                  className={style.Suggestion}
                  onClick={() => handleAddServices(service.tag)}
                >
                  {service.tag}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className={style.TextField}>
          <label htmlFor="skills" className={style.Label}>
            Skills*
          </label>
          {seller.skills.length > 0 && (
            <div className={style.TagsContainer}>
              {seller.skills.map((skill, index) => (
                <div key={index} className={style.Tag}>
                  <button
                    className={style.Remove}
                    type="button"
                    onClick={() => handleRemoveSkills(index)}
                  >
                    <RxCross1 />
                  </button>
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          )}
          {seller.skills.length <= 7 && (
            <input
              type="text"
              name="skills"
              id="skills"
              required={seller.skills.length === 0}
              className={style.TextInput}
              placeholder="Enter Skill"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
            />
          )}
          {skillInput && skills.length > 0 && (
            <div className={style.SuggestionContainer}>
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className={style.Suggestion}
                  onClick={() => handleAddSkills(skill.tag)}
                >
                  {skill.tag}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className={style.TextField}>
          <label htmlFor="collegeName" className={style.Label}>
            College Name
          </label>
          <input
            type="text"
            name="collegeName"
            id="collegeName"
            className={style.TextInput}
            placeholder="Select Your College"
            value={seller.collegeName}
            onChange={(e) => getColleges(e)}
          />
          {seller?.collegeName !== "" && colleges.length > 0 && (
            <div className={style.SuggestionContainer}>
              {colleges?.map((college, index) => (
                <div
                  key={index}
                  className={style.Suggestion}
                  onClick={() =>
                    handleCollegesSelection(college["College Name"])
                  }
                >
                  {college["College Name"]}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className={style.TextField}>
          <label htmlFor="resume" className={style.Label}>
            Resume
          </label>
          <div className={style.Resume}>
            <p>{seller.resume ? seller.resume.name : "Upload your Resume"}</p>
            <label htmlFor="resume">Upload</label>
            <input
              type="file"
              name="resume"
              id="resume"
              accept=".doc, .docx, .pdf"
              onChange={(e) =>
                setSeller((prev) => ({
                  ...prev,
                  resume: e.target.files[0],
                }))
              }
            />
          </div>
        </div>
        <button className="PrimaryBtn" type="submit" id="OtpButton">
          Save & Continue
        </button>
      </div>
    </form>
  );
}
