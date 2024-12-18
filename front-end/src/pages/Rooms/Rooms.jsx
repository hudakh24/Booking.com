import "../Home/Home.css";
import "./Rooms.css";
import Navbar from "../../components/Navbar/Navbar";
import Header from "../../components/Header/Header"; 
import SideBarSearch from "../../components/SideBarSearch/SideBarSearch"; 
import Footer from "../../components/Footer/Footer"; 
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Rooms = () => {
  const [activeItem, setActiveItem] = useState("stays");
  const [rooms, setRooms] = useState([]);
  const {isLoggedIn} = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken")

  useEffect(() => {
    setRooms(location.state.availableRooms.response);
  }, [location.state]);
  
  const bookHandler = async ({roomId}) => {
    if(isLoggedIn){
      try {
        const check = await axios.post("http://localhost:3000/customer/book-room", {
          roomId: roomId,                                 // Pass roomId dynamically
          checkIn: location.state.date[0].startDate,      // Use the check-in date from state
          checkOut: location.state.date[0].endDate,       // Use the check-out date from state
          hotelBookingStatus: "confirmed"
        },
          {
            headers: {
              Authorization: `Bearer ${token}`,  // Include Bearer token in the header
            }
          });

          console.log(check)
  
        if(check.data.error != "forbidden")
        {
          console.log("Room booked successfully!");
          toast("Your Room has been successfully booked")
          setRooms((prevRooms) => prevRooms.filter(room => room.roomId !== roomId));
        }
        
      } catch (error) {
        toast(`Error booking the room ${error}`)
        console.error("Error booking the room:", error);
      }
    }
    else{
      navigate(`/login`);
    }
  };

  return (
    <>
      {rooms? (<div className="home">
        <Navbar />
        <Header activeItem={null} setActiveItem={setActiveItem} />        
        {/* Main Flex container for sidebar and rooms */}
        {activeItem == "stays" && (
          <div className="mainContainer">
            <div className="sideBar">
              <SideBarSearch />
            </div>

            <div className="roomsList ">
              <h2 className="heading">Available Rooms</h2>
            
              {rooms.map((room) => (
                <div key={room.roomId} className="roomsCard">
                  <div>
                    <h2 className="cardHeading">{room.Hotel.hotelName}</h2>
                    <h3 className="location">{room.Hotel.location}</h3>
                    <p className="cardSubHeading mt-2">
                      Room Type: <span className="font-normal">{room.roomType}</span>
                    </p>
                    <p className="cardSubHeading">
                      Room Number: <span className="font-normal">{room.roomNo}</span>
                    </p>
                    <p className="cardSubHeading">
                      Price per night: <span className="font-normal">Rs. {room.pricePerNight}</span>
                    </p>
                  </div>
                  {/* Call bookHandler with roomId when clicked */}
                  <button onClick={() => bookHandler(room)} className="button">
                    Book
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
            <br/>
        <Footer />
      <ToastContainer />
      </div>) : <h1>No selcted place</h1>}
    </>
  );
}

export default Rooms;
