import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Button from "./Button";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [scrolling, setScrolling] = useState(false);
  const location = useLocation();

  const toggleDropdown = (section) => {
    setDropdownOpen(dropdownOpen === section ? null : section);
  };

  // Determine if the current route is the home page
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigate = useNavigate();

  // Fetch user data from local storage
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    setUser(userData); // Set user state if available
  }, []);

  const signOut = () => {
    localStorage.clear();

    navigate("/login");
  };
  if (location.pathname === "/chat") {
    return null;
  }

  return (
    <nav
      className={`flex items-center justify-between p-4 text-gray-800 
        fixed w-full z-20 top-0 left-0 transition-colors duration-300 ${
          isHomePage && !scrolling ? "bg-opacity-0" : "bg-white"
        }`}
    >
      <div className="flex justify-start space-x-6">
        <h1 className="focus:outline-none">
          <Link to="/">
            <span className="text-2xl font-bold rounded-lg bg-yellow-400 p-2 text-blue-500 ">
              Pay My Bills
            </span>
          </Link>
        </h1>
        <div className="flex items-center font-medium text-lg space-x-10">
          <Link to="/">
            <button className="hover:text-blue-500">Products </button>
          </Link>
          <Link to="/chat">
            <button className="hover:text-blue-500">chats </button>
          </Link>
          <Link to="/Notification">
            <button className="hover:text-blue-500">Notification </button>
          </Link>
        </div>
      </div>

      <div className="flex items-center font-semibold text-md space-x-4">
        {/* Conditional rendering for login/logout buttons */}
        {user ? (
          <div className="flex items-center space-x-2">
            <span className="bg-blue-600 font-bold px-4 py-2 rounded hover:bg-blue-700">
              {user.data.username}
            </span>

            <div className="relative">
              {/* Display user's avatar if available */}
              <div className="h-8 w-8 rounded-full bg-gray-500" />
            </div>

            <button onClick={signOut} className="hover:text-blue-400">
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login">
            {/* <Button>Login</Button> */}
            <button className="hover:text-blue-400">Login </button>
          </Link>
        )}
        <button className="focus:outline-none">
          <span className="text-2xl">&#9776;</span> {/* Hamburger Icon */}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
