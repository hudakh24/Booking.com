import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import './Form.css'; // Import the CSS file
import { useNavigate } from "react-router-dom";
//import AdminHome from "../../pages/AdminHome/AdminHome";

const UpdateForm = ({ isHotel, hotelId, roomId }) => {
  const { isAdminLoggedIn } = useContext(AuthContext);
  const token = localStorage.getItem("authAdminToken");
  const navigate = useNavigate();
  let response;

  // State to store initial form data
  const [initialValues, setInitialValues] = useState({
    hotelName: "", 
    location: "",
    address: "",
    mobile: "",
    ratings: "",
    images: "",
    roomNo: "", 
    roomType: "", 
    pricePerNight: "", 
  });
  // Fetch the hotel details using the passed hotelName to pre-populate the form
  const fetchHotelDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/admins/get-hotel?hotelId=${hotelId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
     console.log("ftech-hotel-response---->", response)
      const hotelData = response.data.response.response;
      setInitialValues({
        hotelName: hotelData.hotelName,
        location: hotelData.location,
        address: hotelData.address,
        mobile: hotelData.mobile,
        ratings: hotelData.ratings,
       // images: hotelData.images[0],
      });
    } catch (error) {
      console.error('Error fetching hotel details:', error);
    }
  };

  const fetchRoomDetails = async () => {
    try {
      response = await axios.get(`http://localhost:3000/admins/get-room?roomId=${roomId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
     console.log("ftech-room-response---->", response)
      const roomData = response.data.response.response;
      setInitialValues({
        hotelName: roomData.Hotel.hotelName,
        roomNo: roomData.roomNo, 
        roomType: roomData.roomType, 
        pricePerNight: roomData.pricePerNight, 
        
      });
    } catch (error) {
      console.error('Error fetching room details:', error.message);
    }
  };

  useEffect(() => {

    if (isHotel && hotelId) {
      fetchHotelDetails();
    }

    if (!isHotel && roomId) {
      fetchRoomDetails();
    }
  }, [hotelId, roomId, token]);

  const validationSchema = Yup.object({
    hotelName: Yup.string().required("Hotel name is required"), 
    location: isHotel ? Yup.string() : Yup.string(), 
    address: isHotel ? Yup.string(): Yup.string(), 
    mobile: isHotel ? Yup.string()
          .matches(/^\+92 \d{2} \d{3} \d{3} \d{3}$/, "Mobile number must be in the format +92 42 111 505 505")
          : Yup.string(), 
    ratings: isHotel ? Yup.string(): Yup.string(), 
    images: isHotel ? Yup.mixed()
          .test("fileSize", "File too large", (value) => {
            return !value || (value && value.size <= 2 * 1024 * 1024);
          })
          .test("fileType", "Unsupported File Format", (value) => {
            return !value || (value && (value.type === "image/jpg" || value.type === "image/jpeg" || value.type === "image/png"));
          }) : Yup.mixed(), 
    roomNo: isHotel ? Yup.string() : Yup.string(),
    roomType: isHotel ? Yup.string() : Yup.string(),  
    pricePerNight: isHotel ? Yup.string() : Yup.number().positive(),
  });


const handleSubmit = async (values, { resetForm }) => {
  if (isAdminLoggedIn) {
    try {
      let data = {}; // Initialize the data object
      if (isHotel) {
        data = {
          hotelId: hotelId,
          hotelName: values.hotelName,
          location: values.location,
          address: values.address,
          mobile: values.mobile,
          ratings: values.ratings,
          // Optionally handle images as a Base64 string:
          // images: values.images ? await toBase64(values.images) : null,
        };

        const response = await axios.patch('http://localhost:3000/admins/update-hotel', data, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("updateHotel response-->", response)
        if (!response.data.error) {
          navigate("/admin/home")
          alert("Hotel Updated Successfully");
          resetForm(); // Reset the form fields
        } else {
          alert("Error in updating hotel");
          console.log("Error: " + response.data.error.message);
        }
      } else {
        // Handle room update logic here, if needed
        data = {
          roomId: roomId,
          roomNo: values.roomNo,
          roomType: values.roomType,
          pricePerNight: values.pricePerNight,
        };

        const response = await axios.patch(`http://localhost:3000/admins/update-room`, data, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("room update response====>", response)
        if (!response.data.error) {
          alert("Room Updated Successfully");
          navigate("/admin/home")
          resetForm(); // Reset the form fields
        } else {
          alert("Error in updating room");
          console.log("Error: " + response.data.error.message);
        }
      }
    } catch (error) {
      alert("Error during submission");
      console.log('Error during submission: ' + (error.response ? error.response.data.message : error.message));
    }
  }
};

  const locations = [
    { value: "", label: "Select Location" },
    { value: "Islamabad", label: "Islamabad" },
    { value: "Karachi", label: "Karachi" },
    { value: "Lahore", label: "Lahore" },
    { value: "Peshawar", label: "Peshawar" },
    { value: "Quetta", label: "Quetta" },
  ];

 const roomTypes = [
    { value: "", label: "Select Room Type" },
    { value: "suite", label: "Suite" },
    { value: "single", label: "Single" },
    { value: "double", label: "Double" },
  ];  

  return (
    <div className="add-form-container">
      <h1 className="add-form-title">{isHotel ? "Edit Hotel" : "Edit Room"}</h1>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}  // Enable reinitializing of the form when initialValues change
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form className="add-form" >
            {/* Hotel Name Field (Only for hotels) */}
            <div className="form-field">
              <Field
                type="text"
                name="hotelName"
                placeholder="Enter hotel name"
                className="input-field"
                disabled={!isHotel && roomId}
              // value={!isHotel ? initialValues.hotelName : ""}
              />
              <p className="error-message">
                <ErrorMessage name="hotelName" />
              </p>
            </div>
            
            {isHotel && (
              <>
                {/* Location Dropdown */}
                <div className="form-field">
                  <Field as="select" name="location" className="select-field">
                    {locations.map((location) => (
                      <option key={location.value} value={location.value}>
                        {location.label}
                      </option>
                    ))}
                  </Field>
                  <p className="error-message">
                    <ErrorMessage name="location" />
                  </p>
                </div>

                {/* Address Field */}
                <div className="form-field">
                  <Field
                    type="text"
                    name="address"
                    placeholder="Enter address"
                    className="input-field"
                  />
                  <p className="error-message">
                    <ErrorMessage name="address" />
                  </p>
                </div>

                {/* Mobile Field */}
                <div className="form-field">
                  <Field
                    type="text"
                    name="mobile"
                    placeholder="Enter mobile number"
                    className="input-field"
                  />
                  <p className="error-message">
                    <ErrorMessage name="mobile" />
                  </p>
                </div>

                {/* Ratings Dropdown (Only for hotels) */}
                <div className="form-field">
                  <Field as="select" name="ratings" className="select-field">
                    <option value="" disabled>Select your ratings</option>
                    {[1, 2, 3, 4, 5].map((rate) => (
                      <option key={rate} value={rate}>{rate}</option>
                    ))}
                  </Field>
                  <p className="error-message">
                    <ErrorMessage name="ratings" />
                  </p>
                </div>

                {/* Image Upload Field */}
                <div className="form-field">
                  <input
                    type="file"
                    name="images"
                    accept="image/jpeg, image/png, image/jpg"
                    onChange={(event) => {
                      setFieldValue("images", event.currentTarget.files[0]);
                    }}
                    className="input-field"
                  />
                  <p className="error-message">
                    <ErrorMessage name="images" />
                  </p>
                </div>
              </>
            )}

            {/* Room-specific fields (Only for rooms) */}
            {!isHotel && (
              <>
                <div className="form-field">
                  <Field
                    type="text"
                    name="roomNo"
                    placeholder="Enter room number"
                    className="input-field"
                  />
                  <p className="error-message">
                    <ErrorMessage name="roomNo" />
                  </p>
                </div>

                <div className="form-field">
                  <Field as="select" name="roomType" className="select-field">
                    {roomTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </Field>
                  <p className="error-message">
                    <ErrorMessage name="roomType" />
                  </p>
                </div>

                <div className="form-field">
                  <Field
                    type="number"
                    name="pricePerNight"
                    placeholder="Enter room price Per Night"
                    className="input-field"
                  />
                  <p className="error-message">
                    <ErrorMessage name="pricePerNight" />
                  </p>
                </div>
              </>
            )}

            {/* Submit Button */}
            <button type="submit" className="submit-button">Update</button>
          </Form>
        )}
      </Formik> 
    </div>
  );
};

export default UpdateForm;
