import "./index.css";
import { useState } from "react";
// import HotelsTable from "../../Pages/HotelTable";
// import RoomsTable from "../../Pages/RoomsTable";
import AddForm from "../../Forms/AddForm";
import { Navigate } from "react-router-dom";

const SideBar = () => {
  // State to manage open sections
  const [isHotelsOpen, setIsHotelsOpen] = useState(false); //needs to make this generic
  const [isRoomsOpen, setIsRoomsOpen] = useState(false);

  // State to manage which option is selected (like All Hotels or All Rooms)
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <>
      <div className="sidebar">
        <h2 className="sidebarHeading">Admin</h2>
        <hr className="line" />
        <ul className="space-y-1">
          {/* Hotels Option */}
          <li className="sidebarOption">
            <div
              className="optionSpan"
              onClick={() => setIsHotelsOpen(!isHotelsOpen)}
            >
              <span>Hotels</span>
              <span>{isHotelsOpen ? "▲" : "▼"}</span>
            </div>

            {/* Nested list for Hotels */}
            {isHotelsOpen && (
              <ul className="optionList">
                <li
                  className="listItem"
                  onClick={() => setSelectedOption("AddHotel")}
                >
                  Add Hotel
                </li>
                <li
                  className="listItem"
                  onClick={() => setSelectedOption("AllHotels")}
                >
                  All Hotels
                </li>
              </ul>
            )}
          </li>

          {/* Rooms Option */}
          <li className="sidebarOption">
            <div
              className="optionSpan"
              onClick={() => setIsRoomsOpen(!isRoomsOpen)}
            >
              <span>Rooms</span>
              <span>{isRoomsOpen ? "▲" : "▼"}</span>
            </div>

            {/* Nested list for Rooms */}
            {isRoomsOpen && (
              <ul className="optionList">
                <li
                  className="listItem"
                  onClick={() => setSelectedOption("AddRoom")}
                >
                  Add Room
                </li>
                <li
                  className="listItem"
                  onClick={() => setSelectedOption("AllRooms")}
                >
                  All Rooms
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>

      {/* Conditionally render the selected table */}
      <div className="outputContainer">
        {selectedOption === "AllHotels" && <Navigate to="/home/hotels" />}
        {selectedOption === "AllRooms" && <Navigate to="/home/rooms" />}
        {selectedOption === "AddHotel" && <Navigate to="/home/add-hotel" />}
        {selectedOption === "AddRoom" && <AddForm isHotel={false} />}
      </div>
    </>
  );
};

export default SideBar;
