import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/"); // Navigate to the homepage or any other path you prefer
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 p-4">
      <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Oops! Page not found</h2>
      <p className="text-gray-600 mb-6">
        The page you are looking for does not exist or an error occurred.
      </p>
      <button
        onClick={handleBackToHome}
        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Back to Home
      </button>
    </div>
  );
};

export default ErrorPage;
