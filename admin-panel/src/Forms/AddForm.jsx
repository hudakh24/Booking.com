import { Formik, Form, Field, ErrorMessage } from "formik";
import { useContext, useRef } from "react";
import { AuthContext } from "../contexts/authContext";
import * as Yup from "yup";
import axios from "axios";
import PropTypes from "prop-types";

import "./index.css"; // Import the CSS file

const AddForm = ({ isHotel }) => {
  const { isAdminLoggedIn } = useContext(AuthContext);
  const token = localStorage.getItem("authAdminToken");
  const fileInputRef = useRef(null); // Ref to capture the file input

  const initialValues = {
    hotelName: "",
    location: "",
    address: "",
    mobile: "",
    ratings: "",
    images: "",
    roomNo: "",
    roomType: "",
    pricePerNight: "",
  };

  const validationSchema = Yup.object({
    hotelName: Yup.string().required("Hotel name is required"),
    location: isHotel
      ? Yup.string().required("Location is required")
      : Yup.string(),
    address: isHotel
      ? Yup.string().required("Address is required")
      : Yup.string(),
    mobile: isHotel
      ? Yup.string()
          .matches(
            /^\+92 \d{2} \d{3} \d{3} \d{3}$/,
            "Mobile number must be in the format +92 42 111 505 505"
          )
          .required("Mobile number is required")
      : Yup.string(),
    ratings: isHotel
      ? Yup.string().required("Rating is required")
      : Yup.string(),
    images: isHotel
      ? Yup.mixed()
          .test("fileSize", "File too large", (value) => {
            return !value || (value && value.size <= 2 * 1024 * 1024);
          })
          .test("fileType", "Unsupported File Format", (value) => {
            return (
              !value ||
              (value &&
                (value.type === "image/jpg" ||
                  value.type === "image/jpeg" ||
                  value.type === "image/png"))
            );
          })
          .required("Image is required")
      : Yup.mixed(),
    roomNo: isHotel
      ? Yup.string()
      : Yup.string().required("Room number is required"),
    roomType: isHotel
      ? Yup.string()
      : Yup.string().required("Room type is required"),
    pricePerNight: isHotel
      ? Yup.string()
      : Yup.number().required("Price per night is required").positive(),
  });

  const handleSubmit = async (values, { resetForm }) => {
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

        if (isHotel) {
          const response = await axios.post(
            "http://localhost:3000/admins/add-hotel",
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );
          if (!response.data.error) {
            resetForm();
            if (fileInputRef.current) {
              fileInputRef.current.value = "";
            }
            alert("Hotel Added Successfully");
          } else {
            alert(`Error in adding Hotel ${response.data.error.message} `);
            console.log("Error: " + response.data.error.message);
          }
        } else {
          const roomData = {
            roomNo: values.roomNo,
            roomType: values.roomType,
            pricePerNight: values.pricePerNight,
            hotelName: values.hotelName,
          };
          // formData.append("roomNo", values.roomNo);
          // formData.append("roomType", values.roomType);
          // formData.append("pricePerNight", values.pricePerNight);
          //formData.append("hotelName", values.hotelName);

          console.log("values", values);
          const response = await axios.post(
            "http://localhost:3000/admins/create-room",
            roomData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log("rooms response--->", response.data);
          if (!response.data.error) {
            resetForm();
            alert("Room Added Successfully");
          } else {
            alert(`Error in adding Room ${response.data.error.message} `);
            console.log("Error: " + response.data.error.message);
          }
        }
      } catch (error) {
        alert("Error in adding item");
        console.log(
          "Error during submission: " +
            (error.response ? error.response.data.message : error.message)
        );
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
      <h1 className="add-form-title">{isHotel ? "Add Hotel" : "Add Room"}</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form className="add-form">
            {/* Hotel Name Field (Only for hotels) */}
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
                    ref={fileInputRef} // Attach ref here
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
            <button type="submit" className="submit-button">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

AddForm.propTypes = {
  isHotel: PropTypes.bool,
};

export default AddForm;
