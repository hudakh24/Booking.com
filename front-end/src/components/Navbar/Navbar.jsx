import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
// import { Login } from "../Login/Login"
const Navbar = () => {

   const navigate = useNavigate(); // This hook is used to navigate programmatically
   const { isLoggedIn, logout} = useContext(AuthContext);

  const handleLoginClick = () => {
    navigate("/login"); 
  };

  const handleSignupClick = () => {
    navigate("/register"); 
  };

   const handleLogout = () => {
    logout(); // Call the logout function from AuthContext
    navigate("/");
  };

  const showHome = () => {
    navigate("/")
  }

  return (
    <>
    
      <div className="navbar">
      <span className="websiteName" style={{cursor:"pointer"}} onClick={showHome}>Booking.com</span>
      <div className="NavItems">
        {
        isLoggedIn  ? ( <>
          <button onClick={handleLogout} className="navButton">Logout</button>
        </>) : (<>
        <button onClick={ handleSignupClick} className="navButton">Register</button>
        <button onClick={handleLoginClick} className="navButton">Login</button>
        </>
      )
        }
        
      </div>
    </div>
      </>
  );
};
export default Navbar;
