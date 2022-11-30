import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/404";
import ContactForm from "./pages/Contact";
import Base from "./layouts/Base";

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Base>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<About />} />
            <Route path="/contact-us" element={<ContactForm />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Base>
      </BrowserRouter>
    </div>
  );
}

export default App;
