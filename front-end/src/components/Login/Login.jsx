import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const LoginComponent = () => {
  const initialValues = {
    userName: "",
    password: "",
    
  };

  const validationSchema = Yup.object({
    userName: Yup.string().required("Required") ,
    password: Yup.string().required("Required") 
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
            Welcome Back!
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
