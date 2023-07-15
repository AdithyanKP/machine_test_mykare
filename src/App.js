import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import LoginForm from "./components/LoginForm/LoginForm";
import Register from "./components/RegisterForm/Register";
import AdminHomePage from "./components/AdminHomePage/AdminHomePage";

function App() {
  return (
    <div className="flex bg-white/30 w-full h-screen backdrop-blur-md">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin-home" element={<AdminHomePage />} />
      </Routes>
    </div>
  );
}

export default App;
