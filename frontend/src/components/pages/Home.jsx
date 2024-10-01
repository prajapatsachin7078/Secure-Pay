import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    const handleSignUp = () => {
        navigate("/signup");
    };

    const handleLogin = () => {
        navigate("/login");
    };

    return (
        <div className="flex md:pt-20 flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
            <h1 className="text-5xl text-center  font-bold mb-4 animate-bounce">Welcome to SecurePay</h1>
            <p className="text-lg mb-6">Your trusted partner for secure transactions.</p>
            <button
                onClick={() => navigate('/signup')}
                className="px-6 py-3 mb-4 font-semibold text-blue-600 bg-white rounded-lg shadow-md hover:bg-gray-200 transition duration-300 ease-in-out transform hover:-translate-y-1"
            >
                Get Started
            </button>
            <div className="flex space-x-4 mb-4">
                <button onClick={handleSignUp} className="px-4 py-2 bg-white text-blue-600 rounded-md shadow hover:bg-gray-200 transition duration-300">Signup</button>
                <button onClick={handleLogin} className="px-4 py-2 bg-white text-blue-600 rounded-md shadow hover:bg-gray-200 transition duration-300">Login</button>
            </div>

            <div className="mt-8">
                <h2 className="text-xl font-semibold">Contact Us</h2>
                <form className="mt-4 space-y-4 bg-white p-6 rounded-lg shadow-md">
                    <input
                        type="text"
                        placeholder="Your Name"
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                    <input
                        type="email"
                        placeholder="Your Email"
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                    <textarea
                        placeholder="Your Message"
                        className="w-full p-2 border border-gray-300 rounded"
                        rows="4"
                        required
                    ></textarea>
                    <button className="w-full p-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition duration-300">
                        Send Message
                    </button>
                </form>
            </div>

            <footer className="mt-10 text-center">
                <p className="text-sm">&copy; {new Date().getFullYear()} SecurePay. All rights reserved.</p>
                <div className="flex justify-center space-x-4 mt-2">
                    <a href="https://twitter.com/" className="text-white hover:text-gray-200 transition duration-300">Twitter</a>
                    <a href="#" className="text-white hover:text-gray-200 transition duration-300">Privacy Policy</a>
                    <a href="#" className="text-white hover:text-gray-200 transition duration-300">Terms of Service</a>
                </div>
            </footer>
        </div>
    );
}

export default Home;
