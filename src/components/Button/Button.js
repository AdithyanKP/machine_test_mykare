import React from "react";

const Button = ({ title }) => {
  return (
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      {title}
    </button>
  );
};

export default Button;
