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

  return (
    <HashRouter>
      <Navbar />
      <hr />
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<TandC />} path="/terms-and-conditions" />
        <Route element={<Acknowledge />} path="/privacy-policy" />
      </Routes>
      {/* <Home /> */}
    </HashRouter>
  );
}

export default App;
