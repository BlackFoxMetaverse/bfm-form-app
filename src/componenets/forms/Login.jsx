import React, { useEffect, useState } from "react";
import style from "../../styles/Form.module.css";
import otpStyle from "../../styles/Otp.module.css";
import { auth } from "./../../utils/firebase";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailLink,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
} from "firebase/auth";
import OTPInput from "react-otp-input";
import axios from "axios";
import SubscriptionConfirmation from "../Modals/SubscriptionConfirmation";

export default function Login({ setPage, seller, setSeller }) {
  // const [isOTP, setIsOTP] = useState(false);
  // const [otp, setOtp] = useState("");
  const [isExistingUser, setIsExistingUser] = useState(false);
  const [isRegisterClicked, setIsRegisterClicked] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

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

  // const handleSendOTP = (event) => {
  //   event.preventDefault();
  //   const phone_number = event.target["phone_number"].value;
  //   // console.log(phone_number);
  //   generateRecaptcha();
  //   let appVerifier = window.recaptchaVerifier;
  //   signInWithPhoneNumber(auth, `+91${phone_number}`, appVerifier)
  //     .then((confirmationResult) => {
  //       // SMS sent. Prompt user to type the code from the message, then sign the
  //       // user in with confirmationResult.confirm(code).
  //       window.confirmationResult = confirmationResult;
  //       console.log(confirmationResult);
  //       setIsOTP(true);
  //     })
  //     .catch((error) => {
  //       // Error; SMS not sent
  //       console.error(error);
  //       alert(`User couldn't sign in ${error}`);
  //     });
  // };

  // const verifyOtp = (event) => {
  //   event.preventDefault();

  //   if (otp.length === 6) {
  //     // verifu otp
  //     let confirmationResult = window.confirmationResult;
  //     confirmationResult
  //       .confirm(otp)
  //       .then((result) => {
  //         // User signed in successfully.
  //         let token = result.user.accessToken;
  //         let uid = result.user.uid;
  //         // console.log(uid);
  //         sessionStorage.setItem("bfm-form-seller-token", token);
  //         sessionStorage.setItem("bfm-form-seller-uid", uid);

  //         loginUser(token)
  //           .then((data) => {
  //             if (!data.isSeller) {
  //               setPage(2);
  //             } else {
  //               setIsExistingUser(true);
  //               alert("already a seller");
  //             }
  //           })
  //           .catch((err) => {
  //             console.log("error", err);
  //           });

  //         // console.log(token);
  //       })
  //       .catch((error) => {
  //         // User couldn't sign in (bad verification code?)
  //         // ...
  //         alert("User couldn't sign in (bad verification code?)");
  //       });
  //   }
  // };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const token = result.user.accessToken;
      const { displayName, email, uid } = result.user;
      sessionStorage.setItem("bfm-form-seller-token", token);
      sessionStorage.setItem("bfm-form-seller-uid", uid);
      const data = await loginUser(token);
      if (!data.isSeller) {
        setPage(2);
        setSeller({
          ...seller,
          name: displayName,
          email: email,
        });
      } else {
        setIsExistingUser(true);
      }
    } catch (error) {
      console.error("Error signing in with Google:", error);
      alert("Failed to sign in with Google Please try after sometime");
      setIsExistingUser(false);
    }
  };

  useEffect(() => {
    const savedEmail = window.localStorage.getItem("userCustomEmail");

    signInWithEmailLink(auth, savedEmail)
      .then(async (result) => {
        const { displayName, email, uid } = result.user;
        const token = result.user.accessToken;
        sessionStorage.setItem("bfm-form-seller-token", token);
        sessionStorage.setItem("bfm-form-seller-uid", uid);

        localStorage.removeItem("userCustomEmail");

        await loginUser(token)
          .then((data) => {
            if (!data.isSeller) {
              setPage(2);
              setSeller({
                ...seller,
                name: displayName,
                email: email,
              });
            } else {
              setIsExistingUser(true);
            }
          })
          .catch((err) => {
            console.error(err);
            setIsExistingUser(false);
          });
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleSignInwithEmail = async (e) => {
    try {
      e.preventDefault();
      const enteredEmail = e.target["email"].value;
      // generateRecaptcha();
      await sendSignInLinkToEmail(auth, enteredEmail, {
        url: window.location.href,
        handleCodeInApp: true,
      }).then(() => {
        localStorage.setItem("userCustomEmail", enteredEmail);
        setIsEmailSent(true);
        setTimeout(() => {
          window.close();
        }, 3000);
      });
    } catch (error) {
      console.error("Error signing in with email:", error);
      alert("Failed to sign in with email. Please try again.");
      setIsExistingUser(false);
      setIsEmailSent(false);
    }
  };

  return (
    <div>
      <div className={style.Page}>
        {/* <div className={style.Header}>Verify yourself</div>
        <div className={style.Subtext}>
          Please enter your phone number. You will receive a text message to
          verify your account. Message & data rates may apply.
        </div> */}
        {/* <form onSubmit={handleSendOTP} className="formLayout">
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
        </form> */}

        <div>
          <div className={style.Page}>
            <div className={style.Header}>Register with us</div>
            <div className={style.Subtext}>
              Click the button below to sign in with your Google account.
            </div>
            <button className="googleBtn" onClick={handleGoogleSignIn}>
              <img src="/logo_google.svg" alt="" />
              Sign in with Google
            </button>
            <p
              style={{
                width: "100%",
                textAlign: "center",
                margin: 0,
              }}
            >
              or
            </p>
            {!isRegisterClicked ? (
              <button
                type="button"
                style={{
                  borderRadius: 100,
                  padding: 8,
                }}
                className="PrimaryBtn"
                onClick={() => setIsRegisterClicked(!isRegisterClicked)}
              >
                Register
              </button>
            ) : (
              <form
                className={style.TextField}
                action=""
                method="post"
                onSubmit={handleSignInwithEmail}
              >
                <input
                  type="email"
                  name="email"
                  id="email"
                  style={{
                    borderRadius: 100,
                    border: "1.5px solid rgba(91, 155, 233, 0.5)",
                  }}
                  className={style.TextInput}
                  placeholder="example@example.com"
                />
                <button
                  type="submit"
                  style={{
                    borderRadius: 100,
                    padding: 8,
                    border: "3px solid rgba(91, 155, 233, 0.5)",
                    color: isEmailSent && "rgba(91, 155, 233, 1)",
                  }}
                  className={isEmailSent ? "SecondaryBtn" : "PrimaryBtn"}
                >
                  {isEmailSent
                    ? "Check your email to Sign In"
                    : "Send Confirmation"}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* {isOTP ? (
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
        ) : null} */}
      </div>
      <div id="recaptcha"></div>
      {isExistingUser && <SubscriptionConfirmation />}
    </div>
  );
}
