import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Book from "./pages/Book";
import Map from "./pages/Map";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Error from "./pages/404";
import Patient from "./pages/Patient";

const AppRouter = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={Home} />
          <Route path="/book" exact element={Book} />
          <Route path="/patient" exact element={Patient} />
          <Route path="/about" exact element={About} />
          <Route path="/contact" exact element={Contact} />
          <Route path="" element={Error} />
        </Routes>
      </Router>
    </div>
  );
};

export default AppRouter;
