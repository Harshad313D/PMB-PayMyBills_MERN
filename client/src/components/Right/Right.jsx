import React, { useEffect } from "react";
import ChatUser from "./ChatUser";
import Messages from "./Messages";
import Type from "./Type";
// import useConversation from "../ ";
// import Loading from "../../components/Loading";
// import { useAuth } from "../../context/AuthProvider.jsx";
import { CiMenuFries } from "react-icons/ci";

function Right() {
  // const { selectedConversation, setSelectedConversation } = useConversation();
  // useEffect(() => {
  //   return setSelectedConversation(null);
  // }, [selectedConversation]);
  return (
    <div className="w-full bg-slate-800 text-gray-300">
      {/* <div>
        {!selectedConversation ? (
          <NoChat />
        ) : (
          <> */}
      <ChatUser />
      <div
        className=" flex-1 overflow-y-auto "
        style={{ maxHeight: "calc(88vh - 8vh)" }}
      >
        <Messages />
      </div>
      <Type />
      {/* </>
        )}
      </div> */}
    </div>
  );
}

export default Right;
