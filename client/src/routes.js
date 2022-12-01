import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Error from "./pages/404";
import Patient from "./pages/Patient";
import AlertState from "./context/alerts/AlertState";
import HospitalState from "./context/hospitals/HospitalState";
import Analytical from "./pages/Analytical";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Hospital from "./pages/Hospital";

const AppRouter = () => {

  // Login Route
  


  return (
    <div className="App">
      <AlertState>
      <HospitalState>
      <Router>
        <Routes>
          <Route path="/" exact element={Home} />
          <Route path="/patient" exact element={Patient} />
          <Route path="/login" exact element={Login} />
          <Route path="/signup" exact element={SignUp} />
          <Route path="/analytical" exact element={Analytical} />
          <Route path="/hospital" exact element={Hospital} />
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
