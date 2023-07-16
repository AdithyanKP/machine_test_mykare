import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import LoginForm from "./components/LoginForm/LoginForm";
import AdminHomePage from "./components/AdminHomePage/AdminHomePage";
import RegistrationForm from "./components/RegisterForm/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="flex bg-white/30 w-full h-screen backdrop-blur-md">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/admin-home" element={<AdminHomePage />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
