// import { Link } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";

// const Postcard = ({ post, onDelete }) => {
//     // const userId = localStorage.getItem("userId");
//     const token = localStorage.getItem("token");
//     // if(!token) {
//     //    return null;// or handle the case when token is not available
//     // }
//     // const decoded = jwtDecode(token);
//     // const userId = decoded.userId; 
//     let userId = null;

//     if (token) {
//         const decoded = jwtDecode(token);
//         userId = decoded.userId;
//     }

   
//     return (   
//         <div className="bg-white p-6 rounded-xl shadow-md" >
//         <h2 className="text-2xl font-bold mb-2">
//                 {post.title}
//             </h2>

//             <p className="text-gray-600 mb-4">
//                 {post.content}
//             </p>

//             <p className="text-sm text-gray-500">
//                 By {post.author?.name}
//             </p>
           
//             {post.author._id === userId && (
//                 <>
//                     <Link
//                         to={`/editpost/${post._id}`}
//                         className="inline-block bg-yellow-500 text-white px-4 py-2 rounded-lg"
//                     >
//                         Edit
//                     </Link>

//                     <Link
//                         onClick={() => onDelete(post._id)}
//                         className="inline-block bg-yellow-500 text-white px-4 py-2 rounded-lg"
//                     >
//                         Delete
//                     </Link>
//                 </>
//             )}
//              {/* <Link
//     to={`/editpost/${post._id}`}
//     className="inline-block bg-yellow-500 text-white px-4 py-2 rounded-lg"
// >
//     Edit
// </Link>
// <Link
//     onClick={() => onDelete(post._id)}
//     className="inline-block bg-yellow-500 text-white px-4 py-2 rounded-lg"
// >
//     Delete
// </Link> */}
           

//         </div>  
//     );
// };

// export default Postcard;

import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Postcard = ({ post, onDelete }) => {

    const token = localStorage.getItem("token");

    let userId = null;

    if (token) {
        const decoded = jwtDecode(token);
        userId = decoded.userId;
    }

    return (
        <div className="bg-white p-6 rounded-xl shadow-md">

            <h2 className="text-2xl font-bold mb-2">
                {post.title}
            </h2>

            <p className="text-gray-600 mb-4">
                {post.content}
            </p>

            <p className="text-sm text-gray-500 mb-4">
                By {post.author?.name}
            </p>

            {/* Show buttons only for post owner */}
            {post.author?._id === userId && (
                <div className="flex gap-3">

                    <Link
                        to={`/editpost/${post._id}`}
                        className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                    >
                        Edit
                    </Link>

                    <button
                        onClick={() => onDelete(post._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                    >
                        Delete
                    </button>

                </div>
            )}

        </div>
    );
};

export default Postcard;