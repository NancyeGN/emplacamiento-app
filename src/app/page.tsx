"use client";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import "./globals.css"

export default function Home() {
  const tasks = useQuery(api.tasks.getTasks);
  const addTask = useMutation(api.tasks.addTask);
  const [newTask, setNewTask] = useState("");
 

  return (
    <div>
    <main className="p-4">
      
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>
      <div className="mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="border p-2 mr-2"
        />
        <button
          onClick={() => {
            addTask({ text: newTask });
            setNewTask("");
          }}
          className="bg-blue-500 text-white px-4 py-2"
        >
          Add Task
        </button>
      </div>
  

      <ul>
        {tasks?.map((task) => (
          <li key={task._id} className="mb-2">
            {task.text} - {task.completed ? "✅" : "❌"}
          </li>
        ))}
      </ul>
    </main>
    <footer className="flex w-full items-center justify-center bg-gray-100 py-6 dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            (c) 2024 Q&A platform. All rights reserved.
          </p>
        </div>
      </footer>
      </div>
  );
}