import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import LoginComponent from "./components/Login/Login.jsx"; // Ensure the import is correct
import Signup from "./components/Signup/Signup.jsx";
import Rooms from "./pages/Rooms/Rooms.jsx";
import "./index.css";
import ErrorPage from "./pages/ErrorPage.jsx";
import ShowHotelsRooms from "./components/ShowHotelsRooms.jsx";

const App = () => {

  return (
    <>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/available-rooms" element={<Rooms />} />
        <Route path="/rooms/:hotelId" element={<ShowHotelsRooms />} />
        <Route path="/login" element={<LoginComponent />} /> {/* Customer Login */}
        <Route path="/register" element={<Signup />} />
        <Route path="*" element={<ErrorPage />} />
    </Routes>
    </>
  );
};

export default App;
