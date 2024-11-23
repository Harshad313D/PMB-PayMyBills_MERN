import React, { useState } from "react";
import axios from "axios";

const AddCard = () => {
  const [formData, setFormData] = useState({
    bankName: "",
    card_type: "Credit",
    holderName: "",
    email: "",
    contactNo: "",
    purchaseLimit: "",
    resetDate: "",
    commission: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const banks = [
    "State Bank of India",
    "HDFC Bank",
    "ICICI Bank",
    "Axis Bank",
    "Punjab National Bank",
    "Bank of Baroda",
    "Kotak Mahindra Bank",
    "Union Bank of India",
    "Canara Bank",
    "Indian Bank",
    // Add more banks as needed
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    // Retrieve userDATA from local storage
    // Retrieve user data from local storage
    const userData = JSON.parse(localStorage.getItem("userData"));

    // Check if userData exists and has the accessToken
    if (userData && userData.accessToken) {
      const token = userData.accessToken; // Access the token
      console.log("token : ", token); // Log the token

      try {
        const response = await axios.post(
          "http://localhost:8000/api/v1/cards",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Use the retrieved access token in the Authorization header
            },
          }
        );

        // Log success message to the console and show UI alert
        console.log(response.data.message); // Log the success message
        alert("Card added successfully: " + response.data.message); // Show success message on UI
      } catch (error) {
        console.error(
          "Error adding card:",
          error.response?.data.message || error.message
        ); // Log the error response
        alert(
          "Failed to add card: " +
            (error.response?.data.message || "Unexpected error occurred.")
        ); // Display error message to user
      }
    } else {
      console.error("Access token not found"); // Log an error if the token is not found
      alert("You need to log in again. Access token is missing."); // Notify user to log in
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-20 bg-green-500  p-6  rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">Upload New Card</h2>
      {message && <p className="text-green-500">{message}</p>}
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <select
          name="bankName"
          value={formData.bankName}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        >
          <option value="" disabled>
            Select Bank
          </option>
          {banks.map((bank, index) => (
            <option key={index} value={bank}>
              {bank}
            </option>
          ))}
        </select>
        <select
          name="card_type"
          value={formData.card_type}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        >
          <option value="Credit">Credit Card</option>
          <option value="Debit">Debit Card</option>
        </select>
        <input
          type="text"
          name="holderName"
          value={formData.holderName}
          onChange={handleChange}
          placeholder="Card Holder Name"
          className="border p-2 rounded"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="contactNo"
          value={formData.contactNo}
          onChange={handleChange}
          placeholder="Contact Number"
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          name="purchaseLimit"
          value={formData.purchaseLimit}
          onChange={handleChange}
          placeholder="Purchase Limit"
          className="border p-2 rounded"
          required
        />
        <label>Limit Reset date:(of every month) </label>
        <input
          type="number"
          name="resetDate"
          value={formData.resetDate}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <label>Commision: </label>
        <input
          type="number"
          name="commission"
          value={formData.commission}
          onChange={handleChange}
          placeholder="Commission"
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded py-2 px-4 mt-4 hover:bg-blue-600"
        >
          Upload Card
        </button>
      </form>
    </div>
  );
};

export default AddCard;
