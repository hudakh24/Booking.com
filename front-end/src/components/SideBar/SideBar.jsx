import "./SideBar.css"
import { useState } from "react";
import HotelsTable from "../Hotels/HotelsTable";

const SideBar = () => {
  const [isHotelsOpen, setIsHotelsOpen] = useState(false);
  const [isRoomsOpen, setIsRoomsOpen] = useState(false);
  const [showHotelsTable, setShowHotelsTable] = useState(false);

  return (
      <>
        <div className="sidebar"> 
           <h2 className="sidebarHeading ">Admin Name</h2>
          <hr className="line" />
            <ul className="space-y-1">
            {/* Hotels Option with Nested Items */}
            <li className="sidebarOption">
              <div
                className="optionSpan"
                onClick={() => setIsHotelsOpen(!isHotelsOpen)}
              >
                <span>Hotels</span>
                <span>{isHotelsOpen ? "▲" : "▼"}</span>
              </div>
              {isHotelsOpen && (
                <ul className="optionList">
                  <li className=" listItem ">
                    Add Hotel
                  </li>
                  <li className="listItem">
                    Update Hotels
                </li>
                <li className="listItem">
                    Delete Hotels
                </li>
                <li className="listItem"
                onClick={() => {
                    setShowHotelsTable(true); 
                    setIsHotelsOpen(false); 
                  }}>
                    All Hotels
                  </li>
                </ul>
              )}
            </li>

            {/* Rooms Option with Nested Items */}
            <li className="sidebarOption">
              <div
                className="optionSpan"
                onClick={() => setIsRoomsOpen(!isRoomsOpen)}
              >
                <span>Rooms</span>
                <span>{isRoomsOpen ? "▲" : "▼"}</span>
              </div>
              {isRoomsOpen && (
                <ul className="optionList">
                 <li className=" listItem ">
                    Add Room
                  </li>
                  <li className="listItem">
                    Update Room
                </li>
                <li className="listItem">
                    Delete Room
                </li>
                <li className="listItem">
                    All Room
                  </li>
                </ul>
              )}
            </li>
          </ul>
      </div>
      
      <div className=" outputContainer"> 
         {showHotelsTable && <HotelsTable />}
      </div>
    </>
    );
};
export default SideBar