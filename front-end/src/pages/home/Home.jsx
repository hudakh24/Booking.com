import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate(); // This hook is used to navigate programmatically

  const handleLoginClick = () => {
    navigate("/login"); // This will navigate to the /login route
  };

  return (
    <>
      <h1>HomePage</h1>
      <button onClick={handleLoginClick}>Login</button>
    </>
  );
};

export default Home;
