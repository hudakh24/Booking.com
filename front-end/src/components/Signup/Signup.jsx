import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";

import * as Yup from "yup";
import axios from 'axios';


const SignupComponent = () => {
  const navigate = useNavigate();

  const initialValues = {
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
    mobile: "",
    email: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    userName: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
    mobile: Yup.string().length(13).required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
  });

  const handleSubmit = async (values) => {
    try {
      await axios.post('http://localhost:3000/register', values);
      navigate("/user-auth/login");
      // Handle the response (e.g., save the token, redirect, etc.)
    } catch (error) {
      console.error('Error during login:', error.response ? error.response.data.message : error.message);
    }
  };

  return (
    <>
      <div
        className={`flex min-h-screen items-center justify-center bg-gray-800 bg-[url('/book1.jpg')] bg-cover bg-center`}
      >
        <div className="rounded-lg bg-gray-700 bg-opacity-80 p-8 shadow-md">
          <h1 className="mb-4 text-2xl font-bold text-white">Register</h1>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <>
                <Form>
                  <div className="mb-4">
                    <label htmlFor="firstName" className="block text-white">
                      First Name
                    </label>
                    <Field
                      type="text"
                      id="firstName"
                      name="firstName"
                      className={`w-full rounded p-2 ${
                        errors.firstName && touched.firstName
                          ? "border-2 border-red-500"
                          : ""
                      }`}
                      placeholder="Enter your first name"
                    />
                    <p className="text-red-500">
                      <ErrorMessage name="firstName" />
                    </p>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="lastName" className="block text-white">
                      Last Name
                    </label>
                    <Field
                      type="text"
                      id="lastName"
                      name="lastName"
                      className={`w-full rounded p-2 ${
                        errors.lastName && touched.lastName
                          ? "border-2 border-red-500"
                          : ""
                      }`}
                      placeholder="Enter your last name"
                    />
                    <p className="text-red-500">
                      <ErrorMessage name="lastName" />
                    </p>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="userName" className="block text-white">
                      Username
                    </label>
                    <Field
                      type="text"
                      id="userName"
                      name="userName"
                      className={`w-full rounded p-2 ${
                        errors.userName && touched.userName
                          ? "border-2 border-red-500"
                          : ""
                      }`}
                      placeholder="Enter your username"
                    />
                    <p className="text-red-500">
                      <ErrorMessage name="userName" />
                    </p>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="email" className="block text-white">
                      Email
                    </label>
                    <Field
                      type="text"
                      id="email"
                      name="email"
                      className={`w-full rounded p-2 ${
                        errors.email && touched.email
                          ? "border-2 border-red-500"
                          : ""
                      }`}
                      placeholder="Enter your email"
                    />
                    <p className="text-red-500">
                      <ErrorMessage name="email" />
                    </p>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="mobile" className="block text-white">
                      Mobile
                    </label>
                    <Field
                      type="text"
                      id="mobile"
                      name="mobile"
                      className={`w-full rounded p-2 ${
                        errors.mobile && touched.mobile
                          ? "border-2 border-red-500"
                          : ""
                      }`}
                      placeholder="+92xxxxxxxxxx"
                    />
                    <p className="text-red-500">
                      <ErrorMessage name="mobile" />
                    </p>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="password" className="block text-white">
                      Password
                    </label>
                    <Field
                      type="password"
                      id="password"
                      name="password"
                      className={`w-full rounded p-2 ${
                        errors.password && touched.password
                          ? "border-2 border-red-500"
                          : ""
                      }`}
                      placeholder="Enter your password"
                    />
                    <p className="text-red-500">
                      <ErrorMessage name="password" />
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded bg-yellow-600 py-2 text-white transition hover:bg-yellow-700"
                  >
                    Register
                  </button>
                </Form>
              </>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default SignupComponent;
