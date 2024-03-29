import React, { useEffect, useState } from "react";
import style from "../../styles/Form.module.css";
import Bread from "../Bread";
import Login from "../forms/Login";
import PersonalInfo from "../forms/PersonalInfo";
import ProfessionalInfo from "../forms/ProfessionalInfo";
import WorkInfo from "../forms/WorkInfo";
import { getUserPreciseLocation } from "../../utils/location";

export default function Home() {
  const [page, setPage] = useState(2);
  const [seller, setSeller] = useState({
    image: null,
    name: "",
    userName: "",
    email: "",
    phone_number: "",
    city: "",
    profession: "",
    gender: "",
    experience: "",
    services: [],
    skills: [],
    collegeName: "",
    resume: null,
    description: "",
    socialMediaLinks: [],
    experienceDetails: [],
    images: [null, null, null, null, null, null],
    videos: [null, null, null, null, null, null],
    coordinates: { longitude: 0, latitude: 0 },
  });

  useEffect(() => {
    console.log(seller);
  }, [seller]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [page]);

  useEffect(() => {
    getUserPreciseLocation().then((location) => {
      setSeller({ ...seller, coordinates: { ...location } });
    });
  }, []);

  return (
    <div className={style.Container}>
      <div className={style.Center}>
        <Bread page={page} setPage={setPage} />
        {page === 1 ? (
          <Login setPage={setPage} seller={seller} setSeller={setSeller} />
        ) : null}
        {page === 2 ? (
          <PersonalInfo
            seller={seller}
            setSeller={setSeller}
            setPage={setPage}
          />
        ) : null}
        {page === 3 ? (
          <ProfessionalInfo
            seller={seller}
            setSeller={setSeller}
            setPage={setPage}
          />
        ) : null}
        {page === 4 ? (
          <WorkInfo seller={seller} setSeller={setSeller} setPage={setPage} />
        ) : null}
      </div>
    </div>
  );
}
