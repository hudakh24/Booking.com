import "../Home/Home.css";
import "./Rooms.css";
import Navbar from "../../components/Navbar/Navbar";
import Header from "../../components/Header/Header"; 
import SideBarSearch from "../../components/SideBarSearch/SideBarSearch"; 
import Footer from "../../components/Footer/Footer"; 
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Rooms = () => {
  const location = useLocation();
  console.log("roomsLoc-->", location.state);

  const [rooms, setRooms] = useState([]);
  
  useEffect(() => {
    setRooms(location.state.availableRooms.response);
  }, [location.state]);

  return (
    <>
      <div className="home"> 
        <Navbar />
        <Header />
        
        {/* Main Flex container for sidebar and rooms */}
        <div className="flex px-4 py-2">
          <div className="sidebar relative mt-16 h-60 w-1/4 p-4 bg-gray-100 rounded-md">
            <SideBarSearch />
          </div>

          <div className="roomsList flex-grow w-3/4 p-4">
          <h2 className="text-3xl font-extrabold text-cyan-800 mb-6 shadow-md p-2 bg-white rounded-md">
  Available Rooms
</h2>
            
            {rooms.map((room) => (
              <div
                key={room.roomId}
                className="roomItem flex justify-between items-center p-4 border bg-gray-100 rounded-md shadow-lg mb-4"
              >
                <div className="roomDetails">
                  <h2 className="text-lg text-cyan-600 font-bold">{room.Hotel.hotelName}</h2>
                  <h3 className="text-md text-gray-600">{room.Hotel.location}</h3>
                  <p className="font-bold mt-2 text-gray-700">
                    Room Type: <span className="font-normal">{room.roomType}</span>
                  </p>
                  <p className="font-bold text-gray-700">
                    Room Number: <span className="font-normal">{room.roomNo}</span>
                  </p>
                  <p className="font-bold text-gray-700">
                    Price per night: <span className="font-normal">Rs. {room.pricePerNight}</span>
                  </p>
                </div>
                 <button className="px-4 py-2 bg-cyan-800 text-white font-semibold rounded-lg shadow-md transition-all duration-300 ease-in-out mt-5 hover:bg-cyan-600 hover:shadow-lg">
                  Book
                </button>
              </div>
            ))}
          </div>
        </div>

        <Footer /> 
      </div>
    </>
  );
};

export default Rooms;
