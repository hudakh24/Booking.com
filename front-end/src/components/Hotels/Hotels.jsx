import { useEffect, useState } from "react";
import axios from "axios";

const Hotels = () => {
  const [hotels, setHotels] = useState([]);

  const fetchHotels = async () => {
    try {
      const response = await axios.get("http://localhost:3000/customer/get-all-hotels");
      setHotels(response.data.response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  return (
    <div className="relative mx-auto text-center p-4">
      <br/>
      <br/>
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hotels;

// import { useEffect, useState } from "react";
// import axios from "axios";

// const Hotels = () => {
//   const [hotels, setHotels] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0); // Track the current index for visible hotels
//   const hotelsPerPage = 6; // Number of hotels to show at a time

//   const fetchHotels = async () => {
//     try {
//       const response = await axios.get("http://localhost:3000/customer/get-all-hotels");
//       setHotels(response.data.response);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchHotels();
//   }, []);

//   const handleScroll = (direction) => {
//     if (direction === "next") {
//       setCurrentIndex((prevIndex) => Math.min(prevIndex + hotelsPerPage, hotels.length - hotelsPerPage));
//     } else if (direction === "prev") {
//       setCurrentIndex((prevIndex) => Math.max(prevIndex - hotelsPerPage, 0));
//     }
//   };

//   return (
//     <div className="relative mx-auto text-center p-4">
//       <h1 className="text-2xl font-bold my-4">Hotels Page</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {hotels.slice(currentIndex, currentIndex + hotelsPerPage).map((hotel) => (
//           <div
//             key={hotel.hotelId}
//             className="border p-3 rounded-md bg-gray-100 shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer"
//           >
//             <h2 className="text-blue-600 font-bold text-lg mb-1">{hotel.hotelName}</h2>
//             <p className="text-gray-600 mb-1">{hotel.address}</p>
//             <h3 className="text-md font-semibold text-gray-700 mb-1">{hotel.location}</h3>
//             <p className="text-gray-500">{hotel.mobile}</p>
//           </div>
//         ))}
//       </div>
//       <div className="flex justify-between mt-4">
//         <button 
//           className="bg-gray-300 p-2 rounded"
//           onClick={() => handleScroll("prev")}
//           disabled={currentIndex === 0} // Disable if at the first set
//         >
//           &lt; Prev
//         </button>
//         <button 
//           className="bg-gray-300 p-2 rounded"
//           onClick={() => handleScroll("next")}
//           disabled={currentIndex + hotelsPerPage >= hotels.length} // Disable if at the last set
//         >
//           Next &gt;
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Hotels;
