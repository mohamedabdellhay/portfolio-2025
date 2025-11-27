// app/about/page.jsx
import { connectDB } from "@/lib/db";
import AboutMe from "@/models/AboutMe";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

async function getAboutMe() {
  await connectDB();
  const about = await AboutMe.findOne().sort({ updatedAt: -1 });
  return about ? JSON.parse(JSON.stringify(about)) : null;
}

export default async function AboutPage() {
  const about = await getAboutMe();

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-end mb-4">
        <Link href="/dashboard">
          <Button variant="outline">Edit Profile</Button>
        </Link>
      </div>
      
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        {about ? (
          <div className="px-4 py-5 sm:px-6 text-center">
            {about.avatar && (
              <img 
                src={about.avatar} 
                alt="Profile" 
                className="h-32 w-32 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow-lg"
              />
            )}
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{about.heading}</h1>
            <div className="mt-6 text-left prose prose-blue max-w-none">
              <p className="text-gray-600 whitespace-pre-wrap text-lg leading-relaxed">
                {about.content}
              </p>
            </div>
            <p className="mt-8 text-xs text-gray-400">
              Last updated: {new Date(about.updatedAt).toLocaleDateString()}
            </p>
          </div>
        ) : (
          <div className="px-4 py-12 text-center text-gray-500">
            <p className="text-xl">No profile information available yet.</p>
            <p className="mt-2">Go to the dashboard to add your details.</p>
          </div>
        )}
      </div>
    </div>
  );
}
