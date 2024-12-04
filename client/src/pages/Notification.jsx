import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "../components/Button";
import Lottie from "lottie-react";

import loaderGif from "../assets/loading.json";

const RequestList = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all pending requests when the component is mounted
    const fetchRequests = async () => {
      try {
        // Get user ID and access token from localStorage
        const userData = JSON.parse(localStorage.getItem("userData"));
        const userId = userData?.data?._id;
        const accessToken = userData?.accessToken;
        console.log("Access token: ", accessToken);
        console.log("User ID: ", userId);
        console.log("request", requests);

        if (!userId || !accessToken) {
          alert("User not logged in. Please log in first.");
          return;
        }

        // Send GET request to fetch pending friend requests
        const response = await axios.get(
          `http://localhost:8000/api/v1/request/${userId}`, // Adjust with your backend endpoint for getting friend requests
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setRequests(response.data); // Set the fetched requests to state
      } catch (error) {
        console.error("Error fetching requests:", error);
        alert("Failed to fetch requests.");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleRequestAction = async (requestId, action) => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const userId = userData?.data?._id;
    const accessToken = userData?.accessToken;

    if (!userId || !accessToken) {
      alert("User not logged in. Please log in first.");
      return;
    }

    try {
      let response;
      if (action === "accept") {
        // Send POST request to accept the friend request
        response = await axios.post(
          `http://localhost:8000/api/v1/request/accept`, // Adjust with your backend endpoint for accepting requests
          {
            requestId: requestId,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
      } else if (action === "reject") {
        // Send POST request to reject the friend request
        response = await axios.post(
          `http://localhost:8000/api/v1/request/reject`, // Adjust with your backend endpoint for rejecting requests
          {
            requestId: requestId,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
      }

      alert(
        `${
          action.charAt(0).toUpperCase() + action.slice(1)
        } request successful.`
      );
      // Remove the request from the list after accepting or rejecting
      setRequests((prevRequests) =>
        prevRequests.filter((req) => req._id !== requestId)
      );
    } catch (error) {
      console.error(`Error ${action} request:`, error);
      alert(`Failed to ${action} request.`);
    }
  };

  if (loading)
    return (
      <div className=" h-screen flex justify-center items-center">
        <div className="text-center text-xl mt-10">
          {/* <img src={loaderGif} /> */}
          <Lottie
            animationData={loaderGif}
            loop
            autoplay
            className="w-full h-full "
          />
        </div>
      </div>
    );

  // if (requests.length === 0) {
  //    <p>No pending requests to display.</p>;
  // }

  return (
    <div className="bg-gray-500 min-h-screen flex justify-center items-center p-6">
      <div className="bg-white shadow-lg rounded-lg max-w-3xl w-full p-6">
        <h2 className="text-2xl font-bold mb-4">Pending Friend Requests</h2>
        <ul className="space-y-4">
          {requests.map((request) => (
            <li
              key={request._id}
              className="bg-gray-100 p-4 rounded-lg flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-semibold">{request.sender.name}</h3>
                <p className="text-gray-600">
                  Sender Email: {request.sender.email}
                </p>
              </div>
              <div className="flex space-x-4">
                <Button
                  onClick={() => handleRequestAction(request._id, "accept")}
                  className=" ml-2 text-green-500 border-x-4 border-green-500 hover:bg-green-600"
                >
                  Accept
                </Button>
                <Button
                  onClick={() => handleRequestAction(request._id, "reject")}
                  className=" text-red-500 border-x-4 border-red-500 hover:bg-red-600"
                >
                  Reject
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RequestList;
