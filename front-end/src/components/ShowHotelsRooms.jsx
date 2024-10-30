import { useEffect, useState } from 'react'
import axios from "axios";
import { useParams } from 'react-router-dom';


// const ShowHotelsRooms = (props) => {
const ShowHotelsRooms = () => {

    const [rooms, setRooms] = useState([]);
    // const hotelName = props.hotelName;

    const {hotelId} = useParams();
    const showItsRooms = async () => {
    try {
      const response = await axios.get("http://localhost:3000/customer/get-all-rooms", {
      params: {
          hotelId: hotelId
      }
      });
      setRooms(response.data.response.response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    showItsRooms();
  }, [])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {rooms.map((room) => (
        <div
          key={room.roomId}
          className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105"
        >
          {/* <div className="w-full h-48 overflow-hidden">
            <img
              src={`http://localhost:3000/${room.image}`} // Adjust URL as per server setup
              alt="Room"
              className="w-full h-full object-cover"
            />
          </div> */}
          <div className="p-4">
            <h3 className="text-xl font-bold text-gray-800">{room.roomType}</h3>
            <h3 className="text-xl font-bold text-gray-800">{room.roomNo}</h3>
            <p className="text-gray-600 mt-2">Price per night: Rs. {room.pricePerNight}</p>
            {/* <p className="text-gray-600 mt-2">{room.description}</p> */}
            {/* <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors">
              Book Now
            </button> */}
          </div>
        </div>
      ))}
    </div>
  )
}

export default ShowHotelsRooms