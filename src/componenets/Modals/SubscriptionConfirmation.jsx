import * as React from "react";

function SubscriptionConfirmation({ username, uid }) {
  console.log({ uid, username });
  const handleBackHomeClick = () => {
    window.location.href = `https://portfolio.blackfoxmetaverse.io/profile/${username}?uid=${uid}`;
  };

  return (
    <>
      <style jsx>{`
      .mainModal{
        position: fixed;
        inset: 0;
        height: 100vh;
        background: white;
        display: flex;
        justify-content: center;
        align-items: center;
      }

        .container {
          align-items: center;
          color: #212121;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          max-width: 597px;
          width: 100%;
          background: white;
          padding: 10px;
          border-radius: 20px;
          aspect-ratio: 16/9;
        }

        .success-icon {
          aspect-ratio: 1.01;
          max-width: 100%;
          object-fit: auto;
          object-position: center;
          width: 199px;
        }

        .checkmark-icon {
          aspect-ratio: 3.45;
          margin-top: 17px;
          max-width: 100%;
          object-fit: auto;
          object-position: center;
          width: 103px;
        }

        .title {
          font: 700 30px Neue Helvetica, -apple-system, Roboto, Helvetica,
            sans-serif;
          margin-top: 16px;
          white-space: nowrap;
        }

        .description {
          align-self: stretch;
          font: 400 19px
          margin-top: 16px;
          text-align: center;
          width: 100%;
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
      `}</style>

      <main className="mainModal">
        <section className="container">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/963feeb721f285766f2a7526c504de8ce2e9b0cf651f9d4ab1f739efcba5d040?apiKey=91ddce01d5c046adbb0d93d1184c8d50&"
            alt="Success icon"
            className="success-icon"
          />
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/9e76872a7c3f5d0e938baf210fabbe25873fe4fa3e0047799e579afaa0c96e83?apiKey=91ddce01d5c046adbb0d93d1184c8d50&"
            alt="Checkmark icon"
            className="checkmark-icon"
          />
          <h2 className="title">User Already Exist</h2>
          <p className="description">
            You have successfully subscribed to our list. We will let you know
            when we launch.
          </p>

          <button onClick={handleBackHomeClick} className="back-home-button">
            View Profile
          </button>
        </section>
      </main>
    </>
  );
}

export default SubscriptionConfirmation;
