import React, { useState } from "react";
import axios from "axios";
import Button from "./Button";

const UpdateCardForm = ({ cardData, closeModal, fetchCards, token }) => {
  const [formData, setFormData] = useState({
    purchaseLimit: cardData.purchaseLimit,
    resetDate: cardData.resetDate,
    commission: cardData.commission,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8000/api/v1/cards/${cardData._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Card updated successfully!");
      closeModal(); // Close the modal after successful update
      fetchCards(); // Refresh the list of cards
    } catch (error) {
      console.error("Error updating card:", error);
      alert("Failed to update card");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Update Card Details</h2>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <input
            type="number"
            name="purchaseLimit"
            value={formData.purchaseLimit}
            onChange={handleChange}
            placeholder="Purchase Limit"
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            name="resetDate"
            value={formData.resetDate}
            onChange={handleChange}
            placeholder="Limit Reset Date"
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            name="commission"
            value={formData.commission}
            onChange={handleChange}
            placeholder="Commission"
            className="border p-2 rounded"
            required
          />
          <div className="flex justify-between mt-4">
            <Button
              type="button"
              onClick={closeModal}
              className=" text-red-500 border-red-500 hover:bg-red-500 p-2 rounded"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className=" text-green-500 border-green-500 hover:bg-green-500 p-2 rounded"
            >
              Update Card
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCardForm;
