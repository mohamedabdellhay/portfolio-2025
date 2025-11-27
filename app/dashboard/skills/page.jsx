// app/dashboard/skills/page.jsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function ManageSkills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSkills = async () => {
    try {
      const res = await fetch("/api/skills");
      const data = await res.json();
      setSkills(data.skills || []);
    } catch (error) {
      console.error("Failed to fetch skills", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this skill?")) return;
    
    try {
      const res = await fetch(`/api/skills/${id}`, {
        method: "DELETE",
      });
      
      if (res.ok) {
        fetchSkills();
      } else {
        alert("Failed to delete skill");
      }
    } catch (error) {
      console.error("Error deleting skill", error);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Manage Skills</h1>
        <Link href="/dashboard/skills/new">
          <Button>Add New Skill</Button>
        </Link>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {skills.map((skill) => (
            <li key={skill._id}>
              <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{skill.name}</p>
                  <p className="text-sm text-gray-500">
                    {skill.category} • <span className={`
                      ${skill.level === 'Advanced' ? 'text-green-600' : 
                        skill.level === 'Intermediate' ? 'text-yellow-600' : 'text-gray-600'}
                    `}>{skill.level}</span>
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Link href={`/dashboard/skills/${skill._id}`}>
                    <Button variant="outline" className="text-xs px-2 py-1">Edit</Button>
                  </Link>
                  <button 
                    onClick={() => handleDelete(skill._id)}
                    className="text-red-600 hover:text-red-900 text-sm font-medium px-2 py-1"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
          {skills.length === 0 && (
            <li className="px-4 py-8 text-center text-gray-500">
              No skills found. Add some skills!
            </li>
          )}
        </ul>
      </div>
      
      <div className="mt-6">
        <Link href="/dashboard" className="text-blue-600 hover:text-blue-500">
          &larr; Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
