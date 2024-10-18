import "./HeaderSearch.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faCalendarDays, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"; // Import the search icon
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 
import { format } from "date-fns"; 
import { useNavigate, useLocation } from "react-router-dom"; 
import axios from 'axios';

const suggestions = ["Islamabad", "Karachi", "Lahore", "Peshawar", "Quetta"];

const HeaderSearch = () => {
  const navigate = useNavigate();
  const location = useLocation(); 
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  // If the current location is not the home page, don't show the search
  if (location.pathname === '/rooms') {
    return null; 
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    setShowSuggestions(false);
  };

  const handleSearch = async () => {
    try {
      if (inputValue && date) {
        const response = await axios.get("http://localhost:3000/customer/available-rooms", {
          params: {
            location: inputValue,
            checkIn: date[0].startDate,  
            checkOut: date[0].endDate    
          }
        });
        const availableRooms = response.data;
        navigate("/rooms", { state: { availableRooms, inputValue, date } });
      }
    } catch (error) {
      console.error("Error fetching unbooked rooms:", error);
    }
  };

  return (
    <div className="headerSearch">
      <div className="headerSearchItem relative">
        <FontAwesomeIcon onClick={() => setShowSuggestions(!showSuggestions)} icon={faBed} className="text-gray-400" />
        <input
          className="headerSearchInput"
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

      <div className="headerSearchItem">
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
        <button className="headerSearchButton" onClick={handleSearch}>
          <FontAwesomeIcon icon={faMagnifyingGlass} className="text-white" /> {/* Replace text with icon */}
        </button>
      </div>
    </div>
  );
};

export default HeaderSearch;
