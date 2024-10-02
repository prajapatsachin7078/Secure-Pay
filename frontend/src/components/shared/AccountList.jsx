import { useState } from "react";
import SearchBar from "./SearchBar";
import AccountItem from "./AccountItem";
import Sendmoney from "./Sendmoney";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setBalance } from "../../redux/authSlice";
import { ListShimmerEffect } from '../shared/ListShimmerEffect';

const AccountList = ({ filter, setFilter, users }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [amount, setAmount] = useState('');
    const dispatch = useDispatch();
    const handleSendMoney = (account) => {
        setSelectedAccount(account);
        setIsModalOpen(true);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const to = selectedAccount._id;
        // console.log(to," ",amount)
        axios.post("https://secure-pay-lrdg.onrender.com/api/v1/account/transfer",
            { to, amount },
            { withCredentials: true })
            .then(response => {
                dispatch(setBalance(response.data.newAmount));
                setFilter('');
                setAmount(0);
                setIsModalOpen(false);
                // console.log(response.data);
            }).catch(err => {
                console.log(err);
            })

    }

    return (
        <>
            <SearchBar filter={filter} setFilter={setFilter} />

            <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Users</h2>
                {users.length === 0 ? (
                    <ListShimmerEffect/>
                ) : (
                    <ul className="space-y-4">
                        {users.map(account => (
                            <AccountItem key={account._id} account={account} onSendMoney={handleSendMoney} />
                        ))}
                    </ul>
                )}
            </div>

            {isModalOpen && (
                <Sendmoney
                    setIsModalOpen={setIsModalOpen}
                    selectedAccount={selectedAccount}
                    handleSubmit={handleSubmit}
                    amount={amount}
                    setAmount={setAmount}
                />
            )}
        </>
    );
};

export default AccountList;
