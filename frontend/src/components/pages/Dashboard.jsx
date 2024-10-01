import React, { useEffect, useState } from 'react';
import Header from '../shared/Header';
import Balance from '../shared/Balance';
import AccountList from '../shared/AccountList';
import axios from 'axios';


function Dashboard() {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState('');
    useEffect(() => {
        function fetchUsers(){
            axios.get("https://secure-pay-lrdg.onrender.com/api/v1/user/bulk?filter=" + filter,{withCredentials:true})
            .then(response => {
                setUsers(response.data.user)
            })
            .catch(err => {
                console.log("Dashboard: ", err)
            })
        }
        // setTimeout(fetchUsers,1000);
        fetchUsers();
    }, [filter])
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <Header />
            <Balance />
            <AccountList filter={filter} users={users} setFilter={setFilter} />
        </div>
    );
}

export default Dashboard;
