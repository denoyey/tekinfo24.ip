import { Link } from "react-router-dom"

const NotFoundPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen gap-2">
            <h1 className="text-3xl font-bold text-center">404 Not Found</h1>
            <p className="text-xl text-center">Sorry, the page you are looking for does not exist.</p>
            <Link to="/" className="text-white text-center mt-4 py-2 px-6 bg-blue-500 hover:bg-blue-600 rounded-lg">Back to Home</Link>
        </div>
    )
}

export default NotFoundPage