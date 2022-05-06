import axios from "axios";

import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Logo from "./assets/images/logo.png";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  const [cookies, setCookies] = useCookies(["authenticated"]);

  console.log("store", cookies.authenticated);
  const navigate = useNavigate();
  const handlesignout = async () => {
    const result = await axios.get("http://localhost:3030/signOutUser");

    if (result.status === 200) {
      setCookies("authenticated", false);
      navigate("/");
    } else {
      toast.error("Error signing out");
    }
  };
  return (
    <div className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <svg
            className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>

          <div>
            <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
              <nav
                className="relative flex items-center justify-between sm:h-10 lg:justify-start"
                aria-label="Global"
              >
                <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                  <div className="flex items-center justify-between w-full md:w-auto">
                    <a href="/">
                      <span className="sr-only">Workflow</span>
                      <img
                        alt="logo"
                        className="h-8 p-1 w-auto sm:h-10 bg-black rounded-md "
                        src={Logo}
                      />
                    </a>
                    <div className="-mr-2  items-center hidden">
                      <button
                        type="button"
                        className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500"
                        aria-expanded="false"
                      >
                        <span className="sr-only">Open main menu</span>

                        <svg
                          className="h-6 w-6"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 6h16M4 12h16M4 18h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div className=" block md:ml-10 md:pr-4 md:space-x-8">
                  {cookies.authenticated === "true" ? (
                    <>
                      <button
                        onClick={handlesignout}
                        className="font-medium text-teal-600 hover:text-teal-500"
                      >
                        Logout
                      </button>
                      <a
                        href="/home"
                        className="font-medium w-10 px-3 py-1 rounded-md  bg-teal-700 text-white hover:bg-teal-600"
                      >
                        Homepage
                      </a>
                    </>
                  ) : (
                    <a
                      href="/login"
                      className="font-medium text-teal-600 hover:text-teal-500"
                    >
                      Login
                    </a>
                  )}
                </div>
              </nav>
            </div>
          </div>

          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Tracker your meal with</span>
                <span className="block text-teal-600 xl:inline">
                  Meal Tracker
                </span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-lg lg:mx-0">
                The best and easy way to track your meals.The app persist your
                data in the cloud so you can change your mind and come back to.
                Based on date.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Link
                    to={cookies.authenticated === "true" ? "/home" : "/login"}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 md:py-4 md:text-lg md:px-10"
                  >
                    Get started
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <a
                    href="/"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-teal-700 bg-teal-100 hover:bg-teal-200 md:py-4 md:text-lg md:px-10"
                  >
                    Get the app
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="https://cdn.pixabay.com/photo/2017/09/16/19/21/salad-2756467_960_720.jpg"
          alt=""
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
