import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Signup() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        // let formdata = new FormData();
        // formdata.append("firstName",firstName);
        // formdata.append("lastName",lastName);
        // formdata.append("username",username);
        // formdata.append("password",password);
        
        // let config ={
        //     headers:{
        //         'content-type':'multipart/form-data'
        //     }
        // }
        axios.post("https://secure-pay-lrdg.onrender.com/api/v1/user/register",{
            data:{
                username,
                password,
                firstName,
                lastName
            }
        })
        .then(response=>{
            const msg = response.data.message;
            console.log(msg);
            navigate("/login")
            
        }).catch(err=>{
            console.log("Signup: ",err)
        })
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center">SecurePay - Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Username/Email"
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
                        Sign Up
                    </button>
                </form>
                <p className="text-center">
                    Already have an account? <a href="/login" className="text-blue-600">Log In</a>
                </p>
            </div>
        </div>
    );
}

export default Signup;
