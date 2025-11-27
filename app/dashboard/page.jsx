// app/dashboard/page.jsx
import { headers } from "next/headers";
import Link from "next/link";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function getUser() {
  const headerList = await headers();      
  const userId = headerList.get("x-user-id");  

  console.log("userId", userId);

  await connectDB();
  const user = await User.findById(userId).select("-password");

  return user ? JSON.parse(JSON.stringify(user)) : null;
}


console.log("getUser", getUser());

export default async function DashboardPage() {
  const user = await getUser();

  console.log("user", user);
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
      
      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Welcome back, {user?.name}!
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Manage your portfolio content from here.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {/* Projects Card */}
        <Link href="/dashboard/projects" className="block group">
          <div className="bg-white overflow-hidden shadow rounded-lg p-6 hover:shadow-md transition-shadow border-l-4 border-blue-500">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600">Projects</h3>
                <p className="mt-1 text-sm text-gray-500">Add, edit, or remove portfolio projects.</p>
              </div>
            </div>
          </div>
        </Link>

        {/* Skills Card */}
        <Link href="/dashboard/skills" className="block group">
          <div className="bg-white overflow-hidden shadow rounded-lg p-6 hover:shadow-md transition-shadow border-l-4 border-green-500">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900 group-hover:text-green-600">Skills</h3>
                <p className="mt-1 text-sm text-gray-500">Manage your technical skills and levels.</p>
              </div>
            </div>
          </div>
        </Link>

        {/* About Me Card */}
        <Link href="/dashboard/about" className="block group">
          <div className="bg-white overflow-hidden shadow rounded-lg p-6 hover:shadow-md transition-shadow border-l-4 border-purple-500">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
                <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900 group-hover:text-purple-600">About Me</h3>
                <p className="mt-1 text-sm text-gray-500">Update your profile info and bio.</p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
