import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const LoginComponent = () => {
  const [mode, setMode] = useState("login");

  // Toggle between login and signup
  const toggleMode = () => {
    setMode(mode === "login" ? "signup" : "login");
  };

  const initialValues = {
    username: "",
    password: "",
    fullname: "",
    email: "",
    createpassword: "",
    repeatpassword: "",
  };

  const validationSchema = Yup.object({
    username:
      mode === "login" ? Yup.string().required("Required") : Yup.string(),
    password:
      mode === "login" ? Yup.string().required("Required") : Yup.string(),
    fullname:
      mode === "signup" ? Yup.string().required("Required") : Yup.string(),
    email:
      mode === "signup"
        ? Yup.string().email("Invalid email").required("Required")
        : Yup.string(),
    createpassword:
      mode === "signup"
        ? Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Required")
        : Yup.string(),
    repeatpassword:
      mode === "signup"
        ? Yup.string()
            .oneOf([Yup.ref("createpassword")], "Passwords must match")
            .required("Required")
        : Yup.string(),
  });

  const handleSubmit = (values) => {
    console.log(values);
  };
  // Formik logic
  return (
    <>
      <div
        className={`flex min-h-screen items-center justify-center bg-gray-800 bg-[url('/book1.jpg')] bg-cover bg-center`}
      >
        <div className="rounded-lg bg-gray-700 bg-opacity-80 p-8 shadow-md">
          <h1 className="mb-4 text-2xl font-bold text-white">
            {mode === "login" ? "Welcome Back!" : "Sign up"}
          </h1>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              console.log("Errors:", errors),
              console.log("Touched:", touched),
              (
                <Form>
                  {/* Login Inputs */}
                  {/*Here && is condition rendering i-e If mode === "login" is true, the JSX inside the parentheses is rendered.s*/}
                  {mode === "login" && (
                    <>
                      <div className="mb-4">
                        {/* htmlFor attribute links the label to the input with the id "username",  If a user clicks on the label ("Username"), the input field is automatically focused,*/}
                        <label htmlFor="username" className="block text-white">
                          Username
                        </label>
                        <Field
                          type="text"
                          id="username"
                          name="username"
                          className={`w-full rounded p-2 ${
                            errors.username && touched.username
                              ? "border-2 border-red-500"
                              : ""
                          }`}
                          placeholder="Enter your username"
                        />
                        <p className="text-red-500">
                          <ErrorMessage name="username" />
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
                            errors.username && touched.username
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
                  )}

                  {/* Signup Inputs */}
                  {mode === "signup" && (
                    <>
                      <div className="mb-4">
                        <label htmlFor="fullname" className="block text-white">
                          Full Name
                        </label>
                        <Field
                          type="text"
                          id="fullname"
                          name="fullname"
                          className={`w-full rounded p-2 ${
                            errors.fullname && touched.fullname
                              ? "border-2 border-red-500"
                              : ""
                          }`}
                          placeholder="Enter your full name"
                        />
                        <p className="text-red-500">
                          <ErrorMessage name="fullname" />
                        </p>
                      </div>
                      <div className="mb-4">
                        <label htmlFor="email" className="block text-white">
                          Email
                        </label>
                        <Field
                          type="email"
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
                          <ErrorMessage name="username" />
                        </p>
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="createpassword"
                          className="block text-white"
                        >
                          Create Password
                        </label>
                        <Field
                          type="password"
                          id="createpassword"
                          name="createpassword"
                          className={`w-full rounded p-2 ${
                            errors.createpassword && touched.createpassword
                              ? "border-2 border-red-500"
                              : ""
                          }`}
                          placeholder="Create a password"
                        />
                        <p className="text-red-500">
                          <ErrorMessage name="createpassword" />
                        </p>
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="repeatpassword"
                          className="block text-white"
                        >
                          Repeat Password
                        </label>
                        <Field
                          type="password"
                          id="repeatpassword"
                          name="repeatpassword"
                          className={`w-full rounded p-2 ${
                            errors.repeatpassword && touched.repeatpassword
                              ? "border-2 border-red-500"
                              : ""
                          }`}
                          placeholder="Repeat your password"
                        />
                        <p className="text-red-500">
                          <ErrorMessage name="repeatpassword" />
                        </p>
                      </div>
                    </>
                  )}

                  <button
                    type="submit"
                    className="w-full rounded bg-yellow-600 py-2 text-white transition hover:bg-yellow-700"
                  >
                    {mode === "login" ? "Log In" : "Sign Up"}
                  </button>
                </Form>
              )
            )}
          </Formik>

          <div className="mt-4 text-center text-sm text-white">
            {mode === "login"
              ? "Don't have an account?"
              : "Already have an account?"}
            <span
              className="ml-2 cursor-pointer text-yellow-500"
              onClick={toggleMode}
            >
              {mode === "login" ? "Sign up" : "Log in"} here →
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginComponent;
