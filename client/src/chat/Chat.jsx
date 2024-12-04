import React from "react";
import LeftPanel from "../components/Left/Left.jsx";
import RightPanel from "../components/Right/Right.jsx";

const Chat = () => {
  return (
    <div className="flex h-screen  ">
      {/* Left Panel */}
      <div className="w-3/12  shadow-md">
        <LeftPanel />
      </div>

      {/* Right Panel */}
      <div className="w-9/12  ">
        <RightPanel />
      </div>
    </div>
  );
};

export default Chat;
