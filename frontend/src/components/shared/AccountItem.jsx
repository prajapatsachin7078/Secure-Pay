import React from 'react';

const AccountItem = ({ account, onSendMoney }) => (
    <li className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm">
        <div>
            <h3 className="text-lg font-bold">{account.firstName + " " + account.lastName}</h3>
        </div>
        <button
            className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition duration-300"
            onClick={() => onSendMoney(account)}
        >
            Send Money
        </button>
    </li>
);

export default AccountItem;
