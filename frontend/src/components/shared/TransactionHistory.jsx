// TransactionHistory.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ListShimmerEffect } from './ListShimmerEffect';

function TransactionHistory() {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        // Fetch transaction data
        axios.get("http://localhost:3001/api/v1/account/transactions", { withCredentials: true })
            .then(response => {
                setTransactions(response.data.transactions); // Assuming the API returns the transactions array
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <div className="bg-white p-6 rounded shadow-md mb-4">
            <h2 className="text-2xl font-semibold mb-4">Transaction History</h2>
            <ul className="space-y-4">
                {transactions.length === 0 ? (
                    <ListShimmerEffect/>
                ) : (
                    transactions.map(transaction => (
                        <li key={transaction._id} className={`flex justify-between items-center p-4 rounded-lg shadow hover:shadow-md transition duration-200 ${transaction.type === 'debit' ? 'bg-red-100' : 'bg-green-100'}`}>
                            <div>
                                <span className={`inline-flex items-center justify-center h-8 w-8 rounded-full text-white ${transaction.type === 'debit' ? 'bg-red-500' : 'bg-green-500'}`}>
                                    {transaction.type === 'debit' ? 'Dr' : 'Cr'}
                                </span>
                                <span className="ml-2 font-medium">{transaction.type === 'debit' ? 'Debit' : 'Credit'}</span>
                            </div>
                            <div className="text-lg font-bold">
                                ${transaction.amount}
                            </div>
                            <div className="text-sm text-gray-600">
                                {transaction.type === 'debit' 
                                    ? `sent to ${transaction.receiverId.firstName} ${transaction.receiverId.lastName}` 
                                    : `received from ${transaction.senderId.firstName} ${transaction.senderId.lastName}`} 
                                <br />
                                <span>{new Date(transaction.timestamp).toLocaleString()}</span>
                            </div>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}

export default TransactionHistory;
