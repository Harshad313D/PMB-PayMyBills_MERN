import React from "react";
import useConversation from "../../store/useConversation.js";

function ChatUser() {
  const { selectedConversation } = useConversation();

  return (
    <div className="pl-5 pt-5 h-[12vh] flex space-x-4 bg-gray-700 hover:bg-gray-600 duration-300">
      <div>
        <div className={`avatar online `}>
          <div className="w-14 rounded-full">
            <img
              src={
                selectedConversation?.profileImage ||
                "https://pbs.twimg.com/profile_images/1257056329140547584/vDZH9UOs_400x400.jpg"
              }
              alt="User avatar"
            />
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-xl">{selectedConversation?.username}</h1>
      </div>
    </div>
  );
}

export default ChatUser;
