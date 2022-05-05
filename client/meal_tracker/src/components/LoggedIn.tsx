import { Link } from "react-router-dom";

const LoggedIn = () => {
  return (
    <div>
      <div className="h-screen w-screen bg-gray-50 flex items-center">
        <div className="container flex flex-col md:flex-row items-center justify-between px-5 text-gray-700">
          <div className="w-full lg:w-1/2 mx-8">
            <div className="text-7xl text-teal-600 font-dark font-extrabold mb-8">
              {" "}
              Meal tracker
            </div>
            <p className="text-2xl md:text-3xl font-light leading-normal mb-8">
              Users is already logged in
            </p>
            <Link
              to={"/home"}
              replace
              className="px-5 inline py-3 text-sm  ease-in font-medium leading-5 shadow-2xl text-white transition-all duration-400 border border-transparent rounded-lg focus:outline-none bg-teal-700 active:bg-teal-800 hover:bg-teal-600"
            >
              {" "}
              Back to homepage
            </Link>
          </div>
          <div className="w-full lg:flex lg:justify-end lg:w-1/2 mx-5 my-12">
            <img
              src="https://img.freepik.com/free-vector/flat-creativity-concept-illustration_52683-64279.jpg?t=st=1651739962~exp=1651740562~hmac=1b24422b1874729377457c2a5a4c21c60e0c2f01e5673dd787651654f89baa92&w=740"
              className=""
              alt="Page not found"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoggedIn;
