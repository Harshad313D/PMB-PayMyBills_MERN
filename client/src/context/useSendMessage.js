import { useState } from 'react';
import axios from 'axios';
import useConversation from '../store/useConversation.js';

function useSendMessage() {
  const [loading, setLoading] = useState(false);
  const { messages, setMessage, selectedConversation } = useConversation();

  const sendMessages = async (message) => {
    setLoading(true);
    const userData = JSON.parse(localStorage.getItem("userData"));
    const token = userData.accessToken;
    console.log("from Sendmessage : ", token);

  if (!token) {
    console.error("Authorization token is missing!");
    return;
  }

    if (selectedConversation && selectedConversation._id) {
      try {
        // Send the message using the API
        const res = await axios.post(
        `http://localhost:8000/api/v1/message/send/${selectedConversation._id}`,
          { message },
          {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to the request
          },
        }
        );

        // Update messages with the new message
        setMessage([...messages, res.data]);
      } catch (error) {
        console.log("Error in sending messages", error);
      } finally {
        setLoading(false); // Always set loading to false after completion
      }
    } else {
      setLoading(false);
      console.log("No selected conversation");
    }
  };

  return { loading, sendMessages }; // Return the function to be used in the component
}

export default useSendMessage;

