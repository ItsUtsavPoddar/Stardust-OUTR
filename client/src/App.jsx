import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/404";
import ContactForm from "./pages/Contact";
import Base from "./layouts/Base";
import Patient from "./pages/Patient";
import AlertState from "./context/alerts/AlertState";
import HospitalState from "./context/hospitals/HospitalState";
import Analytical from "./pages/Analytical"
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Hospital from "./pages/Hospital";
import Profile from "./pages/Profile";
function App() {
  return (
    <div className="">
      <AlertState>
      <HospitalState>
      <BrowserRouter>
        <Base>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/patient" element={<Patient />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/analytical" element={<Analytical />} />
            <Route path="/hospital" element={<Hospital />} />
            <Route path="/about-us" element={<About />} />
            <Route path="/contact-us" element={<ContactForm />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Base>
      </BrowserRouter>
      </HospitalState>
      </AlertState>
    </div>
  );
}

export default App;
