import React from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const CardDetails = () => {
  const location = useLocation();
  const { card } = location.state || {};

  const sendRequest = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/cards/${card._id}/request`,
        { message: "I would like to connect regarding this card." },
        {
          headers: { Authorization: `Bearer YOUR_TOKEN` },
        }
      );
      alert("Request sent successfully!");
    } catch (error) {
      console.error("Error sending request:", error);
      alert("Failed to send request.");
    }
  };

  if (!card) {
    return <p>No card data found!</p>;
  }

  return (
    <div className="bg-gray-50 min-h-screen flex justify-center items-center p-6">
      <div className="bg-white shadow-lg rounded-lg max-w-3xl w-full p-6">
        {/* Card Details Header */}
        <div className="flex flex-col md:flex-row items-center mb-6">
          <img
            src={card.image || "https://via.placeholder.com/150"}
            alt="Card"
            className="w-40 h-40 object-cover rounded-lg mr-6"
          />
          <div>
            <h2 className="text-2xl font-bold mb-2">
              {card.holderName || "Card Holder"}
            </h2>
            <p className="text-gray-600 mb-1">
              <strong>Bank:</strong> {card.bankName || "N/A"}
            </p>
            <p className="text-gray-600 mb-1">
              <strong>Type:</strong> {card.card_type || "N/A"}
            </p>
            <p className="text-gray-600 mb-1">
              <strong>Purchase Limit:</strong> ₹{card.purchaseLimit || "N/A"}
            </p>
          </div>
        </div>

        {/* Horizontal Line */}
        <hr className="my-4 border-gray-300" />

        {/* Card Conditions and Details */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Card Conditions</h3>
          <ul className="list-disc pl-5 text-gray-700">
            <li>{card.conditions || "No specific conditions mentioned."}</li>
            <li>Commission: ₹{card.commission || "0"}</li>
            <li>Reset Date: {card.resetDate || "N/A"}</li>
          </ul>
        </div>

        {/* Process and Safety Information */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">How to Proceed</h3>
          <p className="text-gray-700">
            To connect with the card holder, click the "Send Request" button
            below. Ensure that your intentions are clear and professional.
          </p>
          <p className="text-gray-700 mt-2">
            <strong>Note:</strong> The card holder is a verified and authorized
            user. Transactions with this user are safe.
          </p>
        </div>

        {/* Send Request Button */}
        <div className="text-center">
          <button
            onClick={sendRequest}
            className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition"
          >
            Send Request to Connect
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
