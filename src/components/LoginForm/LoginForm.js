import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginForm = () => {
  const navigate = useNavigate();
  const validationSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
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

    // Retrieve existing users from local storage
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Check if the email already exists in the array
    const emailExists = storedUsers.some((user) => user.email === data?.email);

    if (!emailExists) {
      toast.error("Incorrect email ", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "dark",
      });
      return;
    } else {
      let userDetails = storedUsers.find(
        (element) => element?.email === data?.email
      );

      if (userDetails.password === data?.password) {
        navigate("/");
        toast.success("SuccessFully logged in ", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          theme: "dark",
        });
      } else {
        toast.error("Incorrect password ", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          theme: "dark",
        });
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
