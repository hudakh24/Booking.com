import "./Navbar.css";
import { useNavigate } from "react-router-dom";
// import { Login } from "../Login/Login"
const Navbar = () => {

   const navigate = useNavigate(); // This hook is used to navigate programmatically

  // const handleLoginClick = (mode) => {
  //   navigate(`/form?mode=${mode}`); // This will navigate to the /login route with the mode as a query parameter
  // };

  const handleLoginClick = () => {
    navigate("/login"); 
  };

  const handleSignupClick = () => {
    navigate("/register"); 
  };
  return (
    <>
    {/* <div className="navbar">
      <span className="websiteName">Booking.com</span>
      <div className="NavItems">
          <button onClick={() => {
            handleLoginClick("signup")
        }} className="navButton">Register</button>
        <button onClick={() =>{handleLoginClick("login")}} className="navButton">Login</button>
      </div>
    </div> */}
      
      <div className="navbar">
      <span className="websiteName">Booking.com</span>
      <div className="NavItems">
          <button onClick={ handleSignupClick} className="navButton">Register</button>
        <button onClick={handleLoginClick} className="navButton">Login</button>
      </div>
    </div>
      </>
  );
};
export default Navbar;
