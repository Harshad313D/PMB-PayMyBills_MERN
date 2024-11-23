import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import bg1 from "../assets/bg1.png";
import bg2 from "../assets/about-bg.png";
import bannerLeft from "../assets/baner-dec-left.png";
import Button from "../components/Button";
const LandingPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [features, setFeatures] = useState([
    { id: 1, title: "Feature 1", description: "Description of Feature 1" },
    { id: 2, title: "Feature 2", description: "Description of Feature 2" },
    { id: 3, title: "Feature 3", description: "Description of Feature 3" },
    { id: 4, title: "Feature 4", description: "Description of Feature 4" },
  ]);

  useEffect(() => {
    // Get the user data from local storage
    const userData = JSON.parse(localStorage.getItem("userData"));

    // Check if userData exists and has the accessToken
    if (userData && userData.accessToken) {
      const token = userData.accessToken; // Access the token
      console.log("token : ", token); // Log the token
      setIsLoggedIn(true); // Set login state
    }
  }, []);
  // button
  const handleClick = () => {
    alert("Button clicked!");
  };

  return (
    <div className="w-full h-screen ">
      {isLoggedIn ? (
        <div className="flex flex-col items-center bg-white overflow-hidden ">
          <section
            className="relative w-full bg-cover bg-center h-screen"
            style={{
              backgroundImage: `url("https://images.pexels.com/photos/37728/pexels-photo-37728.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              // minHeight: "100vh", // To ensure it covers the whole viewport height
            }}
          >
            {/* <div className="absolute inset-0 bg-black bg-opacity-50"></div> */}
            <div className="relative w-11/12 overflow-hidden mt-20 ">
              <div className="pb-80  pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
                <div className="relative  mt-24 mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
                  <div className="sm:max-w-lg">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                      Pay My Bills
                    </h1>

                    <p className="mt-4 text-xl text-gray-500">
                      "PayMyBills is a streamlined platform for managing and
                      paying bills in one place. Avoid late fees, stay
                      organized, and simplify your finances with ease and
                      security."
                    </p>
                  </div>
                  <div>
                    <div className="mt-10">
                      {/* <!-- Decorative image grid --> */}

                      <Button className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-12 py-3.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 ">
                        Sign In
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            className="w-full  h-fit p-6 flex flex-col items-center justify-center  text-center "
            // style={{
            //   backgroundImage: `url(${bannerLeft})`,
            //   backgroundSize: "contain",
            //   // backgroundPosition: "center",
            //   backgroundRepeat: "no-repeat",
            //   // minHeight: "100vh", // To ensure it covers the whole viewport height
            // }}
          >
            <h2 className="text-4xl font-bold text-black-300 ">
              Explore More Features
            </h2>
            <p className="text-lg text-gray-300 mb-6 max-w-lg">
              Discover additional tools and resources designed to help you get
              the most out of our platform.
            </p>
            <div className="flex space-x-4">
              <Link to="/view-all-cards">
                <Button className="">View All Cards</Button>
              </Link>
              <Link to="/add-new-card">
                <Button> Add New Card </Button>
              </Link>
            </div>
          </section>

          {/* which nutrient Section */}
          <section className="py-12 w-11/12 ">
            <div className="relative w-11/12 overflow-hidden mt-20 ">
              <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
                <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
                  <div className="sm:max-w-lg">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                      Try whatever you like
                    </h1>

                    <p className="mt-4 text-xl text-gray-500">
                      "Explore the full nutritional profile of your favorite
                      meals with ease. Our tool provides detailed insights into
                      calories, macronutrients, and essential vitamins and
                      minerals to help you make informed dietary choices."
                    </p>
                  </div>
                  <div>
                    <div className="mt-10">
                      {/* <!-- Decorative image grid --> */}
                      <div
                        aria-hidden="true"
                        className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
                      >
                        <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                          <div className="flex items-center space-x-6 lg:space-x-8">
                            <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                              <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                                <img
                                  src="https://plus.unsplash.com/premium_photo-1673809798970-30c14cfd0ab6?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                  alt=""
                                  className="h-full w-full object-cover object-center"
                                />
                              </div>
                              <div className="h-64 w-44 overflow-hidden rounded-lg">
                                <img
                                  src="https://images.unsplash.com/photo-1478369402113-1fd53f17e8b4?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                  alt=""
                                  className="h-full w-full object-cover object-center"
                                />
                              </div>
                            </div>
                            <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                              <div className="h-64 w-44 overflow-hidden rounded-lg">
                                <img
                                  src="https://images.unsplash.com/photo-1505253668822-42074d58a7c6?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                  alt=""
                                  className="h-full w-full object-cover object-center"
                                />
                              </div>
                              <div className="h-64 w-44 overflow-hidden rounded-lg">
                                <img
                                  src="https://images.unsplash.com/photo-1465014925804-7b9ede58d0d7?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                  alt=""
                                  className="h-full w-full object-cover object-center"
                                />
                              </div>
                              <div className="h-64 w-44 overflow-hidden rounded-lg">
                                <img
                                  src="https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                  alt=""
                                  className="h-full w-full object-cover object-center"
                                />
                              </div>
                            </div>
                            <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                              <div className="h-64 w-44 overflow-hidden rounded-lg">
                                <img
                                  src="https://images.unsplash.com/photo-1506802913710-40e2e66339c9?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                  alt=""
                                  className="h-full w-full object-cover object-center"
                                />
                              </div>
                              <div className="h-64 w-44 overflow-hidden rounded-lg">
                                <img
                                  src="https://images.unsplash.com/photo-1506459225024-1428097a7e18?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                  alt=""
                                  className="h-full w-full object-cover object-center"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="inline-block rounded-md border border-transparent bg-green-600 px-8 py-3 text-center font-medium text-white hover:bg-green-700">
                        Learn more
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <div className="bg-green-500 w-full flex justify-center items-center min-h-screen shadow-lg rounded-lg p-8">
          <h1 className="text-2xl font-bold ">
            Please log in to see your dashboard
          </h1>
        </div>
      )}
      ;
    </div>
  );
};

export default LandingPage;

// button
{
  /* <button className="inline-block rounded-md border border-transparent bg-green-600 px-8 py-3 text-center font-medium text-white hover:bg-green-700">
  Learn more
</button>; */
}
