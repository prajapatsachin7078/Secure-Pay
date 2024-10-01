import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/authSlice';
function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        try {
            const response = await axios.post("https://secure-pay-lrdg.onrender.com/api/v1/user/login", {
                data: {
                    username,
                    password
                }
            }, { withCredentials: true }); // Send cookies with request

            if (response.status === 200) {
                // Access the token from the cookie
                // const token = Cookies.get('token');
                // console.log('Token:', token); // Print the token
                const user = response.data.user;
                dispatch(setUser(user.firstName));
                navigate("/dashboard");
            }
        } catch (err) {
            console.log(err)
            if (err.response) {
                const { message, errorType } = err.response.data;
                if (errorType === "USER_NOT_FOUND") {
                    setErrorMessage(message);
                } else if (errorType === "WRONG_PASSWORD") {
                    setErrorMessage(message);
                } else {
                    setErrorMessage("An unexpected error occurred. Please try again.");
                }
            } else {
                setErrorMessage("Network error. Please check your connection.");
            }
        }
    }
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-center">SecurePay - Login</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                        <button type="submit" className="w-full p-2 text-white bg-blue-600 rounded hover:bg-blue-700">
                            Login
                        </button>
                        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                    </form>
                    <p className="text-center">
                        Don't have an account? <a href="/signup" className="text-blue-600">Sign Up</a>
                    </p>
                </div>
            </div>
        );
    }

    export default Login;
