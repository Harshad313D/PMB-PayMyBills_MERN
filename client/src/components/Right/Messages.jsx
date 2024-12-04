import React, { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessage from "../../context/useGetMessage.js";
import toast from "react-hot-toast";
import Lottie from "lottie-react";

import loaderGif from "../../assets/loading.json";

function Messages(message) {
  const { loading, messages } = useGetMessage();
  console.log(messages);

  // const lastMsgRef = useRef();
  // useEffect(() => {
  //   setTimeout(() => {
  //     if (lastMsgRef.current) {
  //       lastMsgRef.current.scrollIntoView({ behavior: "smooth" });
  //     }
  //   }, 100);
  // }, [messages]);
  return (
    <div style={{ minHeight: "calc(92vh - 8vh)" }}>
      {loading ? (
        <Lottie
          animationData={loaderGif}
          loop
          autoplay
          className="w-full h-full "
        />
      ) : (
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id}>
            <Message message={message} />
          </div>
        ))
      )}

      {!loading && messages.length === 0 && (
        <div>
          <p className="text-center mt-[20%]">
            Say! Hi to start the conversation
          </p>
        </div>
      )}
    </div>
  );
}

export default Messages;
