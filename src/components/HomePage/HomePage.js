import React from "react";
import Button from "../Button/Button";

const HomePage = () => {
  return (
    <div className="flex w-full flex-col m-2 md:m-4 p-1 md:p-4">
      <div className="flex flex-row justify-end p-2 md:mr-20">
        <div className="flex m-2">
          <Button title="Login" />
        </div>
        <div className="flex m-2">
          <Button title="Register" />
        </div>
      </div>
      <div className="flex justify-center align-middle mt-[250px]">
        <p className="text-[green] md:text-[50px] text-[30px] font-sans">
          Welcome to mykare
        </p>
      </div>
    </div>
  );
};

export default HomePage;
