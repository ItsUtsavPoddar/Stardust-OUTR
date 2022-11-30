import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Book from "./pages/Book";
import Map from "./pages/Map";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Error from "./pages/404";
import Patient from "./pages/Patient";
import AlertState from "./context/alerts/AlertState";
import HospitalState from "./context/hospitals/HospitalState";
import Analytical from "./pages/Analytical";

const AppRouter = () => {
  return (
    <div className="App">
      <AlertState>
      <HospitalState>
      <Router>
        <Routes>
          <Route path="/" exact element={Home} />
          <Route path="/patient" exact element={Patient} />
          <Route path="/analytical" exact element={Analytical} />
          <Route path="/about" exact element={About} />
          <Route path="/contact" exact element={Contact} />
          <Route path="" element={Error} />
        </Routes>
      </Router>
      </HospitalState>
      </AlertState>
      
    </div>
  );
};

export default AppRouter;
