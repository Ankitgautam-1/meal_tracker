import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";

import { Navigate, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import { removeUser } from "../store/actions";
import { axiosConfig } from "./SignUp";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import isWeekend from "date-fns/isWeekend";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import "react-toastify/dist/ReactToastify.css";
interface Meals {
  text: string;
  Date: string;
  meal_id: string;
  cal: string;
}
const Home = () => {
  const navigate = useNavigate();

  const [selectedDate, setselectedDate] = useState<any>(new Date());
  const [cookies, setCookies] = useCookies(["authenticated"]);
  const [meals, setmeals] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    if (cookies.authenticated === "true") {
      console.log("in useEffect ", selectedDate.toLocaleDateString());

      const fetchMeal = async () => {
        const data = await axios.post(
          "http://localhost:3030/getMealByDate",
          {
            date: selectedDate.toLocaleDateString(),
            userId: "c50f4456-6367-4818-bfeb-ad44f944d2fa",
          },
          axiosConfig
        );
        return data;
      };
      fetchMeal()
        .then((data) => {
          setmeals(data.data);
          console.log("data", data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [cookies.authenticated, selectedDate]);
  let newDate = new Date();
  let month = newDate.getMonth() + 1;
  let todaysDate =
    newDate.getFullYear() + "-" + month + "-" + newDate.getDate();
  console.log(todaysDate);

  if (cookies.authenticated === "false") {
    return <Navigate to="/login" replace />;
  }

  const handlesignout = async () => {
    const result = await axios.get("http://localhost:3030/signOutUser");
    console.log("result", typeof result.status);

    if (result.status === 200) {
      setCookies("authenticated", false);
      navigate("/login", {
        replace: true,
      });
      dispatch(removeUser());
    } else {
      toast.error("Error signing out");
    }
  };

  return (
    <div className="flex items-center justify-center flex-col py-10">
      <button
        className="bg-teal-700 px-5 py-1 rounded-md text-white"
        onClick={handlesignout}
      >
        sign out
      </button>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <StaticDatePicker<Date>
          orientation="landscape"
          openTo="day"
          value={selectedDate}
          onChange={(newValue) => {
            setselectedDate(newValue);
            console.log("date", newValue?.toLocaleDateString());
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>

      {meals.length > 0 ? (
        meals.map((meal: Meals) => {
          return (
            <div key={meal.meal_id} className="text-xl font-semibold">
              <div className="font-bold  inline">name </div>:{meal.text} cal:{" "}
              {meal.cal} Date: {meal.Date}
            </div>
          );
        })
      ) : meals === null ? (
        <div>Loading</div>
      ) : (
        <div>No meals</div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Home;
