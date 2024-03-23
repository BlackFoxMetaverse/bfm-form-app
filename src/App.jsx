import { useEffect } from "react";
import Navbar from "./componenets/Navbar";
import Home from "./componenets/screens/Home";
import ReactGA from "react-ga4";

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
    <main>
      <Navbar />
      <hr />
      <Home />
    </main>
  );
}

export default App;
