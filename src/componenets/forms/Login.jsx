import React, { useState } from "react";
import style from "../../styles/Form.module.css";
import otpStyle from "../../styles/Otp.module.css";
import { auth } from "./../../utils/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import OTPInput from "react-otp-input";
import axios from "axios";
import SubscriptionConfirmation from "../Modals/SubscriptionConfirmation";

export default function Login({ setPage }) {
  const [isOTP, setIsOTP] = useState(false);
  const [otp, setOtp] = useState("");
  const [isExistingUser, setIsExistingUser] = useState(false);

  async function loginUser(token) {
    try {
      const response = await axios.get(
        "https://api.blackfoxmetaverse.io/main/login",

        {
          headers: {
            token: `${token}`,
          },
        }
      );
      return Promise.resolve(response.data.check);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // ...
        },
      },
      auth
    );
  };

  const handleSendOTP = (event) => {
    event.preventDefault();
    const phone_number = event.target["phone_number"].value;
    // console.log(phone_number);
    generateRecaptcha();
    let appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, `+91${phone_number}`, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        console.log(confirmationResult);
        setIsOTP(true);
      })
      .catch((error) => {
        // Error; SMS not sent
        console.error(error);
        alert(`User couldn't sign in ${error}`);
      });
  };

  const verifyOtp = (event) => {
    event.preventDefault();

    if (otp.length === 6) {
      // verifu otp
      let confirmationResult = window.confirmationResult;
      confirmationResult
        .confirm(otp)
        .then((result) => {
          // User signed in successfully.
          let token = result.user.accessToken;
          let uid = result.user.uid;
          // console.log(uid);
          sessionStorage.setItem("bfm-form-seller-token", token);
          sessionStorage.setItem("bfm-form-seller-uid", uid);

          loginUser(token)
            .then((data) => {
              if (!data.isSeller) {
                setPage(2);
              } else {
                setIsExistingUser(true);
                alert("already a seller");
              }
            })
            .catch((err) => {
              console.log("error", err);
            });

          // console.log(token);
        })
        .catch((error) => {
          // User couldn't sign in (bad verification code?)
          // ...
          alert("User couldn't sign in (bad verification code?)");
        });
    }
  };

  return (
    <div>
      <div className={style.Page}>
        <div className={style.Header}>Verify yourself</div>
        <div className={style.Subtext}>
          Please enter your phone number. You will receive a text message to
          verify your account. Message & data rates may apply.
        </div>
        <form onSubmit={handleSendOTP} className="formLayout">
          <div className={style.TextField}>
            <label htmlFor="phone_number" className={style.Label}>
              Phone Number
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
                placeholder=""
              />
            </div>
          </div>
          {!isOTP ? (
            <button className="PrimaryBtn" type="submit" id="OtpButton">
              {" "}
              Get OTP
            </button>
          ) : null}
        </form>

        {isOTP ? (
          <form onSubmit={verifyOtp} className="formLayout">
            <div className={otpStyle.Container}>
              <div className={otpStyle.Label}>Enter OTP</div>
              <OTPInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                inputStyle={otpStyle.inputStyle}
                containerStyle={otpStyle.containerStyle}
                placeholder="000000"
                renderInput={(props) => <input {...props} />}
              />
              <div type="button" className={otpStyle.Resend}>
                Resend OTP
              </div>
            </div>
            <button
              type="submit"
              id="OtpButton"
              className={`PrimaryBtn ${style.Btn}`}
            >
              Verify & Continue
            </button>
          </form>
        ) : null}
      </div>
      <div id="recaptcha"></div>
      {isExistingUser && <SubscriptionConfirmation />}
    </div>
  );
}
