import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RegistrationForm = () => {
  const navigate = useNavigate();

  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    console.log(data);

    const newUser = {
      name: data?.name,
      email: data?.email,
      password: data?.password,
    };

    // Add the new user to the array
    if (newUser?.name && newUser?.email && newUser?.password) {
      // Retrieve existing users from local storage
      const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

      // Check if the email already exists in the array
      const emailExists = storedUsers.some(
        (user) => user.email === newUser?.email
      );

      if (emailExists) {
        toast.error("This user already exists", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          theme: "dark",
        });
        return;
      }

      storedUsers.push(newUser);
      // Save the updated array back to local storage
      localStorage.setItem("users", JSON.stringify(storedUsers));
      toast.success("Registration completed successfully Please login", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "dark",
      });

      reset();
    }
  };

  const backToHomeHandle = () => {
    navigate("/");
  };
  const loginHandle = () => {
    navigate("/login");
  };

  return (
    <div className="mx-auto bg-white 0 p-6 shadow-md rounded md:w-[600px] h-[500px] mt-[180px] w-[360px] ">
      <h2 className="text-2xl font-bold mb-6">Registration</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 font-medium mb-2"
          >
            Name
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
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className={`border ${
              errors.email ? "border-red-500" : "border-gray-400"
            } rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500`}
            placeholder="Enter your email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
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
        <div className="flex flex-row">
          <div className="m-2">
            <Button type="submit" title="Submit" onClick={onSubmit} />
          </div>
          <div className="m-2">
            <Button title="Login" onClick={loginHandle} />
          </div>
          <div className="m-2">
            <Button title="Back to Home" onClick={backToHomeHandle} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
