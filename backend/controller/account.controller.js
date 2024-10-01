import mongoose from "mongoose";
import { Account } from "../models/account.model.js"
import {Transaction} from "../models/transaction.model.js"
export const getBalance = async (req, res) => {
    const userId = req.id;
    try {
        const account = await Account.findOne({ userId });
        res.status(200).json({
            balance: account.balance
        });
    } catch (error) {
        console.log("Error in fetching balance..");
        res.status(500).json({
            error: "Error while fetching balance.."
        })
    }
}
export const transferFunds = async (req, res,next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { amount, to } = req.body;
        const userId = req.id;
        //  console.log(amount, " ", to)
        const fromAccount = await Account.findOne({ userId }).session(session);
        // console.log("from : ",fromAccount)
        // check if valid account and has enough funds to transfer
        if (!fromAccount || fromAccount.balance < amount) {
            await session.abortTransaction(); // abort the transaction 
            return res.status(400).json({
                message: "Insufficient balance"
            })
        }
        const toAccount = await Account.findOne({ userId: to }).session(session);
        // console.log("toaccount: " ,toAccount)
        if (!toAccount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Invalid account!"
            })
        }
        // Performing transfer
        await Account.findOneAndUpdate({ userId }, { $inc: { balance: -amount } }).session(session);
        await Account.findOneAndUpdate({ userId: to }, { $inc: { balance: amount } });

        // Commiting the transfer
        await session.commitTransaction();
        const currentOfFrom = await Account.findOne({ userId });
        // res.status(200).json({
        //     message: "Transfer Successful!",
        //     amount,
        //     balance: currentOfFrom.balance
        // })
        res.balance = currentOfFrom.balance;
        next();

    } catch (error) {
        console.log("Error while transfering..!")
        res.status(500).json({
            error
        })
    } finally {
        session.endSession();
    }
}
export const recordTransaction = async (req, res) => {
    const { to, amount } = req.body; 
    const senderId = req.id; 
    try {
        // Record the debit transaction for the sender
        await new Transaction({
            senderId,
            receiverId:to,
            amount,
            type: 'debit' // Sender is debiting money
        }).save();

        // Record the credit transaction for the receiver
        await new Transaction({
            senderId,
            receiverId:to,
            amount,
            type: 'credit' // Receiver is crediting money
        }).save();

        res.status(201).json({
            message: 'Transaction successfull',
            balance: req.balance
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Couldn't record the transaction...Internal server issue.."
        });
    }
};
export const getTransactionHistory = async (req, res) => {
    const userId = req.id;
    try {
        const transactions = await Transaction.find({
            $or: [
                { senderId: userId },
                { receiverId: userId }
            ]
        }).populate('senderId receiverId', 'firstName lastName') // Populate user details
        .sort({ timestamp: -1 }); // Sort by most recent first
         // Filter to exclude any transactions where the user is the sender for credits
         const filteredTransactions = transactions.filter(transaction => {
            // Include if it's a debit (user is sender) or if it's a credit (user is receiver)
            return (transaction.senderId._id.toString() === userId && transaction.type === 'debit') ||
                   (transaction.receiverId._id.toString() === userId && transaction.type === 'credit');
        });
        res.json({
            transactions:filteredTransactions
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Couldn't fetch transaction history...Internal server issue.."
        });
    }
};

