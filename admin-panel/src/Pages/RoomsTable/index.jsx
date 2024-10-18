import "../../Pages/HotelTable/index.css";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/authContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
// import UpdateForm from "../../Forms/UpdateForm";
import { Navigate } from "react-router-dom";

const RoomsTable = () => {
  const [Rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null); // State for selected room to edit

  const { isAdminLoggedIn } = useContext(AuthContext);
  const token = localStorage.getItem("authAdminToken");

  const fetchRooms = async () => {
    if (isAdminLoggedIn) {
      try {
        const response = await axios.get(
          "http://localhost:3000/admins/get-all-Rooms",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include Bearer token in the header
            },
          }
        );
        setRooms(response.data.response.response);
      } catch (error) {
        console.error("Error fetching Rooms:", error);
      }
    }
  };

  // Fetch Rooms when the component mounts
  useEffect(() => {
    fetchRooms();
  }, []);

  const handleDeleteRoom = async (roomId) => {
    if (isAdminLoggedIn) {
      try {
        const response = await axios.delete(
          `http://localhost:3000/admins/delete-room`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include Bearer token in the header
            },
            params: {
              roomId: roomId, // Send room as a query parameter
            },
          }
        );

        if (!response.data.error) {
          setRooms(Rooms.filter((room) => room.roomId !== roomId));
        }
      } catch (error) {
        console.error("Error deleting room:", error);
        alert("Failed to delete room.");
      }
    }
  };

  const handleEditRoom = (roomId) => {
    setSelectedRoom(roomId); // Set the selected room for editing
  };

  // const handleCancelEdit = () => {
  //   setSelectedRoom(null); // Reset selected room to go back to the table
  // };

  return (
    <div className="RoomsTableContainer">
      {selectedRoom ? (
        <Navigate to={`/home/rooms/update-room/${selectedRoom}`} /> //onCancel={handleCancelEdit} />
      ) : (
        <>
          <h3 className="tittle">Rooms List</h3>
          {Rooms.length > 0 ? (
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="tableHeading" />
                  <th className="tableHeading">Hotel Name</th>
                  <th className="tableHeading">Location</th>
                  <th className="tableHeading">Room Number</th>
                  <th className="tableHeading">Room Type</th>
                  <th className="tableHeading">Price Per Night</th>
                  <th className="tableHeading" />
                  <th className="tableHeading" />
                </tr>
              </thead>
              <tbody>
                {Rooms.map((room, index) => (
                  <tr key={room.roomId} className="hover:bg-gray-200">
                    <td className="tableItems">{++index}</td>
                    <td className="tableItems">{room.Hotel.hotelName}</td>
                    <td className="tableItems">{room.Hotel.location}</td>
                    <td className="tableItems">{room.roomNo}</td>
                    <td className="tableItems">{room.roomType}</td>
                    <td className="tableItems">Rs.{room.pricePerNight}</td>
                    <td className="tableItems">
                      <FontAwesomeIcon
                        icon={faEdit}
                        className="text-blue-500 cursor-pointer hover:text-blue-800"
                        onClick={() => handleEditRoom(room.roomId)}
                      />
                    </td>
                    <td className="tableItems">
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="mr-1 text-red-500 cursor-pointer hover:text-red-800"
                        onClick={() => handleDeleteRoom(room.roomId)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center mt-4">No Rooms available.</p>
          )}
        </>
      )}
    </div>
  );
};

export default RoomsTable;
