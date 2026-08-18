// import React, { useState , useEffect} from 'react'
// import { useNavigate } from "react-router-dom";
// import { useParams } from "react-router-dom";
// import axios from 'axios';
// import { toast } from "react-toastify";

// const EditPost = () => {
    
//     const [title, setTitle] = useState('')
//     const [content, setContent] = useState('')
//     const navigate = useNavigate();
//     const { id } = useParams();
//     const token = localStorage.getItem("token");
  

//     useEffect(() => {
//         fetchPost();
//     }, [id]);

//     const fetchPost = async () => {
//         try {
//             const response = await axios.get(`http://localhost:3000/api/auth/getpost/${id}`);
//             setTitle(response.data.title);
//             setContent(response.data.content);
//             console.log(title);
//         } catch (error) {
//             console.log(error);
//             toast.error(
//                 error.response?.data?.message || "Failed to fetch post"
//             );
            
//         }
//     }

//     const handleSubmit = async (e) => {
//         try {
//             e.preventDefault();
//             const payload = { title, content };
//             const response = await axios.put(`http://localhost:3000/api/auth/editpost/${id}`, payload,{
//                 headers:{
//                     Authorization: `Bearer ${localStorage.getItem("token")}`,
//                 }
//             });
//             console.log(response.data);
//             setTitle('');
//             setContent('');
//             // console.log("hello")
//             // console.log(response.data);
//             toast.success(
//                 response.data.message || "Post updated successfully"
//             );

//             navigate("/");
//         } catch (error) {
//              toast.error(
//                             error.response?.data?.message || "Failed to create post"
//                         );
//         }
//     }
   


//   return (
//     <>
//     {token ?  ( 
//         <div className="min-h-screen bg-gray-100 px-4 py-8">

//         <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md">

//     <h1 className="text-3xl font-bold mb-6">
//         Edit Post
//     </h1>

//     <form
//         onSubmit={handleSubmit}
//         className="space-y-5"
//     >

//         <div>

//             <label className="block mb-2 font-medium">
//                 Title
//             </label>

//             <input
//                 type="text"
//                 value={title}
//                 onChange={(e)=> setTitle(e.target.value)}
//                 className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//             />

//         </div>

//         <div>

//             <label className="block mb-2 font-medium">
//                 Content
//             </label>

//             <textarea
//                 value={content}
//                 onChange={(e)=> setContent(e.target.value)}
//                 rows="8"
//                 className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
//             />

//         </div>

//         <button
//             type="submit"
//             className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
//         >
//             Update Post
//         </button>

//     </form>

//         </div>

//        </div>
// ):(
    
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//         <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">

//             <h1 className="text-3xl font-bold text-center mb-6">
//                 Please login to edit the post
//             </h1>

//         </div>
//     </div>
//    )}
// </>
//   )
// }

// export default EditPost

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const EditPost = () => {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        fetchPost();
    }, [id]);

    const fetchPost = async () => {

        try {

            const response = await axios.get( `http://localhost:3000/api/auth/getpost/${id}`);
            setTitle(response.data.title);
            setContent(response.data.content);
        } catch (error) {
            console.log(error);
            toast.error(  error.response?.data?.message ||  "Failed to fetch post");
        }
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!title || !content) {
            toast.error("Please fill all the fields");
            return;
        }

        try {
            setLoading(true);
            const payload = {title, content};

            const response = await axios.put(`http://localhost:3000/api/auth/editpost/${id}`, payload,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            toast.success(
                response.data.message ||
                "Post updated successfully"
            );

            navigate("/");

        } catch (error) {
            console.log(error);
            toast.error(
                error.response?.data?.message ||
                "Failed to update post"
            );

        } finally {
            setLoading(false);
        }
    };

    return (

        <div className="min-h-[80vh] flex items-center justify-center px-4 py-10">

            <div className="w-full max-w-2xl bg-white border border-gray-100 rounded-xl shadow-sm p-8">

                {/* Heading */}
                <h1 className="text-2xl font-bold text-gray-900 mb-1">
                    Edit post
                </h1>

                <p className="text-sm text-gray-500 mb-6">
                    Update your post and save your changes
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5"
                >

                    {/* Title */}
                    <div>

                        <label className="text-sm text-gray-600 mb-1 block">
                            Title
                        </label>

                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            required
                        />

                    </div>

                    {/* Content */}
                    <div>

                        <label className="text-sm text-gray-600 mb-1 block">
                            Content
                        </label>

                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows="8"
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                            required
                        />

                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-purple-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition disabled:opacity-60"
                    >
                        {loading ? "Updating..." : "Update Post"}
                    </button>

                </form>

            </div>

        </div>
    );
};

export default EditPost;