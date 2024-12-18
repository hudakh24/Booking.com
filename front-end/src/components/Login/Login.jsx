import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState, useContext} from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from 'axios';

const LoginComponent = () => {
  const { login } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  // const location = useLocation();
  // const redirectPath = new URLSearchParams(location.search).get('redirect') || '/';

  const initialValues = {
    userName: "",
    password: "",
  };

  const validationSchema = Yup.object({
    userName: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  });

  const handleSubmit = async (values) => {
    try {
      const apiUrl ='http://localhost:3000';

      const response = await axios.post(apiUrl, values);
    // console.log("response--->", response)

      if (response.data.response.response && 
          response.data.response.response !== "Invalid User" &&
          response.data.response.response !== "Invalid Credentials") 
      {
          login(response.data.response.response); // Call login from context to update global state
          navigate("/")
          // navigate(redirectPath);
      } 
      else 
      {
        setError("Invalid login credentials.");
      }
    } catch (error) {
      console.error('Error during login:', error.response ? error.response.data.message : error.message);
      setError('Error during login: ' + (error.response ? error.response.data.message : error.message));
    }
  };
  

  // Formik logic
  return (
    <div className={`flex min-h-screen items-center justify-center bg-gray-800 bg-[url('/book1.jpg')] bg-cover bg-center`}>
      <div className="rounded-lg bg-gray-700 bg-opacity-80 p-8 shadow-md">
        <h1 className="mb-4 text-2xl font-bold text-white">Welcome Back!</h1>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="mb-4">
                <label htmlFor="username" className="block text-white">Username</label>
                <Field
                  type="text"
                  id="username"
                  name="userName"
                  className={`w-full rounded p-2 ${errors.userName && touched.userName ? "border-2 border-red-500" : ""}`}
                  placeholder="Enter your username"
                />
                <p className="text-red-500"><ErrorMessage name="userName" /></p>
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block text-white">Password</label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className={`w-full rounded p-2 ${errors.password && touched.password ? "border-2 border-red-500" : ""}`}
                  placeholder="Enter your password"
                />
                <p className="text-red-500"><ErrorMessage name="password" /></p>
              </div>

              <button
                type="submit"
                className="w-full rounded bg-yellow-600 py-2 text-white transition hover:bg-yellow-700"
              >
                Log In
              </button>
              {error && <p className="text-red-500 mt-4">{error}</p>}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginComponent;
