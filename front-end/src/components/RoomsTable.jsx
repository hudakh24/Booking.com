import "./Hotels/table.css"
import { useEffect, useState, useContext } from "react";
import axios from "axios"; // Import axios
import { AuthContext } from "../contexts/AuthContext";


const RoomsTable = () => {
  const [Rooms, setRooms] = useState([]);
  const { isAdminLoggedIn } = useContext(AuthContext);
   const token = localStorage.getItem("authAdminToken")

  const fetchRooms = async () => {
    if (isAdminLoggedIn) {
      try {
        const response = await axios.get("http://localhost:3000/admins/get-all-Rooms",  {
            headers: {
              Authorization: `Bearer ${token}`,  // Include Bearer token in the header
            }
          });
        console.log("tables------------>", response)
        setRooms(response.data.response.response);
      } catch (error) {
        console.error("Error fetching Rooms:", error);
      }
    };
  }

  // Fetch Rooms when the component mounts
  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div className="RoomsTableContainer">
      <h3 className="tittle">Rooms List</h3>
      {Rooms.length > 0 ? (
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className=" tableHeading "/>
              <th className=" tableHeading ">Hotel Name</th>
              <th className=" tableHeading "> location</th>
              <th className="tableHeading">Room Number</th>
              <th className="tableHeading">Room Type</th>
              <th className="tableHeading">Price Per Night</th>
            </tr>
          </thead>
          <tbody>
            {Rooms.map((room,index) => (
              <tr key={room.roomID} className="hover:bg-gray-200">
                <td className="tableItems">{++index}</td>
                <td className="tableItems">{room.Hotel.hotelName}</td>
                <td className="tableItems">{room.Hotel.location}</td>
                <td className="tableItems">{room.roomNo}</td>
                <td className="tableItems">{room.roomType}</td>
                <td className="tableItems">Rs.{room.pricePerNight}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center mt-4">No Rooms available.</p>
      )}
    </div>
  );
};

export default RoomsTable;
