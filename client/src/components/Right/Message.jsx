// import React from "react";
// // import useGetSocketMessage from "../../context/useGetSocketMessage.jsx";

// function Message({ message }) {
//   console.log("this is our message: ", message);
//   const authUser = JSON.parse(localStorage.getItem("userData"));
//   const itsMe = message.sender === authUser?.data?._id; // Updated to `message.sender`
//   console.log("conv mesg : ", message.message);

//   // useGetSocketMessage();

//   const chatName = itsMe ? " chat-end" : "chat-start";
//   const chatColor = itsMe ? "bg-blue-500" : "";

//   const createdAt = new Date(message.createdAt);
//   const formattedTime = createdAt.toLocaleTimeString([], {
//     hour: "2-digit",
//     minute: "2-digit",
//   });
//   return (
//     <div>
//       <div className="p-3">
//         <div className={`chat  ${chatName} `}>
//           <div className={`chat-bubble text-white ${chatColor} `}>
//             {message.message}
//           </div>
//           <div className="chat-footer">{formattedTime}</div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Message;

import React from "react";

function Message({ message }) {
  console.log("this is our message: ", message);
  const authUser = JSON.parse(localStorage.getItem("userData"));
  const itsMe = message.sender === authUser?.data?._id; // Ensure the correct user ID comparison
  console.log("its ME :", itsMe);
  console.log("message sender :", message.sender);
  console.log("message receiver :", message.receiver);

  console.log("conv mesg : ", message.message);

  const chatName = itsMe ? "chat-end" : "chat-start"; // Adjust for user's message
  const chatColor = itsMe ? "bg-blue-500" : "bg-gray-500"; // Different color for the user

  // Date and time formatting
  const createdAt = new Date(message.createdAt);
  const formattedTime = createdAt.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div>
      <div className="p-3">
        <div className={`chat ${chatName}`}>
          <div className={`chat-bubble text-white ${chatColor}`}>
            {message.message}
          </div>
          <div className="chat-footer">{formattedTime}</div>
        </div>
      </div>
    </div>
  );
}

export default Message;

// import React from "react";

// function Message({ message }) {
//   // Retrieve and parse user data from localStorage
//   const authUser = JSON.parse(localStorage.getItem("userData") || "{}");
//   const itsMe = message.sender === authUser?.data?._id;

//   // Dynamic alignment and bubble colors
//   const chatAlignment = itsMe ? "text-right" : "text-left";
//   const chatBubbleColor = itsMe ? "bg-blue-500" : "bg-gray-500";

//   // Format the creation time
//   const createdAt = new Date(message.createdAt);
//   const formattedTime = createdAt.toLocaleTimeString([], {
//     hour: "2-digit",
//     minute: "2-digit",
//   });

//   return (
//     <div className={`p-3 ${chatAlignment}`}>
//       <div className={`inline-block`}>
//         <div
//           className={`chat-bubble text-white ${chatBubbleColor} rounded-lg shadow-md px-4 py-2 max-w-xs`}
//         >
//           {message.message}
//         </div>
//         <div className="chat-footer text-sm text-gray-400 mt-1">
//           {formattedTime}
//         </div>
//       </div>
//     </div>
//   );
// }

// Message.defaultProps = {
//   message: {
//     sender: "",
//     receiver: "",
//     message: "",
//     createdAt: new Date(),
//   },
// };

// export default Message;
