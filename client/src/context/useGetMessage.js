import React, { useEffect, useState } from "react";
import useConversation from "../store/useConversation.js";
import axios from "axios";
const useGetMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessage, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const token = userData.accessToken;
  console.log("from getmessage : ", token);

  if (!token) {
    console.error("Authorization token is missing!");
    return;
  }

  setLoading(true);
  if (selectedConversation && selectedConversation._id) {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/message/${selectedConversation._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage(res.data);
      setLoading(false);
    } catch (error) {
      console.log("Error in getting messages", error);
      setLoading(false);
    }
  }
};

    getMessages();
  }, [selectedConversation, setMessage]);
  return { loading, messages };
};

export default useGetMessage;


// useEffect(() => {
//     async function fetchUsers() {
//       try {
//         const userData = JSON.parse(localStorage.getItem("userData"));

//         const response = await fetch(
//           "http://localhost:8000/api/v1/request/get-receiveres",
//           {
//             method: "POST", // Specify the request method
//             headers: {
//               "Content-Type": "application/json", // Indicate JSON payload
//             },
//             body: JSON.stringify({
//               sender: userData.data._id, // Send the sender ID in the request body
//             }),
//           }
//         ); // Replace with your API endpoint
//         const data = await response.json();
//         console.log("sender data : ", data);

//         setReceiver(data.receiversData);

       
//       } catch (error) {
//         console.error("Failed to fetch users:", error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchUsers();
//   }, []);
