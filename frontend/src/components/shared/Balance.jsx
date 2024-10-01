import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBalance } from '../../redux/authSlice';

const Balance = () => {
    const {balance}= useSelector(store=>store.auth);
    const dispatch = useDispatch();
    useEffect(() => {
        async function fetchBalance() {
            axios.get("http://localhost:3001/api/v1/account/balance", { withCredentials: true })
                .then(response => {
                    const balance = response.data.balance;
                    dispatch(setBalance(balance));
                }).catch(error => {
                    console.log(
                        error
                    );
                })
        }
        fetchBalance();
    }, [balance])
    return (

        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold">Your Balance</h2>
            <p className="text-2xl font-bold text-blue-600">${balance?.toFixed(2)}</p>
        </div>
    )
};

export default Balance;
