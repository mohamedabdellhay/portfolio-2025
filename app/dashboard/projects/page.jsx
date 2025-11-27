// app/dashboard/projects/page.jsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function ManageProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(data.projects || []);
    } catch (error) {
      console.error("Failed to fetch projects", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      });
      
      if (res.ok) {
        fetchProjects();
      } else {
        alert("Failed to delete project");
      }
    } catch (error) {
      console.error("Error deleting project", error);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Manage Projects</h1>
        <Link href="/dashboard/projects/new">
          <Button>Add New Project</Button>
        </Link>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {projects.map((project) => (
            <li key={project._id}>
              <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
                <div className="flex items-center">
                  {project.image && (
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="h-12 w-12 rounded object-cover mr-4"
                    />
                  )}
                  <div>
                    <p className="text-sm font-medium text-blue-600 truncate">{project.title}</p>
                    <p className="text-sm text-gray-500 truncate max-w-md">{project.description}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Link href={`/dashboard/projects/${project._id}`}>
                    <Button variant="outline" className="text-xs px-2 py-1">Edit</Button>
                  </Link>
                  <button 
                    onClick={() => handleDelete(project._id)}
                    className="text-red-600 hover:text-red-900 text-sm font-medium px-2 py-1"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
          {projects.length === 0 && (
            <li className="px-4 py-8 text-center text-gray-500">
              No projects found. Create your first one!
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
