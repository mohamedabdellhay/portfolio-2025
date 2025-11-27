import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 px-4 text-center">
      <h1 className="text-6xl sm:text-7xl font-extrabold text-gray-800 mb-4">404</h1>
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-600 mb-2">
        Page Not Found
      </h2>
      <p className="text-base sm:text-lg text-gray-500 mb-6 max-w-xs sm:max-w-md">
        The page you are looking for does not exist. Try going back to the homepage.
      </p>
      <Link href="/">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition w-full sm:w-auto">
          Return Home
        </button>
      </Link>
      <img
        src="/404-illustration.svg" // optional illustration
        alt="404 illustration"
        className="mt-8 w-64 sm:w-80"
      />
    </div>
  );
}
