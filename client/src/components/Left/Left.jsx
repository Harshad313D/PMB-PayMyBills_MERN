import React from "react";
// import Search from "../../components/Search";
import User from "./Users.jsx";
// import { useAuth } from "../../context/AuthProvider.jsx";

function Left() {
  // const [authUser] = useAuth();

  return (
    <div className=" w-full h-full text-white bg-slate-900 ">
      <h1 className="font-bold text-3xl p-2 px-6 ">Chats</h1>
      {/* <h1 className="pl-3">
        <span className="text-red-600"> {authUser.user.name}</span> is Logged in{" "}
      </h1> */}
      {/* <Search /> */}
      <div
        className=" flex-1  overflow-y-auto"
        style={{ minHeight: "calc(84vh - 10vh)" }}
      >
        <User />
      </div>
    </div>
  );
}

export default Left;

// {/* <div className="w-[30%] bg-black text-gray-300">
//   <h1 className="font-bold text-3xl p-2 px-11">Chats</h1>
//   {/* <div className="w-full   bg-black text-gray-300"> */}
//   <Search />
//   <div
//     className=" flex-1  overflow-y-auto"
//     style={{ minHeight: "calc(84vh - 10vh)" }}
//   >
//     <Users />
//   </div>
// </div>; */}
