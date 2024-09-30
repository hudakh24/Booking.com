import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import LoginComponent from "./components/Login/Login.jsx"; // Ensure the import is correct
import Signup from "./components/Signup/Signup.jsx";
import Rooms from "./pages/Rooms/Rooms.jsx";
import AdminHome from "./pages/AdminHome/AdminHome.jsx";
import "./index.css";
import PrivateRoute from "./components/protectedRoute.jsx";

const App = () => {

  return (
    <>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/rooms" element={<Rooms />} />

        <Route path="/login" element={<LoginComponent isAdmin={false} />} /> {/* Customer Login */}
        <Route path="/register" element={<Signup />} />


        {/* Admin route with nested AdminHome */}
        <Route path = "/admin">
          <Route index={true} element={<LoginComponent isAdmin={true} />}/>
          <Route path="home" element={<PrivateRoute ><AdminHome/></PrivateRoute>} /> 
        </Route>
      </Routes>
    </>
  );
};

export default App;
