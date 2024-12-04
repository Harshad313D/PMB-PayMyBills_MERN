// import React, { useState } from "react";
// import Button from "./Button";
// import axios from "axios";

// const Card = ({ card }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   // Toggle the drawer visibility
//   const toggleDrawer = () => {
//     setIsOpen(!isOpen);
//   };

//   const userData = JSON.parse(localStorage.getItem("userData"));
//   const token = userData?.accessToken;

//   //   handle upadate and delete cards
//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this card?")) {
//       try {
//         await axios.delete(`http://localhost:8000/api/v1/cards/${id}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setCards(cards.filter((card) => card._id !== id)); // Remove the deleted card from state
//         alert("Card deleted successfully");
//       } catch (error) {
//         console.error("Error deleting card:", error);
//         alert("Failed to delete card");
//       }
//     }
//   };

//   const handleUpdate = async (id) => {
//     // Implement your update logic here, e.g., showing a modal or redirecting to an update form
//     console.log(`Updating card with ID: ${id}`);
//     // You could also trigger a form to update the card details
//   };

//   return (
//     <div className="bg-green-200 shadow-md rounded-lg p-4 mb-4">
//       {/* Top Image */}
//       <img
//         src="https://via.placeholder.com/150" // Replace with your dummy image URL
//         alt="Card Image"
//         className="w-full h-32 object-cover rounded-t-lg"
//       />
//       {/* Bank Name */}
//       <h2 className="text-lg font-bold mt-2 ">{card.bankName}</h2>
//       <div className="grid grid-cols-2 gap-4 mt-2">
//         {/* First Column */}
//         <div>
//           <p className="font-semibold">Type:</p>
//           <p>{card.card_type || "N/A"}</p>
//           <p className="font-semibold">Purchase Limit:</p>
//           <p>{card.purchaseLimit || "₹0"}₹</p>
//         </div>
//         {/* Second Column */}
//         <div>
//           <p className="font-semibold">Reset Date:</p>
//           <p>{card.resetDate || "N/A"}</p>
//           <p className="font-semibold">Commission:</p>
//           <p>{card.commission || "₹0"} ₹</p>
//         </div>
//       </div>
//       {/* Drawer Toggle Button */}
//       <button
//         onClick={toggleDrawer}
//         className="mt-4 text-blue-500 hover:underline"
//       >
//         {isOpen ? "Hide Details" : "Show ownership"}
//       </button>
//       {/* Drawer Content */}
//       {isOpen && (
//         <div className="mt-2 p-2 border-t border-gray-300">
//           <p className="font-semibold">
//             Card Holder Name:(one who is the real owner of card)
//           </p>
//           <p>{card.holderName || "N/A"}</p>
//           <p className="font-semibold">
//             Owner Name:(one who added the card to platform)
//           </p>
//           <p>{card.owner.fullName || "N/A"}</p>
//         </div>
//       )}
//       {/* Go To Card Button */}
//       <div className="mt-4">
//         <button className="bg-blue-500 text-white rounded py-2 px-4 hover:bg-blue-600">
//           Go To Card
//         </button>
//         <Button onClick={() => handleUpdate(card._id)}>Update</Button>
//         <Button onClick={() => handleDelete(card._id)}>Delete</Button>
//       </div>
//     </div>
//   );
// };

// export default Card;

import React, { useState } from "react";
import Button from "./Button";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import UpdateCardForm from "./UpdateCardForm";

const Card = ({ card, fetchCards }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  // Toggle the drawer visibility
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const userData = JSON.parse(localStorage.getItem("userData"));
  const token = userData?.accessToken;

  // Check if the logged-in user is the owner of the card
  const isOwner = userData?.data._id === card.owner._id;

  // Handle update and delete cards
  const handleDelete = async (id) => {
    console.log(`Attempting to delete card with ID: ${id}`); // Log the ID
    if (window.confirm("Are you sure you want to delete this card?")) {
      try {
        await axios.delete(`http://localhost:8000/api/v1/cards/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert("Card deleted successfully");
        fetchCards();
        // Optional: Call a function to update the state in the parent component
      } catch (error) {
        console.error("Error deleting card:", error);
        alert("Failed to delete card");
      }
    }
  };
  const navigate = useNavigate();

  const handleCardClick = () => {
    // Navigate to the card details page and pass the card data using state
    navigate(`/card/${card._id}`, { state: { card } });
  };

  return (
    <div className="bg-green-200 shadow-md rounded-lg p-4 mb-4">
      {/* Top Image */}
      <img
        src="https://via.placeholder.com/150" // Replace with your dummy image URL
        alt="Card Image"
        className="w-full h-32 object-cover rounded-t-lg"
      />
      {/* Bank Name */}
      <h2 className="text-lg font-bold mt-2">{card.bankName}</h2>
      <div className="grid grid-cols-2 gap-4 mt-2">
        {/* First Column */}
        <div>
          <p className="font-semibold">Type:</p>
          <p>{card.card_type || "N/A"}</p>
          <p className="font-semibold">Purchase Limit:</p>
          <p>{card.purchaseLimit || "₹0"}₹</p>
        </div>
        {/* Second Column */}
        <div>
          <p className="font-semibold">Reset Date:</p>
          <p>{card.resetDate || "N/A"}</p>
          <p className="font-semibold">Commission:</p>
          <p>{card.commission || "₹0"} ₹</p>
        </div>
      </div>
      {/* Drawer Toggle Button */}
      <button
        onClick={toggleDrawer}
        className="mt-4 text-blue-500 hover:underline"
      >
        {isOpen ? "Hide Details" : "Show Ownership"}
      </button>
      {/* Drawer Content */}
      {isOpen && (
        <div className="mt-2 p-2 border-t border-gray-300">
          <p className="font-medium  text-gray-500">
            Card Holder Name (one who is the real owner of the card):
          </p>
          <p className="font-bold">{card.holderName || "N/A"}</p>
          <p className="font-medium text-gray-500">
            Owner Name (one who added the card to the platform):
          </p>
          <p className="font-bold">{card.owner.fullName || "N/A"}</p>
        </div>
      )}
      {/* Go To Card Button */}
      <div className="mt-4">
        <button
          onClick={handleCardClick}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Go To Card
        </button>

        {/* Only show Update and Delete buttons if the user is the owner */}
        {isOwner && (
          <>
            <Button
              className=" ml-2 text-green-500 border-green-500 hover:bg-green-600"
              onClick={openModal}
            >
              Update
            </Button>
            <Button
              className=" text-red-500 border-red-500 hover:bg-red-600"
              onClick={() => handleDelete(card._id)}
            >
              Delete
            </Button>

            {showModal && (
              <UpdateCardForm
                cardData={card}
                closeModal={closeModal}
                fetchCards={fetchCards} // To refresh cards after update
                token={token} // Pass token for authorization
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Card;
