import PropTypes from "prop-types";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import style from "../styles/Bread.module.css";

const Bread = ({ page, setPage }) => {
  const steps = [
    { title: "Verify Yourself", onClick: null },
    {
      title: "Personal Information",
      onClick: () => {
        if (page > 2) {
          setPage(2);
          return true;
        }
        return false;
      },
    },
    {
      title: "Professional Information",
      onClick: () => {
        if (page > 3) {
          setPage(3);
          return true;
        }
        return false;
      },
    },
    { title: "Show Your Work", onClick: null },
  ];

  return (
    <div className={style.Container}>
      <div className={style.Numbers}>
        {steps.map((step, index) => (
          <div
            key={index}
            onClick={step.onClick}
            className={page === index + 1 ? style.ActiveIndex : style.Index}
            style={{ cursor: step.onClick ? "pointer" : "default" }}
          >
            {page <= index + 1 ? (
              <div className={style.UnvisitedIndex}>{index + 1}</div>
            ) : (
              <IoCheckmarkCircleSharp size={27} color="rgba(74, 222, 128, 1)" />
            )}
          </div>
        ))}
      </div>
      <div className={style.Steps}>
        {steps.map((step, index) => (
          <div
            key={index}
            onClick={step.onClick}
            className={style.Text}
            style={{ cursor: step.onClick ? "pointer" : "default" }}
          >
            {step.title}
          </div>
        ))}
      </div>
    </div>
  );
};

Bread.propTypes = {
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
};

export default Bread;
