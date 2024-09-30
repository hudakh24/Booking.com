import "./table.css"
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import UpdateForm from "../Form/UpdateForm";

const HotelsTable = () => {
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null); // State for selected hotel to edit
  const { isLoggedIn } = useContext(AuthContext);
  const token = localStorage.getItem("authToken");
  
  const fetchHotels = async () => {
    if (isLoggedIn) {
      try {
        const response = await axios.get("http://localhost:3000/admins/get-all-hotels",  {
            headers: {
              Authorization: `Bearer ${token}`,  // Include Bearer token in the header
            }
        });
        setHotels(response.data.response.response);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const handleDeleteHotel = async (hotelId) => {
    if (isLoggedIn) {
      try {
        const response = await axios.delete(`http://localhost:3000/admins/delete-hotel`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include Bearer token in the header
          },
          params: {
            hotelId: hotelId, // Send hotelId as a query parameter
          },
        });
        
        if (!response.data.error) {
          setHotels(hotels.filter((hotel) => hotel.hotelId !== hotelId));
        }
      } catch (error) {
        console.error("Error deleting hotel:", error);
        alert("Failed to delete hotel.");
      }
    }
  };

  const handleEditHotel = (hotelName) => {
    setSelectedHotel(hotelName); // Set the selected hotel for editing
  }


  return (
    <div className="hotelsTableContainer">
      

      {/* Conditionally render the UpdateForm if a hotel is selected for editing */}
      {selectedHotel ? (
        <UpdateForm hotelName={selectedHotel}  />
      ) : (
          
          <>
            <h3 className="tittle">Hotels List</h3>
          {hotels.length > 0 ? (
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="tableHeading" />
                  <th className="tableHeading">Hotel Name</th>
                  <th className="tableHeading">Location</th>
                  <th className="tableHeading">Address</th>
                  <th className="tableHeading">Contact</th>
                  <th className="tableHeading">Ratings</th>
                  <th className="tableHeading" />
                  <th className="tableHeading" />
                </tr>
              </thead>
              <tbody>
                {hotels.map((hotel, index) => (
                  <tr key={hotel.hotelId} className="hover:bg-gray-200">
                    <td className="tableItems">{++index}</td>
                    <td className="tableItems">{hotel.hotelName}</td>
                    <td className="tableItems">{hotel.location}</td>
                    <td className="tableItems">{hotel.address}</td>
                    <td className="tableItems">{hotel.mobile}</td>
                    <td className="tableItems">{hotel.ratings}</td>
                    <td className="tableItems">
                      <FontAwesomeIcon
                        icon={faEdit}
                        className="text-blue-500 cursor-pointer hover:text-blue-800"
                        onClick={() => handleEditHotel(hotel.hotelName)} // Call handleEditHotel on click
                      />
                    </td>
                    <td className="tableItems">
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="mr-1 text-red-500 cursor-pointer hover:text-red-800"
                        onClick={() => handleDeleteHotel(hotel.hotelId)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center mt-4">No hotels available.</p>
          )}
        </>
      )}
    </div>
  );
};

export default HotelsTable;
