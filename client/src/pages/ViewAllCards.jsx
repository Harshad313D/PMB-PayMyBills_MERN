import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";
import Lottie from "lottie-react";

import loaderGif from "../assets/loading.json";
// import loaderGif from "../assets/loader.gif";
// import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const CardList = (card) => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userData = JSON.parse(localStorage.getItem("userData"));
  const token = userData?.accessToken;
  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8000/api/v1/cards", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const cardData = response.data.data;

      // Console log to inspect the structure of cardData
      console.log("API response data:", cardData);

      // Save to state and localStorage
      setCards(cardData);
      localStorage.setItem("cards", JSON.stringify(cardData));
    } catch (error) {
      console.error("Failed to fetch cards:", error);

      setError("Failed to fetch cards");
    } finally {
      setLoading(false);
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
  if (error)
    return (
      <div className="text-center text-xl text-red-500 mt-10">{error}</div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">All Cards</h1>
      {cards.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => (
            <Card key={card._id} fetchCards={fetchCards} card={card} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CardList;
