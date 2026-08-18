// import { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import Postcard from "../components/Postcard";

// const Home = () => {

//     const [posts, setPosts] = useState([]);

//     useEffect(() => {
//         fetchPosts();
//     }, []);

//     const fetchPosts = async () => {
//         try {
//             const response = await axios.get("http://localhost:3000/api/auth/getpost");
//             console.log(response.data);
//             setPosts(response.data);
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     const deletePost = async (postId) => {
//         const confirmDelete = window.confirm(  "Are you sure you want to delete this post?" );
//         if (!confirmDelete) {return; }
//         try {
//             const response = await axios.delete(`http://localhost:3000/api/auth/deletepost/${postId}`, { 
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${localStorage.getItem("token")}`,
//                 },
//             });
//             toast.success(
//                 response.data.message || "Post deleted successfully"
//             );
//             // Optionally, you can trigger a state update or refresh the post list here
//         } catch (error) {
//             toast.error(
//                 error.response?.data?.message || "Failed to delete post"
//             );
//         }
//     }


//     return (

//       <div className="min-h-screen bg-gray-100 px-4 py-8">
//        <div className="max-w-5xl mx-auto">

//         {
//         posts.length !== 0 ? 
//         (
//         <> 
//         <h1 className="text-3xl font-bold mb-8">Latest Posts</h1>
//           <div className="grid gap-6 md:grid-cols-2">
//               {posts.map((post) => (
//                         <Postcard post={post} key={post._id} onDelete={deletePost} />
//               ))}
//           </div>
//           </> )
//           :(  
//             <>
//               <div className="text-center py-16">

//                 <h2 className="text-2xl font-semibold text-gray-700">
//                     No posts yet
//                 </h2>

//                 <p className="text-gray-500 mt-2 mb-6">
//                     Be the first person to publish a post.
//                 </p>
//               </div>
//             </>
//             )
//         }
//       </div>
      
//   </div>
//     );
// };

// export default Home;


import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Postcard from "../components/Postcard";

const Home = () => {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        
        try {

            const response = await axios.get( "http://localhost:3000/api/auth/getpost" );
            setPosts(response.data);
        } catch (error) {

            console.log(error);
            toast.error("Failed to load posts");

        } 
    };


    const deletePost = async (postId) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this post?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            const response = await axios.delete(
                `http://localhost:3000/api/auth/deletepost/${postId}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            toast.success(response.data.message);

            // Remove deleted post from screen
            setPosts(
                posts.filter((post) => post._id !== postId)
            );

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to delete post"
            );

        } 

    };


    return (

        <div className="min-h-screen bg-gray-100 px-4 py-8">

            <div className="max-w-5xl mx-auto">

                {/* Heading */}
                <div className="flex justify-between items-center mb-8">

                    <h1 className="text-3xl font-bold">
                        Latest Posts
                    </h1>

                    {localStorage.getItem("token") && (

                        <Link
                            to="/createpost"
                            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                        >
                            + New Post
                        </Link>

                    )}

                </div>


                {/* Loading */}
                {loading && (
                    <p className="text-center text-gray-500">
                        Loading posts...
                    </p>
                )}


                {/* No posts */}
                {!loading && posts.length === 0 && (

                    <div className="text-center py-16">

                        <h2 className="text-2xl font-semibold text-gray-700">
                            No posts yet
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Be the first person to publish a post.
                        </p>

                    </div>

                )}


                {/* Posts */}
                <div className="grid gap-6 md:grid-cols-2">

                    {posts.map((post) => (

                        <Postcard
                            key={post._id}
                            post={post}
                            onDelete={deletePost}
                        />

                    ))}

                </div>

            </div>

        </div>
    );
};

export default Home;