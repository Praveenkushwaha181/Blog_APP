// import { Link } from "react-router-dom";


// const Navbar = () => {
//     const token = localStorage.getItem("token");
//     const logout= async()=>{
//         const confirmDelete = window.confirm(  "Are you sure you want to logout?" );
//         if (!confirmDelete) {return; }
//         localStorage.removeItem("token");
//         window.location.href = "/";
//     }
  
//     return (
//         <nav>
//             <div>
//                 <Link to="/">MyBlog</Link>

//                 <div>
//                     <Link to="/">Home</Link>
//                     {token ?
//                      (<> <Link to="/createpost">Create Post</Link> <button onClick={logout}>Logout</button> </>) :
//                      (<> <Link to="/login">Login</Link> <Link to="/signup">SignUp</Link> </> )
//                      }
//                 </div>
//             </div>
//         </nav>
//     );
// };

// export default Navbar;
import { Link } from "react-router-dom";

const Navbar = () => {
    const token = localStorage.getItem("token");

    const logout = async () => {
        const confirmLogout = window.confirm(
            "Are you sure you want to logout?"
        );

        if (!confirmLogout) { return; }
        localStorage.removeItem("token");
        window.location.href = "/";
    };

    return (
        <nav className="flex justify-between items-center px-8 py-4 bg-white border-b border-gray-100 sticky top-0 z-10">

            {/* Logo */}
            <Link to="/" className="text-xl font-bold text-purple-600 tracking-tight">
                MyBlog
            </Link>

            {/* Navigation */}
            <div className="flex gap-5 items-center">

                <Link to="/" className="text-sm text-gray-600 hover:text-purple-600 transition">
                    Home
                </Link>

                {token ? (
                    <>
                        <Link to="/createpost" className="text-sm bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">
                            + Create Post
                        </Link>

                        <button
                            onClick={logout}
                            className="text-sm text-gray-500 hover:text-red-500 transition">
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="text-sm text-gray-600 hover:text-purple-600 transition">
                            Login
                        </Link>

                        <Link to="/signup" className="text-sm bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">
                            Sign Up
                        </Link>
                    </>
                )
                }
            </div>
        </nav>
    );
};

export default Navbar;