// Type.js
import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import useSendMessage from "../../context/useSendMessage"; // Import the updated useSendMessage hook

function Type() {
  const { loading, sendMessages } = useSendMessage();
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim() !== "") {
      await sendMessages(message);
      setMessage("");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex space-x-1 h-[8vh] bg-gray-800">
          <div className="w-[70%] mx-4">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type here"
              className="border-[1px] border-gray-700 flex items-center w-full py-3 px-3 rounded-xl grow outline-none bg-slate-900 mt-1"
            />
          </div>
          <button>
            <IoSend className="text-5xl p-2 hover:bg-gray-600 rounded-full duration-300" />
          </button>
        </div>
      </form>
    </>
  );
}

export default Type;
