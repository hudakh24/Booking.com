import "../Home/Home.css";
import "./Rooms.css";
import Navbar from "../../components/Navbar/Navbar";
import Header from "../../components/Header/Header"; 
import SideBarSearch from "../../components/SideBarSearch/SideBarSearch" // Import SidebarSearch
import Footer from "../../components/Footer/Footer"; 

const Rooms = () => {
  return (
    <>
      <div className="home">
        <Navbar />
        <Header />
        <SideBarSearch /> {/* Add the SidebarSearch here */}
        <div className="roomsListResult"></div>
        <Footer /> 
      </div>
    </>
  );
};

export default Rooms;
