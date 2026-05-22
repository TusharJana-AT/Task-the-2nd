import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-5xl font-bold">404</h1>
      <p className="text-gray-500">Page not found</p>

      <Link
        to="/"
        className="bg-black text-white px-4 py-2 rounded-lg"
      >
        Go Home
      </Link>
    </div>
  );
}

export default PageNotFound