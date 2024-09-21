import { useState } from "react";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faPlane } from "@fortawesome/free-solid-svg-icons";
import HeaderSearch from "../HeaderSearch/HeaderSearch"

const Header = () => {
  const [activeItem, setActiveItem] = useState("stays");

  return (
    <>
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
      <HeaderSearch />
    </div>
    <br/>
    </>
  );
};

export default Header;
