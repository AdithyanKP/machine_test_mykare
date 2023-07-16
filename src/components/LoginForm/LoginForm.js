import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { toastOptions } from "../../utils";

const LoginForm = () => {
  const navigate = useNavigate();

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

  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    password: yup.string().required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    if (!data) return;

    if (data?.name === "admin" && data?.password === "admin") {
      //saving admin logedIn token
      localStorage.setItem("admin", true);
      navigate("/admin-home");
      toast.success("SuccessFully logged in ", toastOptions);

      return;
    } else {
      // Retrieve existing users from local storage
      const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

      // Check if the username already exists in the array
      const userNameExists = storedUsers.some(
        (user) => user.name === data?.name
      );

      if (!userNameExists) {
        toast.error("Incorrect user name ", toastOptions);
        return;
      } else {
        let userDetails = storedUsers.find(
          (element) => element?.name === data?.name
        );

        if (userDetails.password === data?.password) {
          navigate(`/user-home`);
          toast.success("SuccessFully logged in ", toastOptions);
        } else {
          toast.error("Incorrect password ", toastOptions);
        }
      }
    }
  };

  const registerHandle = () => {
    navigate("/register");
  };

  const backToHomeHandle = () => {
    navigate("/");
  };

  return (
    <div className="mx-auto bg-white 0 p-6 shadow-md rounded md:w-[600px] md:h-[400px] mt-[180px] w-[360px] h-[500px]">
      <h2 className="text-2xl font-bold mb-6">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 font-medium mb-2"
          >
            User name
          </label>
          <input
            type="text"
            id="name"
            className={`border ${
              errors.name ? "border-red-500" : "border-gray-400"
            } rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500`}
            placeholder="Enter your name"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className={`border ${
              errors.password ? "border-red-500" : "border-gray-400"
            } rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500`}
            placeholder="Enter your password"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
        <div className="flex md:flex-row flex-col">
          <div className="m-2">
            <Button type="submit" title="Submit" onClick={handleSubmit} />
          </div>
          <div className="m-2">
            <Button title="Register" onClick={registerHandle} />
          </div>
          <div className="m-2">
            <Button title="Back to Home" onClick={backToHomeHandle} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
