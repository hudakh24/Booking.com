import "./index.css";
import { Navigate, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";

const Navbar = () => {
  const navigate = useNavigate(); // This hook is used to navigate programmatically
  const { isAdminLoggedIn, logoutAdmin } = useContext(AuthContext);

  const handleAdminLogout = () => {
    logoutAdmin(); // Call the logout function from AuthContext
    navigate("/");
  };

  const showHome = () => {
    navigate("/home");
  };

  return (
    <>
      <div className="navbar">
        <span
          className="websiteName"
          style={{ cursor: "pointer" }}
          onClick={showHome}
        >
          Booking.com
        </span>
        <div className="NavItems">
          {isAdminLoggedIn ? (
            <>
              <button onClick={handleAdminLogout} className="navButton">
                Logout
              </button>
            </>
          ) : (
            <>
              <Navigate to={"/"} />
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default Navbar;
