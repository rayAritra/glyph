"use client"
import { useMutation, useQuery } from "convex/react";
import { Button } from "@/components/ui/button";
import { api } from "../../convex/_generated/api";
const x = () => {
  const projects = useQuery(api.projects.get);
  const createProject = useMutation(api.projects.create);
  return (
    <div className="flex flex-col gap-2">
      <Button onClick={() => createProject({ name: "New Project123" })}  >
        Add new
      </Button>

      {projects?.map((project) => (
        <div key={project._id} className="border rounded p-2 p-4 flex flex-col">
          <h1>{project.name}</h1>
          <p>Owner ID: {project.ownerId}</p>
        </div>
      ))}

    </div>
  )
}
export default x;