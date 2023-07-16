import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { toastOptions } from "../../utils";

const AdminHomePage = () => {
  const navigate = useNavigate();
  const [validAdmin, setvalidadmin] = useState(false);

  //admin token validation
  useEffect(() => {
    const token = localStorage.getItem("admin");
    if (token) {
      setvalidadmin(true);
    } else {
      setvalidadmin(false);
    }
  });

  //backbuttonHandling
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

  // Retrieve existing users from local storage
  const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

  const onBackButtonClick = () => {
    navigate("/");
  };
  const onLogoutButtonClick = () => {
    localStorage.removeItem("admin");
    navigate("/");
    toast.success("SuccessFully logout ", toastOptions);
  };

  return (
    <div className="w-full mx-auto mt-8 bg-white p-6 shadow-md rounded">
      {validAdmin ? (
        <div className="md:p-[30px]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Users List</h2>
            <div className="flex justify-end m-1">
              <div className="m-2">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
                  onClick={onBackButtonClick}
                >
                  Back
                </button>
              </div>
              <div className="m-2">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
                  onClick={onLogoutButtonClick}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
          {storedUsers.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left font-medium text-gray-700 py-2">
                    Name
                  </th>
                  <th className="text-left font-medium text-gray-700 py-2">
                    Email
                  </th>
                </tr>
              </thead>
              <tbody>
                {storedUsers.map((user, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-gray-100" : "bg-white"
                    }`}
                  >
                    <td className="py-2">{user.name}</td>
                    <td className="py-2">{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-700">No users found</p>
          )}
        </div>
      ) : (
        <p className="flex w-full justify-center text-[30px] text-[red]">
          Access denied Please Login
        </p>
      )}
    </div>
  );
};

export default AdminHomePage;
