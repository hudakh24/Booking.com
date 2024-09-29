import "./SideBarSearch.css"
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays,faHotel,faMapLocation  } from "@fortawesome/free-solid-svg-icons";
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 
import { format } from "date-fns"; 
import { useLocation } from "react-router-dom";

const suggestions = ["Islamabad", "Karachi", "Lahore", "Peshawar", "Quetta"];

const SidebarSearch = () => {
  const location = useLocation();

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [inputValue, setInputValue] = useState(location.state.inputValue);
  const [hotelInput, setHotelInput] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState(location.state.date);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleHotelInputChange = (e) => {
    setHotelInput(e.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    setShowSuggestions(false);
  };

  

  return (
    <div className="sidebarSearch">
      <div className="sidebarSearchItem ">
        <FontAwesomeIcon icon={faMapLocation} className="text-gray-400" />
        <input
          className="sidebarSearchInput"
          type="text"
          placeholder="Where are you going?"
          value={inputValue}
          onChange={handleInputChange}
          onClick={() => setShowSuggestions(!showSuggestions)}
        />
        {showSuggestions && (
          <ul className="suggestionsList">
            {suggestions
              .filter((suggestion) =>
                suggestion.toLowerCase().includes(inputValue.toLowerCase())
              )
              .map((suggestion) => (
                <li
                  key={suggestion}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="suggestionItem"
                >
                  {suggestion}
                </li>
              ))}
          </ul>
        )}
      </div>

      <div className="sidebarSearchItem">
        <FontAwesomeIcon
          onClick={() => setOpenDate(!openDate)}
          icon={faCalendarDays}
          className="text-gray-400 cursor-pointer"
        />
        <span
          onClick={() => setOpenDate(!openDate)}
          className="sidebarSearchInput"
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
      <div className="sidebarSearchItem">
         <FontAwesomeIcon icon={faHotel} className="text-gray-400" />
        <input
          className="sidebarSearchInput"
          type="text"
          placeholder="Enter Hotel Name"
          value={hotelInput}
          onChange={handleHotelInputChange}
        />
      </div>

      <div className="sidebarSearchItem">
        <button className="searchButton" >Search</button>
      </div>
    </div>
  );
};

export default SidebarSearch;
