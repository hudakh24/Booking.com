import "./HeaderSearch.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 
import { format } from "date-fns"; 
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation

const suggestions = ["Islamabad", "Karachi", "Lahore", "Peshawar", "Quetta"];

const HeaderSearch = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location
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
    console.log("---->",location)
  // If the current location is not the home page, don't show the search
  if (location.pathname === '/rooms') {
    return null; // Do not render HeaderSearch if on the rooms page
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    setShowSuggestions(false);
  };

  const handleSearch = () => {
   // if (inputValue && (date[0].startDate && date[0].endDate)) {
      navigate("/rooms"); // Navigate to the rooms page
   // }
  };

  return (
    <div className="headerSearch">
      <div className="headerSearchItem relative">
        <FontAwesomeIcon icon={faBed} className="text-gray-400" />
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
        <button className="searchButton" onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
};

export default HeaderSearch;
