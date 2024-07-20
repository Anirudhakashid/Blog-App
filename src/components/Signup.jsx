import React from "react";
import { useState } from "react";
import authservice from "../appwrite/auth";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Login from "./Login";
import { Input, Button } from "./index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { login } from "../store/authSlice";
import { Logo } from "./index";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    // setError = "";
    try {
      const userData = await authservice.createAccount(data);
      if (userData) {
        const userData = await authservice.getCurrentUser();
        if (userData) {
          dispatch(login(userData));
        }
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center mt-16 ">
      <div
        className={`mx-auto w-full max-w-lg dark:bg-gray-800 bg-gray-100 rounded-xl p-10 border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full maax-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leadinf-tight dark:text-white">
          Sign Up to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60 dark:text-white">
          Already have an Account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline dark:text-white"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(create)}>
          <div className="space-y-5 dark:text-white relative">
            <Input
              label="Full Name:"
              placeholder="Enter Your Full Name"
              {...register("name", {
                required: true,
              })}
            />
            <Input
              label="Email: "
              placeholder="Enter your Email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/gim.test(value) ||
                    "Email address must be a Valid adderess",
                },
              })}
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter Your Password"
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
