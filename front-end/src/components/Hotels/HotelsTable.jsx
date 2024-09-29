import { useEffect, useState } from "react";
import axios from "axios"; // Import axios

const HotelsTable = () => {
  const [hotels, setHotels] = useState([]);

  const fetchHotels = async () => {
    try {
        const response = await axios.get("http://localhost:3000/admins/get-all-hotels"); 
        console.log("tables------------>",response)
      setHotels(response.data.response.response); 
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  // Fetch hotels when the component mounts
  useEffect(() => {
    fetchHotels();
  }, []);

  return (
    <div className="hotelsTableContainer">
      <h3 className="text-center text-lg font-bold mb-4">Hotels List</h3>
      {hotels.length > 0 ? (
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Hotel Name</th>
              <th className="px-4 py-2 border">Location</th>
              <th className="px-4 py-2 border">Address</th>
              <th className="px-4 py-2 border">Contact</th>
            </tr>
          </thead>
          <tbody>
            {hotels.map((hotel) => (
              <tr key={hotel.hotelID} className="hover:bg-gray-200">
                <td className="px-4 py-2 border">{hotel.hotelName}</td>
                <td className="px-4 py-2 border">{hotel.location}</td>
                <td className="px-4 py-2 border">{hotel.address}</td>
                <td className="px-4 py-2 border">{hotel.mobile}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center mt-4">No hotels available.</p>
      )}
    </div>
  );
};

export default HotelsTable;
