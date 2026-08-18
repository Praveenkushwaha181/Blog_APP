// import React, { useState } from 'react'
// import axios from 'axios'
// import { toast } from "react-toastify";
// import { useNavigate } from 'react-router-dom';


// const Login = () => {


//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')
//     const navigate = useNavigate();
//     const handleSubmit = async(e) => {
//         try {
//             e.preventDefault();
//             if(!email || !password) {
//                 setError('Please fill all the fields');
//                 return;
//             }
//             const payloads = { email, password};
//             const res = await axios.post('http://localhost:3000/api/auth/login',payloads);

//             localStorage.setItem('token', res.data.token);

//             toast.success(res.data.message);  // using backend message for success notification
             
//             // localStorage.setItem('userId', res.data.id);
//             navigate('/');
//             window.location.href = "/";
//             setEmail('')
//             setPassword('')
//         } catch (error) {
//             toast.error(error.response.data.message);  // using backend message for error notification
//             console.log(error.response.data)  
//         }  
//     }


//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

//     <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">

//         <h1 className="text-3xl font-bold text-center mb-6">
//             Login
//         </h1>

//         <form
//             onSubmit={handleSubmit}
//             className="space-y-4"
//         >

//             <div>
//                 <label className="block mb-1 font-medium">
//                     Email
//                 </label>

//                 <input
//                     type="email"
                    
//                     value={email}
//                     onChange={(e)=>{setEmail(e.target.value)}}
//                     placeholder="Enter your email"
//                     className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//             </div>

//             <div>
//                 <label className="block mb-1 font-medium">
//                     Password
//                 </label>

//                 <input
//                     type="password"
//                     value={password}
//                     onChange={(e)=>{setPassword(e.target.value)}}
//                     placeholder="Enter your password"
//                     className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//             </div>

//             <button
//                 type="submit"
//                 className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700"
//             >
//                 Login
//             </button>

//         </form>
//     </div>
// </div>
//   )
// }

// export default Login
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error("Please fill all the fields");
            return;
        }

        try {
            setLoading(true);
            const payloads = {email, password};
            const res = await axios.post("https://blog-app-tfnv.onrender.com/login", payloads);

            localStorage.setItem("token", res.data.token);
            toast.success(res.data.message);

            setEmail("");
            setPassword("");

            window.location.href = "/";

        } catch (error) {
            toast.error(
            error.response?.data?.message || "Something went wrong"
            );
            console.log(error.response?.data);

        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white border border-gray-100 rounded-xl shadow-sm p-8">

                {/* Heading */}
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                    Welcome back
                </h2>

                <p className="text-sm text-gray-500 mb-6">
                    Log in to continue to MyBlog
                </p>

                {/* Login Form */}
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4"
                >

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

                    {/* Login Button */}
                    <button
                        type="submit"
                      
                        className="bg-purple-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition disabled:opacity-60"
                    >
                        {loading ? "Logging in..." : "Log in"}
                    </button>

                </form>

                {/* Signup Link */}
                <p className="text-sm text-gray-500 text-center mt-6">

                    Don't have an account?{" "}

                    <Link
                        to="/signup"
                        className="text-purple-600 font-medium hover:underline"
                    >
                        Sign up
                    </Link>

                </p>

            </div>

        </div>
    );
};

export default Login;
