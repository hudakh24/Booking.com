
import { useEffect, useState } from "react";
import axios from "axios";


const StarRating = ({ rating }) => {
  // Create an array for the stars based on the rating
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(i <= rating ? '★' : '☆'); // Use filled star if within rating, otherwise empty star
  }

  return (
    <div className="flex justify-center">
      {stars.map((star, i) => (
        <span key={i} className={star === '★' ? 'text-yellow-500' : 'text-gray-500'}>
          {star}
        </span>
      ))}
    </div>
  );
};
const Hotels = () => {
  const [hotels, setHotels] = useState([]);

  const fetchHotels = async () => {
    try {
      const response = await axios.get("http://localhost:3000/customer/get-all-hotels");
      console.log(response.data)
      setHotels(response.data.response.response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  return (
    <div className="relative mx-auto text-center p-4">
      <br />
      <br />
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {hotels.map((hotel) => (
          <div
            key={hotel.hotelId}
            className="border p-3 rounded-md bg-gray-100 shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer"
          >
            <h2 className="text-blue-600 font-bold text-lg mb-1">{hotel.hotelName}</h2>
            <p className="text-gray-600 mb-1">{hotel.address}</p>
            <h3 className="text-md font-semibold text-gray-700 mb-1">{hotel.location}</h3>
            <p className="text-gray-500">{hotel.mobile}</p>

            {/* Display the rating as stars */}
            <StarRating rating={hotel.ratings} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hotels;
