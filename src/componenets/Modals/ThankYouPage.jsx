import * as React from "react";

function ThankYouPage() {
  const handleBackHomeClick = () => {
    window.location.href = "https://blackfoxmetaverse.io/";
  };

  return (
    <main className="mainPage">
      <section className="thank-you-container">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/6a32519b450b99492c7385e65a1b3a78684d428de046766b85598d4fea60b8ce?apiKey=91ddce01d5c046adbb0d93d1184c8d50&"
          alt="Thank you illustration"
          className="thank-you-image"
        />
        <h1 className="thank-you-title">Thank you for Submitting!</h1>
        <p className="thank-you-description">
          You have successfully subscribed to our list. We will let you know
          when we launch.
        </p>
        {/* <button onClick={handleBackHomeClick} className="back-home-button">
          Go back Home
        </button> */}
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

export default ThankYouPage;
