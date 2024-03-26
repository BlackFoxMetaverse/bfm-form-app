import style from "../styles/Navbar.module.css";
import bfmlogo from "../assets/Frame.svg";

const Navbar = () => {
  return (
    <nav className={style.Container}>
      <div className={style.Center}>
        <div className={style.Wrapper}>
          <img src={bfmlogo} alt="logo"></img>
          <div className={style.Heading}>
            Registration
            {/* <span className={style.Subtext}>In progress</span> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
