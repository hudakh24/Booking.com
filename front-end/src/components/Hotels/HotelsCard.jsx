import "./HotelsCard.css"
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
    <div className="hotels-container">
      <br />
      <br />
      <div className="hotels-grid ">
        {hotels.map((hotel) => (
          <div
            key={hotel.hotelId}
            className="hotel-card "
          >
            <h2 className="hotel-name">{hotel.hotelName}</h2>
            <p className="hotel-address">{hotel.address}</p>
            <h3 className="hotel-location">{hotel.location}</h3>
            <p className="hotel-mobile">{hotel.mobile}</p>

            {/* Display the rating as stars */}
            <StarRating rating={hotel.ratings} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hotels;
