// components/ProjectForm.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function ProjectForm({ initialData = null, isEdit = false }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    techStack: initialData?.techStack?.join(", ") || "",
    github: initialData?.github || "",
    demo: initialData?.demo || "",
    image: initialData?.image || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      techStack: formData.techStack.split(",").map(item => item.trim()).filter(Boolean),
    };

    try {
      const url = isEdit 
        ? `/api/projects/${initialData._id}` 
        : "/api/projects";
      
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push("/dashboard/projects");
        router.refresh();
      } else {
        alert("Failed to save project");
      }
    } catch (error) {
      console.error("Error saving project", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
      <Input
        id="title"
        label="Project Title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      <Input
        id="techStack"
        label="Tech Stack (comma separated)"
        value={formData.techStack}
        onChange={handleChange}
        placeholder="React, Node.js, MongoDB"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          id="github"
          label="GitHub URL"
          value={formData.github}
          onChange={handleChange}
        />
        <Input
          id="demo"
          label="Live Demo URL"
          value={formData.demo}
          onChange={handleChange}
        />
      </div>

      <Input
        id="image"
        label="Image URL"
        value={formData.image}
        onChange={handleChange}
        placeholder="https://example.com/image.jpg"
      />

      <div className="flex justify-end space-x-3">
        <Button 
          type="button" 
          onClick={() => router.back()}
          className="bg-gray-200 text-gray-800 hover:bg-gray-300"
        >
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : isEdit ? "Update Project" : "Create Project"}
        </Button>
      </div>
    </form>
  );
}
