// import React, { useState } from "react";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
           setError("Please fill all the fields");
            return;
        }

        try {
            setLoading(true);
            const payloads = {name,email,password};
            const res = await axios.post("http://localhost:3000/api/auth/signup", payloads);

            toast.success(res.data.message);

            setName("");
            setEmail("");
            setPassword("");

            navigate("/login");

        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
            console.log(error.response?.data);
        } 
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white border border-gray-100 rounded-xl shadow-sm p-8">

                {/* Heading */}
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                    Create an account
                </h2>

                <p className="text-sm text-gray-500 mb-6">
                    Sign up to start writing on MyBlog
                </p>
                {error && <h1 className="text-center text-sm text-red-500 ">{error}</h1> }

                {/* Signup Form */}
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4"
                >

                    {/* Name */}
                    <div>
                        <label className="text-sm text-gray-600 mb-1 block">
                            Name
                        </label>

                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="text-sm text-gray-600 mb-1 block">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="text-sm text-gray-600 mb-1 block">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            required
                        />
                    </div>

                    {/* Signup Button */}
                    <button
                        type="submit"
                        
                        className="bg-purple-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition disabled:opacity-60"
                    >
                        {loading ? "Creating account..." : "Sign up"}
                    </button>

                </form>

                {/* Login Link */}
                <p className="text-sm text-gray-500 text-center mt-6">

                    Already have an account?{" "}

                    <Link
                        to="/login"
                        className="text-purple-600 font-medium hover:underline"
                    >
                        Log in
                    </Link>

                </p>

            </div>

        </div>
    );
};

export default Signup;