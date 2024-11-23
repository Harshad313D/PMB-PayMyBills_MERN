import { asyncHandler } from "../utils/asyncHandler.js";
import { Card } from "../models/cards.model.js";
import { isValidObjectId } from "mongoose";

// get all cards

const getAllCards = asyncHandler(async (req, res) => {
    // Extract pagination and sorting parameters from the query string, with default values
    const { page = 1, limit=10, sortBy='createdAt', sortType='desc'} = req.query;
     
    // Convert `sortType` to either ascending (1) or descending (-1) for Mongoose
    const sortOrder = sortType === 'asc' ? 1 : -1;

    try{
        // get toatal count of cards
        const totalCards= await Card.countDocuments()

        // Fetch all videos with pagination and sorting applied
        const cards= await Card.find()
        .select("bankName card_type holderName purchaseLimit resetDate commission") // Corrected select statement
        .sort({[sortBy]:sortOrder})
        .skip((page - 1 ) * limit )
        .limit(parseInt(limit))
        .populate("owner", "fullName")
        .exec()

        // return res with fetched data and count

        return res
        .status(200)
        .json({
            success: true,
            data: cards,
            total: totalCards,
            page: parseInt(page),
            limit: parseInt(limit),
            message: 'cards fetched successfully',
        });
    }catch(error){
        return res
        .status(500)
        .json({
            success: false,
            message: "Error fetching cards",
            error: error.message,
        })
    }
});

// Add cards
const addCard =asyncHandler(async (req, res) => {
    // add fields you want
    const { bankName, card_type, holderName, email, contactNo, purchaseLimit, resetDate, commission } = req.body;

    try {
        // Validate required fields
        if (!bankName || !card_type || !holderName || !email || !contactNo || !purchaseLimit || !resetDate || !commission) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // Additional validations for email and contact number
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email validation
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format",
            });
        }

        const contactNoRegex = /^[0-9]{10}$/; // Adjust regex based on your contact number format
        if (!contactNoRegex.test(contactNo)) {
            return res.status(400).json({
                success: false,
                message: "Contact number must be a 10-digit number",
            });
        }

        // Create a new card object
        const newCard = new Card({
            bankName,
            card_type,
            holderName,
            email,
            contactNo,
            purchaseLimit,
            resetDate,
            commission,
            owner: req.user._id // Ensure req.user._id exists; it should be set by your authentication middleware
        });

        // Save the card
        await newCard.save();

        // Log success message to the console
        console.log("Card added successfully:", newCard);

        // Return response with success message
        return res.status(201).json({
            success: true,
            message: "Card added successfully",
            data: newCard,
        });
        
    } catch (error) {
        console.error("Error adding card:", error.message); // Log error details to the console
        return res.status(500).json({
            success: false,
            message: "Error adding card",
            error: error.message,
        });
    }
});



// get card by ID

const getCardById = asyncHandler(async (req, res) => {

    const { id } = req.params
    try{
        // find card by id
        const card = await Card.findById(id)
        .select("bankName card_type holderName email contactNo purchaseLimit resetDate commission")
        .populate("owner", "fullName")
        .exec();

        if (!card) {
            return res.status(404).json({
                success: false,
                message: "Card not found",
            });
        }

        // return res with card data
        return res
       .status(200)
       .json({
            success: true,
            data: card,
            message: "Card fetched successfully",
        });

    }catch(error){
        return res
       .status(500)
       .json({
            success: false,
            message: "Error fetching card",
            error: error.message,
        });
    }
});

// update card
const updateCard = asyncHandler(async (req, res) => {
  const { id } = req.params;  // Get card ID from URL params
  const { purchaseLimit, resetDate, commission } = req.body;  // Extract fields from request body

  try {
    // Find the card by ID
    const card = await Card.findById(id);

    // Check if the card exists
    if (!card) {
      return res.status(404).json({
        success: false,
        message: "Card not found",
      });
    }

    // Check if the logged-in user is the owner of the card
    if (card.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this card",
      });
    }

    // Update the fields (purchaseLimit, resetDate, commission)
    if (purchaseLimit) card.purchaseLimit = purchaseLimit;
    if (resetDate) card.resetDate = resetDate;
    if (commission) card.commission = commission;

    // Save the updated card
    const updatedCard = await card.save();

    // Respond with the updated card data
    return res.status(200).json({
      success: true,
      data: updatedCard,
      message: "Card updated successfully",
    });

  } catch (error) {
    // Return a 500 error if something goes wrong
    return res.status(500).json({
      success: false,
      message: "Error updating card",
      error: error.message,
    });
  }
});



// delete card

const deleteCard = asyncHandler(async (req, res) => {
    const { id } = req.params;

    console.log(`Deleting card with ID: ${id}`);
    console.log(`User ID: ${req.user._id}`);

    try {
        // Find the card by ID
        const card = await Card.findById(id);

        // Check if the card exists and if the user is the owner
        if (!card) {
            return res.status(404).json({
                success: false,
                message: "Card not found",
            });
        }

        if (card.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this card",
            });
        }

        // Delete the card
        try {
        await Card.deleteOne({ _id: id });
        } catch (removeError) {
            console.error("Error during card removal:", removeError);
            return res.status(500).json({
                success: false,
                message: "Error deleting card",
                error: removeError.message,
            });
        }

        return res.status(200).json({
            success: true,
            message: "Card deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting card:", error);
        return res.status(500).json({
            success: false,
            message: "Error deleting card",
            error: error.message,
        });
    }
});




export {
    getAllCards,
    addCard,
    getCardById,
    updateCard,
    deleteCard,
}