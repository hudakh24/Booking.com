import { useState } from "react";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faPlane,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from "date-fns"; //format date to display
const Header = () => {
  const [activeItem, setActiveItem] = useState("stays"); // State to track the active item i-e flights/hotels
    const [openDate, setOpenDate] = useState(false); 
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
   ]); //state to track dates range that is selected by user
  
  return (
    <div className="header">
      <div className="headerContainer">
        <div className="headerItems">
        <div
          className={`item ${activeItem === "stays" ? "active" : ""}`}
          onClick={() => setActiveItem("stays")}
        >
          <FontAwesomeIcon icon={faBed} />
          <span>Stays</span>
        </div>
        <div
          className={`item ${activeItem === "flights" ? "active" : ""}`}
          onClick={() => setActiveItem("flights")}
        >
          <FontAwesomeIcon icon={faPlane} />
          <span>Flights</span>
        </div>
      </div>

      <div className="headerText">
        {activeItem === "stays" ? (
          <>
            <h1 className="headerTitle">Find your next stay</h1>
            <p className="headerDesc">Search low prices on hotels</p>
          </>
        ) : (
          <>
            <h1 className="headerTitle">Find your next flight</h1>
            <p className="headerDesc">Search low prices on flights</p>
          </>
        )}
        </div>
       </div> 
      <div className="headerSearch">
        <div className="headerSearchItem">
          <FontAwesomeIcon icon={faBed} className="text-gray-400 " />
          <input
            className="headerSearchInput"
            type="text"
            placeholder="Where are you going?"
          />
        </div>

        <div className="headerSearchItem">
          <FontAwesomeIcon  onClick={() => setOpenDate(!openDate)} icon={faCalendarDays} className="text-gray-400  cursor-pointer" />
          <span
                  onClick={() => setOpenDate(!openDate)}
                  className="headerSearchDate"
                >{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
                  date[0].endDate,
                  "MM/dd/yyyy"
                )}`}</span>
         {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDate([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                    className="date"
                    minDate={new Date()}
                  />
                )}
        </div>

        <div className="headerSearchItem">
          <button className="searchButton">Search</button>
        </div>
      </div>
    </div>  
  );
};

export default Header;
