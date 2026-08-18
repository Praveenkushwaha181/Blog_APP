// import React, { useState } from 'react'
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import axios from 'axios';



// const CreatePost = () => {

//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');

//   const handleSubmit = async(e) => {
//     e.preventDefault();
//     try {
//       const payload = { title, content };
//       const response = await axios.post(
//         "http://localhost:3000/api/auth/createpost",
//         payload,{
//           headers:{
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           }});
//       console.log(response.data);
//       toast.success(response.data.message || "Post created successfully");
//       navigate("/");
//     } catch (error) {
//       console.log(error);
//             toast.error(error.response?.data?.message || "Failed to create post");
//     }
//   }


//   return(
   
//   <>

//     {token ?  (
//     <div className="min-h-screen bg-gray-100 px-4 py-8">

//     <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md">
//         <h1 className="text-3xl font-bold mb-6">
//             Create Post
//         </h1>
//         <form
//             onSubmit={handleSubmit}
//             className="space-y-5"
//         >

//             <div>
//                 <label className="block mb-2 font-medium">
//                     Title
//                 </label>

//                 <input
//                     type="text"
//                     value={title}
//                     onChange={(e)=> setTitle(e.target.value)}
//                     placeholder="Enter post title"
//                     className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//             </div>

//             <div>
//                 <label className="block mb-2 font-medium">
//                     Content
//                 </label>

//                 <textarea
//                     value={content}
//                     onChange={(e)=> setContent(e.target.value)}
//                     placeholder="Write your post..."
//                     rows="8"
//                     className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
//                 />
//             </div>

//             <button
//                 type="submit"
//                 className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
//             >
//                 Publish Post
//             </button>

//         </form>

//     </div>

//     </div>
//     )
//     :
//      (    
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//     <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">

//         <h1 className="text-3xl font-bold text-center mb-6">
//             Please Login to Create a Post
//         </h1>

//         <p className="text-center text-gray-600">
//             You need to be logged in to create a new post. Please log in or sign up to continue.
//         </p>

//      </div>
//      </div>
//         )
//     }   
//    </>
// );
// }

// export default CreatePost


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const CreatePost = () => {

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!title || !content) {
            toast.error("Please fill all the fields");
            return;
        }

        try {

            setLoading(true);

            const payload = {title,content };

            const response = await axios.post( "https://blog-app-tfnv.onrender.com/createpost", payload,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            toast.success(
                response.data.message || "Post created successfully"
            );

            setTitle("");
            setContent("");

            navigate("/");

        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.message ||
                "Failed to create post"
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
                    Create a new post
                </h1>

                <p className="text-sm text-gray-500 mb-6">
                    Share your thoughts with the MyBlog community
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
                            placeholder="Enter your post title"
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
                            placeholder="Write your post here..."
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
                        {loading ? "Publishing..." : "Publish Post"}
                    </button>

                </form>

            </div>

        </div>
    );
};

export default CreatePost;