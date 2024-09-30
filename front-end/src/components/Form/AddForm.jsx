import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import './Form.css'; // Import the CSS file
// import { useNavigate } from "react-router-dom";

const AddForm = () => {
  const { isAdminLoggedIn } = useContext(AuthContext);
  const token = localStorage.getItem("authAdminToken");
  // const navigate = useNavigate();

  const initialValues = {
    hotelName: "",
    location: "",
    address: "",
    mobile: "",
    ratings: "",
    images: "",
  };

  const validationSchema = Yup.object({
    hotelName: Yup.string().required("Hotel name is required"),
    location: Yup.string().required("Location is required"),
    address: Yup.string().required("Address is required"),
    mobile: Yup.string()
      .matches(/^\+92 \d{2} \d{3} \d{3} \d{3}$/, "Mobile number must be in the format +92 42 111 505 505")
      .required("Mobile number is required"),
    ratings: Yup.string().required("Rating is required"),
    images: Yup.mixed()
      .test("fileSize", "File too large", (value) => {
        return !value || (value && value.size <= 2 * 1024 * 1024);
      })
      .test("fileType", "Unsupported File Format", (value) => {
        return !value || (value && (value.type === "image/jpg" ||value.type === "image/jpeg" || value.type === "image/png"));
      }),
  });

  const handleSubmit = async (values, { resetForm }) => { //resetForm-> Helper Function of formik
    if (isAdminLoggedIn) {
      try {
        const formData = new FormData();
        formData.append("hotelName", values.hotelName);
        formData.append("location", values.location);
        formData.append("address", values.address);
        formData.append("mobile", values.mobile);
        formData.append("ratings", values.ratings);

        if (values.images) {
          formData.append("images", values.images);
        }

        const response = await axios.post('http://localhost:3000/admins/add-hotel', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });

        // Check if there is no error in the response
        if (!response.data.error) {
          resetForm(); // Reset the form fields
          alert("Hotel Added Successfully"); 
          
        } else {
          alert("Error in adding Hotel");
          console.log("Error: " + response.data.error); 
        }

      } catch (error) {
        alert("Error in adding Hotel");
        console.log('Error during submission: ' + (error.response ? error.response.data.message : error.message));
      }
    }
  };

  // Sample locations for dropdown
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
      <h1 className="add-form-title">Add Hotel</h1>
      <Formik
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

            {/* image Upload Field */}
            <div className="form-field">
              <input
                type="file"
                name="images"
                accept="image/jpeg, image/png. image/jpg"
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
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddForm;
