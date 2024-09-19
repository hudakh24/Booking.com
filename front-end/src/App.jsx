import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Hotels from "./pages/Hotels/Hotels.jsx";
import Form from "./pages/Form.jsx";
import SingleHotel from "./pages/SingleHotel/SingleHotel.jsx";
import "./index.css";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/hotels/:id" element={<SingleHotel />} />
        <Route path="/login" element={<Form />} />
      </Routes>
    </>
  );
};

export default App;
