import { Link } from "react-router-dom";

const NotFound = () => {

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">

            <h1 className="text-7xl font-bold text-blue-600">
                404
            </h1>

            <h2 className="text-3xl font-bold text-gray-800 mt-4">
                Page Not Found
            </h2>

            <p className="text-gray-500 mt-2 mb-6">
                The page you're looking for doesn't exist.
            </p>

            <Link to="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                Go Home
            </Link>

        </div>
    );
};

export default NotFound;