import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import * as Yup from "yup";
import axios from 'axios';

const LoginComponent = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [error, setError] = useState("");

  const initialValues = {
    userName: "",
    password: "",
    
  };

  const validationSchema = Yup.object({
    userName: Yup.string().required("Required") ,
    password: Yup.string().required("Required") 
  });

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post('http://localhost:3000', values);
      
      if (response.data.response.response && response.data.response.response!="Invalid User" && response.data.response.response!="Invalid Credentials" ) {
        // Store the token in localStorage or sessionStorage
        // localStorage.setItem("authToken", response.data.response.response);

        login(response.data.response.response); // Call login from context to update global state
        // Replace the current history state to prevent back navigation
        window.history.replaceState(null, null, "/");

        navigate("/");
      } else {
        // If no token, set an error message
        setError("Invalid login credentials.");
        // navigate("/login");

      }
      // if(response.data.response == "Invalid User" || response.data.response == "Invalid Credentials")
      // {navigate("/Login");}
      // else{navigate("/")}
      // Handle the response (e.g., save the token, redirect, etc.)
    } catch (error) {
      console.error('Error during login:', error.response ? error.response.data.message : error.message);
      setError('Error during login', error.response ? error.response.data.message : error.message)
    }
  };


  // Formik logic
  return (
    <>
      <div
        className={`flex min-h-screen items-center justify-center bg-gray-800 bg-[url('/book1.jpg')] bg-cover bg-center`}
      >
        <div className="rounded-lg bg-gray-700 bg-opacity-80 p-8 shadow-md">
          <h1 className="mb-4 text-2xl font-bold text-white">
            Welcome Back!
          </h1>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              (
                <Form>
                    <>
                      <div className="mb-4">
                        {/* htmlFor attribute links the label to the input with the id "username",  If a user clicks on the label ("Username"), the input field is automatically focused,*/}
                        <label htmlFor="username" className="block text-white">
                          Username
                        </label>
                        <Field
                          type="text"
                          id="username"
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
                    </>
                  <button
                    type="submit"
                    className="w-full rounded bg-yellow-600 py-2 text-white transition hover:bg-yellow-700"
                  >Log In
                  </button>
                  {error && <p className="text-red-500 mt-4">{error}</p>}
                </Form>
              )
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default LoginComponent;
