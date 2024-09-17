import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Form from "./pages/Form.jsx";
import "./index.css";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Form />} />
      </Routes>
    </>
  );
};

export default App;
