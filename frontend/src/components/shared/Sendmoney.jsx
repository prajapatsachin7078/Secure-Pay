import React, { useState } from 'react'

function Sendmoney({setIsModalOpen,selectedAccount,handleSubmit ,amount,setAmount}) {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="bg-white p-6 rounded-lg shadow-lg z-10">
                <h2 className="text-xl font-semibold mb-4">Send Money to {selectedAccount?.firstName}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="number"
                        placeholder="Amount"
                        className="w-full p-2 border border-gray-300 rounded mb-4"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                    <div className="flex justify-between">
                        <button
                            type="button"
                            className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300 transition duration-300"
                            onClick={() => setIsModalOpen(false)}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition duration-300"
                        >
                            Send
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Sendmoney