import "./HotelsCard.css"
import { useEffect, useState } from "react";
import axios from "axios";
// import ShowHotelsRooms from "../ShowHotelsRooms";
import { Navigate } from "react-router-dom";


const StarRating = ({ rating }) => {
  // Create an array for the stars based on the rating
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(i <= rating ? '★' : '☆'); // Use filled star if within rating, otherwise empty star
  }

  return (
    <div className="flex justify-center">
      {stars.map((star, i) => (
        <span key={i} className={star === '★' ? 'text-yellow-500' : 'text-gray-900'}>
          {star}
        </span>
      ))}
    </div>
  );
};
const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);

  const fetchHotels = async () => {
    try {
      const response = await axios.get("http://localhost:3000/customer/get-all-hotels");
      setHotels(response.data.response.response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const showRooms = (hotelId) => {
    setSelectedHotel(hotelId);
  };

  
  useEffect(() => {
    fetchHotels();
  }, []);
  
  // if (selectedHotel) {
  //   return <ShowHotelsRooms hotelName={selectedHotel} />;
  // }

  return (
    <div className="hotels-container">
      <br />
      <div className="hotels-grid ">
        
        { selectedHotel? (<Navigate to={`/rooms/${selectedHotel}`} />) :  (hotels.map((hotel) => (
          
          <div
            key={hotel.hotelId}
            className="hotel-card "
            onClick={() => showRooms(hotel.hotelId)}
            // onClick={<Navigate to={`/rooms/${hotel.hotelId}`} />} 
          >
            <div className="hotel-image-container">
            <img 
              src={`http://localhost:3000/${hotel.images}`} 
              className="hotel-image"
            />
            </div>
            <h2 className="hotel-name">{hotel.hotelName}</h2>
            <p className="hotel-address">{hotel.address}</p>
            <h3 className="hotel-location">{hotel.location}</h3>
            <p className="hotel-mobile">{hotel.mobile}</p>

            {/* Display the rating as stars */}
            <StarRating rating={hotel.ratings} />
          </div>
        )))}
      </div>
      <br/>
    </div>
  );
};

export default Hotels;
