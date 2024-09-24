import "../Home/Home.css";
import "./Rooms.css";
import Navbar from "../../components/Navbar/Navbar";
import Header from "../../components/Header/Header"; 
import SideBarSearch from "../../components/SideBarSearch/SideBarSearch" // Import SidebarSearch
import Footer from "../../components/Footer/Footer"; 
import {useState, useEffect} from "react";
import axios from "axios";


const Rooms = () => {


  const [rooms, setRooms] = useState([]);

  const fetchRooms = async () => {
    try {
      const response = await axios.post("http://localhost:3000/customer/available-rooms", );
      console.log(response.data)
      setRooms(response.data.response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);
  return (
    <>
      <div className="home">
        <Navbar />
        <Header />
        <SideBarSearch /> {/* Add the SidebarSearch here */}
        <div className="hotels-grid ">
        {console.log(rooms) &&
        rooms.map((hotel) => (
          <div
            key={hotel.hotelId}
            className="hotel-card "
          >
            <h2 className="hotel-name">{hotel.hotel.hotelName}</h2>
            <p className="hotel-address">{hotel.address}</p>
            <h3 className="hotel-location">{hotel.location}</h3>
            <p className="hotel-mobile">{hotel.mobile}</p>

            {/* Display the rating as stars */}
            {/* <StarRating rating={hotel.ratings} /> */}
          </div>
        ))}
      </div>
        <div className="roomsListResult"></div>
        <Footer /> 
      </div>
    </>
  );
};

export default Rooms;
