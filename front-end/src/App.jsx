import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Hotels from "./pages/Hotels/Hotels.jsx";
// import Form from "./pages/Form.jsx"; 
import Login from "./components/Login/Login.jsx"
import SingleHotel from "./pages/SingleHotel/SingleHotel.jsx";
import "./index.css";
import Signup from "./components/Signup/Signup.jsx";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/hotels/:id" element={<SingleHotel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
      </Routes>
    </>
  );
};

export default App;
