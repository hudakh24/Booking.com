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
import { format } from "date-fns"; // format date to display

const suggestions = ["Islamabad", "Karachi", "Lahore", "Peshawar", "Quetta"];

const Header = () => {
  const [activeItem, setActiveItem] = useState("stays"); // State to track the active item i.e. flights/hotels
  const [openDate, setOpenDate] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]); // state to track dates range selected by the user

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    setShowSuggestions(false); // Hide suggestions after clicking
  };

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
        <div className="headerSearchItem relative">
          <FontAwesomeIcon icon={faBed} className="text-gray-400 " />
          <input
            className="headerSearchInput"
            type="text"
            placeholder="Where are you going?"
            value={inputValue}
            onChange={handleInputChange}
            onClick={() => setShowSuggestions(!showSuggestions)}
          />
          {showSuggestions && (
            <ul className="suggestionsList ">
              {suggestions
                .filter((suggestion) =>
                  suggestion.toLowerCase().includes(inputValue.toLowerCase())
                )
                .map((suggestion) => ( //the map function iterates over the resulting array of suggestions.
                  <li
                    key={suggestion}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="suggestionItem"
                  >
                    {suggestion} {/*This outputs the suggestion text itself, displaying it inside the list item. */}
                  </li>
                ))}
            </ul>
          )}
        </div>

        <div className="headerSearchItem relative">
          <FontAwesomeIcon
            onClick={() => setOpenDate(!openDate)}
            icon={faCalendarDays}
            className="text-gray-400 cursor-pointer"
          />
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
