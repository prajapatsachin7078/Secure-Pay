import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TransactionHistory from '../shared/TransactionHistory';
import { useDispatch, useSelector } from "react-redux";
import { setUser } from '../../redux/authSlice';

function Profile() {
    const [isEditing, setIsEditing] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [showTransactions, setShowTransactions] = useState(false);
    const [loading, setLoading] = useState(false); // Local loading state
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        // Fetch user profile data
        axios.get("https://secure-pay-lrdg.onrender.com/api/v1/user", { withCredentials: true })
            .then(response => {
                const { firstName, lastName, username, profilePicture } = response.data;
                setFirstName(firstName);
                setLastName(lastName);
                setUsername(username);
                setProfilePicture(profilePicture);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "profilePicture") {
            setProfilePicture(e.target.files?.[0]);
        }
        if (name === "firstName") {
            setFirstName(value);
        }
        if (name === "lastName") setLastName(value);
        if (name === "username") setUsername(value);
    };

    const handleLogout = () => {
        localStorage.removeItem("username");
        Cookies.remove('token');
        navigate("/");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true on submit
        const formData = new FormData();
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append('username', username);

        if (profilePicture) {
            formData.append('profilePicture', profilePicture);
        }

        axios.put("https://secure-pay-lrdg.onrender.com/api/v1/user/profile/update", formData, {
            withCredentials: true,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
            .then(response => {
                const { firstName, lastName, username, profilePicture } = response.data;
                setFirstName(firstName);
                setLastName(lastName);
                setUsername(username);
                setProfilePicture(profilePicture);
                setIsEditing(false);
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false); // Reset loading state
            });
    };

    return (
        <div className="container mx-auto p-4">
            <div className='flex w-[100%] justify-between'>
                <h1 className="text-2xl font-bold">Profile</h1>
                <button
                    className='border bg-blue-400 hover:bg-blue-300 cursor-pointer text-white rounded-md px-4 py-2'
                    onClick={() => { navigate("/dashboard") }}
                >Dashboard</button>
            </div>

            <div className="flex items-center my-4">
                {profilePicture ? (
                    <img src={profilePicture} alt="Profile" className="w-24 h-24 rounded-full mr-4" />
                ) : (
                    <div className="w-24 h-24 rounded-full bg-gray-300 mr-4 flex items-center justify-center">
                        <span className="text-xl">No Image</span>
                    </div>
                )}
                <div>
                    <button onClick={handleEditToggle} className="bg-blue-500 text-white p-2 rounded">
                        {isEditing ? "Cancel" : "Edit Profile"}
                    </button>
                    <button onClick={handleLogout} className="bg-red-500 text-white p-2 rounded ml-4">
                        Logout
                    </button>
                </div>
            </div>

            {isEditing ? (
                <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded shadow-md">
                    <div className="mb-4">
                        <label className="block mb-1">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            value={firstName}
                            onChange={handleInputChange}
                            className="p-2 border border-gray-300 rounded w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            value={lastName}
                            onChange={handleInputChange}
                            className="p-2 border border-gray-300 rounded w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Username/Email</label>
                        <input
                            type="text"
                            name="username"
                            value={username}
                            onChange={handleInputChange}
                            className="p-2 border border-gray-300 rounded w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Profile Picture</label>
                        <input
                            type="file"
                            name="profilePicture"
                            onChange={handleInputChange}
                            className="p-2 border border-gray-300 rounded w-full"
                        />
                    </div>
                    <button
                        type="submit"
                        className={`bg-green-500 text-white p-2 rounded flex items-center justify-center ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <svg
                                    className="animate-spin h-5 w-5 mr-2"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12c0-4.418 3.582-8 8-8s8 3.582 8 8H4z"
                                    />
                                </svg>
                                Loading...
                            </>
                        ) : (
                            'Save Changes'
                        )}
                    </button>
                </form>
            ) : (
                <div className="mt-4 border border-b p-5 mb-5">
                    <p><strong>First Name:</strong> {firstName}</p>
                    <p><strong>Last Name:</strong> {lastName}</p>
                    <p><strong>Username/Email:</strong> {username}</p>
                </div>
            )}

            {/* Toggle button for TransactionHistory */}
            <button
                onClick={() => setShowTransactions(!showTransactions)}
                className="bg-gray-500 text-white p-2 rounded mb-4"
            >
                {showTransactions ? "Hide Transactions" : "Show Transactions"}
            </button>

            {/* Show TransactionHistory based on toggle state */}
            {showTransactions && <TransactionHistory />}
        </div>
    );
}

export default Profile;
