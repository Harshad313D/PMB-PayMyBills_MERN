import mongoose from 'mongoose';

const messageSchema =  mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    message: {
        type: String,
        required: true,
        maxlength:1000,
        trim: true,
        validate:[
            {
                validator: (value) => value.length > 0,
                message: 'Message must not be empty'
            },
            {
                validator: (value) => value.length <= 1000,
                message: 'Message must not exceed 1000 characters'
            },
            
        ]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
},{
    timestamps: true,
})

const Message = mongoose.model("Message", messageSchema);
export default Message;