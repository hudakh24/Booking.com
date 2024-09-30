import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import './Form.css'; // Import the CSS file

const UpdateForm = ({ hotelName }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const token = localStorage.getItem("authToken");

  // State to store initial form data
  const [initialValues, setInitialValues] = useState({
    hotelName: "",
    location: "",
    address: "",
    mobile: "",
    ratings: "",
    images: "",
  });

  // Fetch the hotel details using the passed hotelName to pre-populate the form
  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/admins/get-hotel?hotelName=${hotelName}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const hotelData = response.data.response.response;
        setInitialValues({
          hotelName: hotelData.hotelName,
          location: hotelData.location,
          address: hotelData.address,
          mobile: hotelData.mobile,
          ratings: hotelData.ratings,
          imagess: hotelData.imagess, // Leave empty initially for new images upload
        });
      } catch (error) {
        console.error('Error fetching hotel details:', error);
      }
    };
    if (hotelName) {
      fetchHotelDetails();
    }
  }, [hotelName, token]);

  const validationSchema = Yup.object({
    hotelName: Yup.string().required("Hotel name is required"),
    location: Yup.string(),
    address: Yup.string(),
    mobile: Yup.string()
      .matches(/^\+92 \d{2} \d{3} \d{3} \d{3}$/, "Mobile number must be in the format +92 42 111 505 505"),
    ratings: Yup.number(),
    images: Yup.mixed()
      .test("fileSize", "File too large", (value) => {
        return !value || (value && value.size <= 2 * 1024 * 1024); // Limit to 2MB
      })
      .test("fileType", "Unsupported File Format", (value) => {
        return !value || (value && (value.type === "images/jpeg" || value.type === "images/png")); // Corrected file types
      }),
  });

 const handleSubmit = async (values, { resetForm }) => {
  if (isLoggedIn) {
    try {
      // Prepare the request body data
      const data = {
        hotelName: values.hotelName,
        location: values.location,
        address: values.address,
        mobile: values.mobile,
        ratings: values.ratings,
        // Optionally handle the images field as a Base64 string, if necessary:
        // images: values.images ? await toBase64(values.images) : null,
      };

      const response = await axios.patch('http://localhost:3000/admins/update-hotel', data, {
        headers: {
          'Content-Type': 'application/json', // Set the content type to JSON
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("---->", response)
      if (!response.data.error) {
        resetForm(); // Reset the form fields
        alert("Hotel Updated Successfully");
      } else {
        alert("Error in updating hotel");
        console.log("Error: " + response.data.error.message);
      }

    } catch (error) {
      alert("Error in updating hotel");
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

  return (
    <div className="add-form-container">
      <h1 className="add-form-title">Edit Hotel</h1>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form className="add-form">
            {/* Hotel Name Field */}
            <div className="form-field">
              <Field
                type="text"
                name="hotelName"
                placeholder="Enter hotel name"
                className="input-field"
              />
              <p className="error-message">
                <ErrorMessage name="hotelName" />
              </p>
            </div>

            {/* Location Dropdown */}
            <div className="form-field">
              <Field
                as="select"
                name="location"
                className="select-field"
              >
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

            {/* Ratings Dropdown */}
            <div className="form-field">
              <Field
                as="select"
                name="ratings"
                className="select-field"
              >
                <option value="" disabled>
                  Select your ratings
                </option>
                {[1, 2, 3, 4, 5].map((rate) => (
                  <option key={rate} value={rate}>
                    {rate}
                  </option>
                ))}
              </Field>
              <p className="error-message">
                <ErrorMessage name="ratings" />
              </p>
            </div>

            {/* images Upload Field */}
            <div className="form-field">
              <input
                type="file"
                name="images"
                accept="images/jpeg, images/png"
                onChange={(event) => {
                  setFieldValue("images", event.currentTarget.files[0]);
                }}
                className="input-field"
              />
              <p className="error-message">
                <ErrorMessage name="images" />
              </p>
            </div>

            <button
              type="submit"
              className="submit-button"
            >
              Update
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UpdateForm;
