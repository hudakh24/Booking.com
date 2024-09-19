import "./Navbar.css";
const Navbar = () => {
  return (
    <div className="navbar">
      <span className="websiteName">Booking.com</span>
      <div className="NavItems">
        <button className="navButton">Register</button>
        <button className="navButton">Login</button>
      </div>
    </div>
  );
};
export default Navbar;
