import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const { user } = useSelector(store => store.auth);
    useEffect(()=>{},[user])
    const navigate = useNavigate();
    return (
        <div className="flex justify-between items-center mb-6">
            <Link to={"/"}>
                <h1 className="text-3xl font-bold">SecurePay</h1>
            </Link>
            <div className="flex items-center">
                <span className="text-lg mr-4">Hello, {user}</span>
                <img
                    src="https://via.placeholder.com/40"
                    alt="Profile"
                    className="w-10 h-10 rounded-full cursor-pointer"
                    onClick={() => navigate('/profile')}
                />
            </div>
        </div>
    );
};

export default Header;
