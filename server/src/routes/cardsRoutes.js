import {Router } from 'express';
import{
    getAllCards,
    addCard,
    getCardById,
    updateCard,
    deleteCard,
} from '../controllers/cards.controller.js';
import { verifyJWT } from "../middleware/auth.middleware.js";


const router = Router();

router.use(verifyJWT);

router.get("/", getAllCards);

// Route to get a card by ID
router.get("/:id", getCardById);

// Route to add a new card
router.post("/", addCard);

// Route to update a card by ID
router.put("/:id", updateCard);

// Route to delete a card by ID
router.delete("/:id", deleteCard);

export default router;