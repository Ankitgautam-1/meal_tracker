import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";

import { Navigate, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import { removeUser } from "../store/actions";
import { axiosConfig } from "./SignUp";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import "react-toastify/dist/ReactToastify.css";

import Modal from "react-bootstrap/Modal";
import { setMeal } from "../store/mealActions";
import { BiEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import "bootstrap/dist/css/bootstrap.css";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BsFillCalculatorFill } from "react-icons/bs";
import { GiMeal } from "react-icons/gi";
interface Meals {
  text: string;
  Date: string;
  meal_id: string;
  cal: number;
}
const Home = () => {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [cal, setCal] = useState(0);
  const [newtext, setnewText] = useState("");
  const [newcal, setnewCal] = useState(0);
  const [selectedDate, setselectedDate] = useState<any>(new Date());
  const [cookies, setCookies] = useCookies(["authenticated"]);
  const [meals, setmeals] = useState([]);
  const dispatch = useDispatch();
  const [totalcal, setTotalCal] = useState(0);
  const userSelector = useSelector((state: any) => state.userReducer);
  useEffect(() => {
    if (cookies.authenticated === "true" && userSelector !== null) {
      const fetchMeal = async () => {
        const data = await axios.post(
          "http://localhost:3030/getMealByDate",
          {
            date: selectedDate.toLocaleDateString(),
            userId: userSelector.uid,
          },
          axiosConfig
        );
        dispatch(setMeal(data.data));
        return data;
      };
      fetchMeal()
        .then((data) => {
          setmeals(data.data);
          let total = 0;
          data.data.forEach((meal: Meals) => {
            total = total + meal.cal;
          });
          setTotalCal(total);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [cookies.authenticated, selectedDate, dispatch, userSelector]);
  const [selectedMeal, setSelectedMeal] = useState<Meals | any>(null);

  const [show, setShow] = useState(false);
  const [showforadd, setShowforadd] = useState(false);
  const closeshowforadd = () => {
    setShowforadd(false);
  };
  const openshowforadd = () => {
    setShowforadd(true);
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
      dispatch(setMeal([]));
    } else {
      toast.error("Error signing out");
    }
  };

  return (
    <div className="flex items-center justify-center flex-col py-10">
      <div className="flex items-center space-x-3">
        <button
          className="bg-transparent px-2 py-1 rounded-md text-teal-700"
          onClick={handlesignout}
        >
          Sign out
        </button>
        <button
          className="bg-teal-700 px-3 py-1 rounded-md text-white"
          onClick={openshowforadd}
        >
          <AiOutlinePlusCircle className=" inline-flex items-center justify-center" />{" "}
          <div className="text-sm inline"> Add Meal</div>
        </button>
      </div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <StaticDatePicker<Date>
          orientation="landscape"
          openTo="day"
          label="Meal Tracker"
          toolbarTitle="Meal Tracker"
          value={selectedDate}
          onChange={(newValue) => {
            setselectedDate(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <div className="text-lg text-teal-600 font-semibold">
            Meal Tracker
          </div>
        </Modal.Header>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            console.log(text, cal);

            if (text === "" || cal === 0 || cal < 0) {
              toast.error("Please fill all the fields correctly");
            } else {
              axios
                .post(
                  "http://localhost:3030/editMeal",
                  {
                    date: selectedMeal.Date,
                    userId: userSelector.uid,
                    mealId: selectedMeal.meal_id,
                    text: text,
                    cal: cal,
                  },
                  axiosConfig
                )
                .then((data) => {
                  if (data.status === 201) {
                    dispatch(setMeal(data.data));
                    setmeals(data.data);
                    toast.success("Meal updated", {
                      theme: "dark",
                      pauseOnFocusLoss: false,
                      pauseOnHover: false,
                    });
                    let total = 0;
                    data.data.forEach((meal: Meals) => {
                      total = total + meal.cal;
                    });
                    setTotalCal(total);

                    handleClose();
                  } else {
                    console.log(data);
                  }
                });
            }
          }}
        >
          {" "}
          <Modal.Body>
            <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
              <GiMeal />
              <input
                id="text"
                onChange={(e) => {
                  setText(e.target.value);
                }}
                className=" pl-2 w-full outline-none border-none"
                type="text"
                required
                defaultValue={selectedMeal === null ? "" : selectedMeal.text}
                name="text"
                placeholder="Meal Name"
              />
            </div>
            <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
              <BsFillCalculatorFill />
              <input
                id="email"
                onChange={(e) => {
                  setCal(parseInt(e.target.value));
                }}
                className=" pl-2 w-full outline-none border-none"
                type="number"
                defaultValue={selectedMeal === null ? 0 : selectedMeal.cal}
                required
                name="cal"
                placeholder="Calories"
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              onClick={handleClose}
              className="bg-gray-400 text-white text-sm px-3 py-1 rounded-md"
            >
              Close
            </button>
            <button
              type="submit"
              className="bg-teal-700 text-white text-sm px-3 py-1 rounded-md"
            >
              Save Changes
            </button>
          </Modal.Footer>
        </form>
      </Modal>
      <Modal show={showforadd} onHide={closeshowforadd}>
        <Modal.Header closeButton>
          <div className="text-lg text-teal-600 font-semibold">
            Meal Tracker
          </div>
        </Modal.Header>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            if (newtext === "" || newcal === 0 || newcal < 0) {
              toast.error("Please fill all the fields correctly");
            } else {
              axios
                .post(
                  "http://localhost:3030/addMeal",
                  {
                    date: selectedDate.toLocaleDateString(),
                    userId: userSelector.uid,

                    text: newtext,
                    cal: newcal,
                  },
                  axiosConfig
                )
                .then((data) => {
                  if (data.status === 201) {
                    dispatch(setMeal(data.data));
                    setmeals(data.data);
                    toast.success("Meal added", {
                      theme: "dark",
                      pauseOnFocusLoss: false,
                      pauseOnHover: false,
                    });
                    let total = 0;
                    data.data.forEach((meal: Meals) => {
                      total = total + meal.cal;
                    });
                    setTotalCal(total);

                    closeshowforadd();
                  } else {
                    console.log(data);
                  }
                });
            }
          }}
        >
          {" "}
          <Modal.Body>
            <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
              <GiMeal />
              <input
                id="text"
                onChange={(e) => {
                  setnewText(e.target.value);
                }}
                className=" pl-2 w-full outline-none border-none"
                type="text"
                required
                name="text"
                placeholder="Meal Name"
              />
            </div>
            <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
              <BsFillCalculatorFill />
              <input
                id="email"
                onChange={(e) => {
                  setnewCal(parseInt(e.target.value));
                }}
                className=" pl-2 w-full outline-none border-none"
                type="number"
                required
                name="cal"
                placeholder="Calories"
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              onClick={closeshowforadd}
              className="bg-gray-400 text-white text-sm px-3 py-1 rounded-md"
            >
              Close
            </button>
            <button
              type="submit"
              className="bg-teal-700 text-white text-sm px-3 py-1 rounded-md"
            >
              Add Meal
            </button>
          </Modal.Footer>
        </form>
      </Modal>
      {meals.length > 0 ? (
        meals.map((meal: Meals) => {
          return (
            <div
              key={meal.meal_id}
              className=" flex space-x-4  mb-2 justify-center"
            >
              <div className="text-lg   r  font-semibold">
                <div className="font-bold  inline">{meal.text} cal:</div>{" "}
                {meal.cal}
              </div>
              <button
                onClick={() => {
                  setSelectedMeal(meal);
                  console.log("selected", selectedMeal);
                  setText(meal.text);
                  setCal(meal.cal);
                  console.log(text, cal);
                  handleShow();
                }}
              >
                <BiEdit color="teal" size={25} />
              </button>
              <button
                onClick={async () => {
                  const res = await axios.post(
                    "http://localhost:3030/deleteMeal",
                    {
                      mealId: meal.meal_id,
                      date: selectedDate.toLocaleDateString(),
                      userId: userSelector.uid,
                    },
                    axiosConfig
                  );
                  const newdata = res.data;
                  setmeals(newdata);
                  let total = 0;
                  newdata.forEach((meals: Meals) => {
                    total = total + meals.cal;
                  });
                  setTotalCal(total);

                  dispatch(setMeal(newdata));
                  if (res.status === 201) {
                    toast.success("Meal deleted", {
                      theme: "dark",
                      pauseOnFocusLoss: false,
                      pauseOnHover: false,
                    });

                    if (meals === null) {
                      setTotalCal(0);
                    }
                  } else {
                    console.log(res);
                  }
                }}
              >
                <MdDeleteOutline color="red" size={25} />
              </button>
            </div>
          );
        })
      ) : meals === null ? (
        <div>Loading</div>
      ) : (
        <div>No meals</div>
      )}
      {totalcal > 0 && (
        <>
          <div className="text-lg inline font-bold">
            Total cal:{" "}
            <div
              className="font-semibold text-2xl inline"
              style={{ color: totalcal >= 2000 ? "red" : "green" }}
            >
              <label htmlFor="total calories " className="text-lg">
                {totalcal}
              </label>
            </div>
          </div>
        </>
      )}

      <ToastContainer />
    </div>
  );
};

export default Home;
