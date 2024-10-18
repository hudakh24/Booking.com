// import Footer from "";
import Navbar from "./Navbar";
import SideBar from "./Sidebar";
import PropTypes from "prop-types";
// import "../Pages/Home/index.css";

const Layout = (props) => {
  return (
    <>
      {/* <div className="pageContainer">
        <Navbar />
        <div className="midContainer">
          <SideBar /> */}
      <Navbar />
      <SideBar />
      {props.children}
      {/* </div>
      </div> */}
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.any,
};

export default Layout;
