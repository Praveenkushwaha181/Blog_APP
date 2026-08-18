import {Navigate, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import CreatePost from "./pages/CreatePost.jsx";
import EditPost from "./pages/EditPost.jsx";
import NotFound from "./pages/NotFound.jsx";



import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
    const token = localStorage.getItem("token");
   
    return (
        <>
        <Navbar />

            <Routes>
                <Route path="*" element={<NotFound />}/>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/createpost" element={
                    token
                        ? <CreatePost />
                        : <Navigate to="/login" replace />
                } />
                <Route path="/editpost/:id" element={
                    token
                        ? <EditPost />
                        : <Navigate to="/login" replace />} />
               
                {/* <Route path="/profile" element={<Profile />} /> */}
            </Routes>
            <ToastContainer />
        </>
    );
}

export default App;
