import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoggedIn from "./LoggedIn";

export const axiosConfig = {
  headers: {
    "Content-Type": "application/json",
  },
};

const SignUp: React.FC = () => {
  const [cookies, setCookie] = useCookies(["authenticated"]);
  const [email, setemail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  console.log(typeof cookies.authenticated);

  if (cookies.authenticated === "true") {
    return <LoggedIn />;
  }
  const signInUser = async () => {
    try {
      const result = await axios.post(
        "http://localhost:3030/signUpuser",
        {
          userDetails: {
            username: username,
            email: email,
            password: password,
          },
        },
        axiosConfig
      );

      if (result.status === 201) {
        console.log(result.data);
        setCookie("authenticated", true);
        navigate("/home");
      } else {
        console.log(result.statusText);
      }
    } catch (error: unknown) {
      const mesage = error as AxiosError;
      const errormsg: String = JSON.stringify(mesage.response?.data);

      let msg: String = errormsg + "" || "Something went wrong";
      toast.error(msg, {
        theme: "dark",
        pauseOnFocusLoss: false,
        pauseOnHover: false,
      });
      console.log(error);
    }
  };
  return (
    <div className="h-screen flex">
      <div className="flex w-full lg:w-1/2 justify-center items-center bg-white space-y-8">
        <div className="w-full px-8 md:px-32 lg:px-24">
          <form
            className="bg-white rounded-md shadow-2xl p-5"
            onSubmit={(e) => {
              e.preventDefault();
              if (email.length > 0 && password.length > 0) {
                signInUser();
              }
            }}
          >
            <h1 className="text-gray-800 font-bold text-2xl mb-1">
              Hello Again!
            </h1>
            <p className="text-sm font-normal text-gray-600 mb-8">
              Welcome Back
            </p>
            <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
              <BiUserCircle className="text-gray-400" size={20} />
              <input
                id="username"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                className=" pl-2 w-full outline-none border-none"
                type="text"
                required
                name="username"
                placeholder="Username"
              />
            </div>
            <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
              <input
                id="email"
                onChange={(e) => {
                  setemail(e.target.value);
                }}
                className=" pl-2 w-full outline-none border-none"
                type="email"
                required
                name="email"
                placeholder="Email Address"
              />
            </div>

            <div className="flex items-center border-2 mb-12 py-2 px-3 rounded-2xl ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                className="pl-2 w-full outline-none border-none"
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
                type="password"
                required
                name="password"
                id="password"
                placeholder="Password"
              />
            </div>
            <button
              type="submit"
              className="block w-full bg-teal-600 mt-5 py-2 rounded-2xl hover:bg-teal-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
            >
              Login
            </button>
            <div className="flex justify-between mt-4">
              <Link
                to={"/login"}
                replace
                className="hover:-translate-y-1 transition-all duration-500 hover:text-teal-700"
              >
                Already have an account yet?
              </Link>
            </div>
          </form>
        </div>
      </div>
      <div
        className="hidden lg:flex w-full lg:w-1/2 
          justify-around items-center"
        style={{
          background:
            " linear-gradient(rgba(2,2,2,.7),rgba(0,0,0,.7)),url(https://cdn.pixabay.com/photo/2017/09/16/19/21/salad-2756467_960_720.jpg) center center",
        }}
      >
        <div
          className=" 
                  bg-black 
                  opacity-20 
                  inset-0 
                  z-0"
        ></div>
        <div className="w-full mx-auto px-20 flex-col items-center space-y-6">
          <h1 className="text-white font-bold text-4xl font-sans">
            Meal Tracker
          </h1>
          <p className="text-white mt-1">The simplest app to use</p>
          <div className="flex justify-center lg:justify-start mt-6">
            <a
              href="/"
              className="hover:bg-teal-700 hover:text-white hover:scale-110 transition-all duration-500 bg-white text-teal-800 mt-4 px-4 py-2 rounded-md font-bold mb-2"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
