// app/page.jsx
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] py-12 px-4 sm:px-6 lg:px-8 text-center">
      <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
        <span className="block">Welcome to your</span>
        <span className="block text-blue-600">Next.js Portfolio App</span>
      </h1>
      <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
        A full-stack application with MongoDB, JWT Authentication, and TailwindCSS.
        Built with Next.js 14 App Router.
      </p>
      <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center gap-4">
        <Link href="/login">
          <Button className="w-full sm:w-auto px-8 py-3 text-base font-medium">
            Get Started
          </Button>
        </Link>
        <Link href="https://nextjs.org/docs" target="_blank">
          <Button className="w-full sm:w-auto px-8 py-3 text-base font-medium bg-white text-blue-600 border border-blue-600 hover:bg-blue-50">
            Learn Next.js
          </Button>
        </Link>
      </div>
      
      <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900">Authentication</h3>
          <p className="mt-2 text-sm text-gray-500">
            Secure user registration and login using JWT and HTTP-only cookies.
          </p>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900">Database</h3>
          <p className="mt-2 text-sm text-gray-500">
            MongoDB integration with Mongoose for data modeling and persistence.
          </p>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900">Modern UI</h3>
          <p className="mt-2 text-sm text-gray-500">
            Responsive design built with TailwindCSS and reusable components.
          </p>
        </div>
      </div>
    </div>
  );
}
