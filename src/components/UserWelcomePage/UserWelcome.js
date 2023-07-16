import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";

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

  const logoutHandler = () => {
    navigate("/");
  };

  return (
    <div className=" w-full flex flex-col p-[40px]">
      <div className="flex justify-end m-4">
        <Button title="Logout" onClick={logoutHandler} />
      </div>
      <div className="flex justify-center mt-[100px]">
        <p className="text-[30px] text-[green] font-semibold ">Welcome</p>
      </div>
    </div>
  );
};

export default UserWelcome;
