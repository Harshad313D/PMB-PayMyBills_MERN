import mongoose,{Schema} from "mongoose";

const cardSchema = new mongoose.Schema({
  
  bankName: {
    type: String,
    required: true,
  },
  card_type: {
    type: String,
    required: true,
  },
  holderName: {
    type: String,
    required: true,
  },
  email: {   // Ensure email is defined like this
        type: String,
        required: true,
    },
    contactNo: {  // Ensure contactNo is defined like this
        type: String,
        required: true,
    },
  purchaseLimit: {
    type: Number,
    required: true,
  },  
  resetDate: {
    type: Number,
    required: true,
  },
  
  commission: {
    type: Number,
    required: true,
  },
  
  owner:{
        type: Schema.Types.ObjectId,
        ref: "User"
    }
},
{
    timestamps: true
}
);

export const Card = mongoose.model("Card", cardSchema)


