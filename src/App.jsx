import { useEffect } from "react";
import Navbar from "./componenets/Navbar";
import Home from "./componenets/screens/Home";
import ReactGA from "react-ga4";
import { HashRouter, Route, Routes } from "react-router-dom";
import TandC from "./componenets/screens/TandC";
import Acknowledge from "./componenets/screens/Acknowledge";

function App() {
  useEffect(() => {
    console.log("Initializing Google Analytics...");

    // Initialize Google Analytics
    ReactGA.initialize("G-L4LNX64KCQ");

    // Track the initial pageview
    ReactGA.send({
      hitType: "pageview",
      page: window.location.pathname,
      title: document.title,
    });

    console.log("Google Analytics initialized. Tracking initial pageview.");
  }, []);

  if (navigator.userAgent.includes("Instagram")) {
    return (
      <main
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button type="button" className="PrimaryBtn">
          <a href={location.href} target="_blank" download>
            Open In Browser
          </a>
        </button>
      </main>
    );
  } else {
    return (
      <HashRouter>
        <Navbar />
        <hr />
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<TandC />} path="/terms-and-conditions" />
          <Route element={<Acknowledge />} path="/privacy-policy" />
        </Routes>
      </HashRouter>
    );
  }
}

export default App;
