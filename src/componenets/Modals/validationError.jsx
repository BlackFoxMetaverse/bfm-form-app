import React from "react";
import { RxCrossCircled } from "react-icons/rx";

function ValidationErrorPage({ token }) {
  return (
    <main className="mainPage">
      <section className="thank-you-container">
        <RxCrossCircled
          style={{
            maxWidth: 269,
            width: "100%",
            fontSize: 100,
            color: "red",
          }}
        />
        <h1 className="thank-you-title">
          {token ? "Invalid Token" : "No Refferal Token"}
        </h1>
        <p className="thank-you-description">
          Requires a valid referal token to access this page.
        </p>
      </section>
      <style jsx>{`
        .mainPage {
          position: fixed;
          inset: 0;
          height: 100vh;
          background: white;
          z-index: 50;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .thank-you-container {
          align-items: center;
          color: #212121;
          display: flex;
          flex-direction: column;
          max-width: 666px;
          text-align: center;
        }

        .thank-you-image {
          aspect-ratio: 1.15;
          max-width: 100%;
          object-fit: auto;
          object-position: center;
          width: 282px;
        }

        .thank-you-title {
          font: 700 39px Neue Helvetica, -apple-system, Roboto, Helvetica,
            sans-serif;
          margin-top: 21px;
        }

        @media (max-width: 991px) {
          .thank-you-title {
            max-width: 100%;
          }
        }

        .thank-you-description {
          align-self: stretch;
          font: 400 24px Neue Helvetica, -apple-system, Roboto, Helvetica,
            sans-serif;
          margin-top: 21px;
          text-align: center;
          width: 100%;
        }

        @media (max-width: 991px) {
          .thank-you-description {
            max-width: 100%;
          }
        }

        .back-home-button {
          background-color: var(--Primary-1, #4461f2);
          border: none;
          border-radius: 3.172px;
          color: var(--Primary-blue, #fff);
          cursor: pointer;
          font: 450 15px/100% Neue Helvetica, -apple-system, Roboto, Helvetica,
            sans-serif;
          justify-content: center;
          margin-top: 22px;
          padding: 11px 41px;
          text-transform: capitalize;
          white-space: nowrap;
        }

        @media (max-width: 991px) {
          .back-home-button {
            padding: 0 20px;
            white-space: initial;
          }
        }
      `}</style>
    </main>
  );
}

export default ValidationErrorPage;
