import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/home";
import AddCertificate from "./pages/AddCertificate";
import ViewCertificate from "./pages/ViewCertificate";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} /> 
        <Route path="/login" element={<Login />} /> 
        <Route path="/home" element={<Home />} /> 
        <Route path="/issue" element={<AddCertificate />} /> 
        <Route path="/viewCertificate/:certificateId" element={<ViewCertificate />} />
      </Routes>
    </Router>
  );
}

export default App;
