import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
// import Hotels from "./pages/Hotels/Hotels.jsx";
// import Form from "./pages/Form.jsx"; 
import Login from "./components/Login/Login.jsx"
import "./index.css";
import Signup from "./components/Signup/Signup.jsx";
import Rooms from "./pages/Rooms/Rooms.jsx";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
      </Routes>
    </>
  );
};

export default App;
