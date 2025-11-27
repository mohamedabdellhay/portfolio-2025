// app/projects/page.jsx
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

async function getProjects() {
  await connectDB();
  const projects = await Project.find({}).sort({ createdAt: -1 });
  return JSON.parse(JSON.stringify(projects));
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
        {/* In a real app, check if user is admin before showing this */}
        <Link href="/dashboard">
          <Button variant="outline">Manage Projects</Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div key={project._id} className="bg-white overflow-hidden shadow rounded-lg flex flex-col">
            {project.image && (
              <img 
                src={project.image} 
                alt={project.title} 
                className="h-48 w-full object-cover"
              />
            )}
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
              <p className="text-gray-600 mb-4 flex-1">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.techStack.map((tech, index) => (
                  <span 
                    key={index} 
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="flex gap-4 mt-auto">
                {project.github && (
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-500 text-sm font-medium"
                  >
                    GitHub
                  </a>
                )}
                {project.demo && (
                  <a 
                    href={project.demo} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-500 text-sm font-medium"
                  >
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {projects.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-500">
            No projects found. Add some from the dashboard!
          </div>
        )}
      </div>
    </div>
  );
}
