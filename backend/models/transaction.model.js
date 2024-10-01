import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // Reference to the User model
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // Reference to the User model
    },
    amount: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ['credit', 'debit'], // Only allow 'credit' or 'debit'
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now // Automatically set to the current date/time
    }
});

export const Transaction = mongoose.model('Transaction',transactionSchema);
