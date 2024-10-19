import Navbar from "./Navbar/index";
import SideBar from "./Sidebar/index";
import PropTypes from "prop-types";

const Layout = (props) => {
  return (
    <>
      <div className="flex flex-col min-h-screen bg-[url('/book1.jpg')]  bg-cover bg-no-repeat">
        <Navbar />
        <div className="flex-grow flex">
          <SideBar />
          <div className="flex-1 flex p-4 justify-center items-center">
            {props.children}
          </div>
        </div>
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.any,
};

export default Layout;
