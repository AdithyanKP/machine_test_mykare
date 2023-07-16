import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserWelcome = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const handleBackButton = (event) => {
      event.preventDefault();
      navigate("/");
    };

    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [navigate]);
  return (
    <div className=" w-full flex justify-center mt-[100px]">
      <p className="flex justify-center font-semibold text-[30px]">Welcome </p>
    </div>
  );
};

export default UserWelcome;
