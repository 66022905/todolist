"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../component/Navbar";
import Image from "next/image";

interface Task {
  id: number;
  title: string;
  time: string;
  completed: boolean;
  categoryId: number;
  editing?: boolean;
}
/* addapi */
export default function Work() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newTime, setNewTime] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const res = await fetch("/api/tasks");
        const data: Task[] = await res.json();
        setTasks(data.filter((t) => t.categoryId === 3));
      } catch (error) {
        console.error("Failed to fetch tasks", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    if (!newTitle || !newTime) return;

    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle, categoryId: 2, time: newTime }),
      });
      if (res.ok) {
        const newTask = await res.json();
        setTasks((prev) => [...prev, newTask]);
        setNewTitle("");
        setNewTime("");
        setShowAddForm(false);
      }
    } catch (error) {
      console.error("Failed to add task", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/tasks?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setTasks((prev) => prev.filter((t) => t.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete task", error);
    }
  };

  const handleComplete = async (id: number) => {
    try {
      const res = await fetch("/api/tasks", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, completed: true }),
      });
      if (res.ok) {
        const updated = await res.json();
        setTasks((prev) =>
          prev.map((t) => (t.id === id ? { ...updated, editing: false } : t))
        );
      }
    } catch (error) {
      console.error("Failed to complete task", error);
    }
  };

  const handleEdit = (id: number) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, editing: true } : t)));
  };

  const handleCancelEdit = (id: number) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, editing: false } : t)));
  };

  const handleSaveEdit = async (id: number, title: string, time: string) => {
    if (!title || !time) return;

    try {
      const res = await fetch("/api/tasks", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, title, time }),
      });
      if (res.ok) {
        const updated = await res.json();
        setTasks((prev) =>
          prev.map((t) => (t.id === id ? { ...updated, editing: false } : t))
        );
      }
    } catch (error) {
      console.error("Failed to update task", error);
    }
  };

  const todayTasks = tasks.filter((t) => !t.completed);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="relative z-0 min-h-screen pb-24 bg-gray-50">
      <Navbar />

      {/* Header */}
      <div className="flex justify-center items-center 2xl:my-20 xl:my-14 lg:my-14 md:my-12 sm:my-10 my-8 px-4  lg:gap-8 gap-4 relative z-10">
        <div className="flex flex-col text-center md:text-left">
          <h1 className="2xl:text-6xl xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl text-xl font-bold">
            TODAY
          </h1>
          <p className="2xl:text-3xl xl:text-2xl lg:text-xl md:text-lg sm:text-md text-sm lg:mt-5 sm:mt-3 mt-2">
            You have {todayTasks.length} tasks
          </p>
        </div>
        <div className="w-[70px] 2xl:w-[160px] xl:w-[140px] lg:w-[120px] md:w-[80px] sm:w-[70px] relative aspect-square">
          <Image src="/today.png" alt="today" fill />
        </div>
      </div>

      {/* Task List */}
      <div className="relative z-10 2xl:w-[1550px] xl:w-[1040px] lg:w-[830px] md:w-[630px] sm:w-[530px] w-[400px] mx-auto px-6 space-y-6">
        {todayTasks.map((task) =>
          task.editing ? (
            <EditTaskForm key={task.id} task={task} onSave={handleSaveEdit} onCancel={handleCancelEdit} />
          ) : (
            <div
              key={task.id}
              className="bg-white p-5 rounded-2xl shadow-lg flex justify-between items-center"
            >
              <div>
                <div className="font-bold 2xl:text-2xl xl:text-xl lg:text-lg md:text-md sm:text-sm text-sm">
                  {task.title}
                </div>
                <div className="2xl:text-lg xl:text-md lg:text-sm text-xs text-gray-600">{task.time}</div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleComplete(task.id)}
                  className="text-green-600 hover:text-green-800 cursor-pointer"
                  title="Mark as completed"
                >
                  ✅
                </button>
                <button
                  onClick={() => handleEdit(task.id)}
                  className="text-blue-600 hover:text-blue-800 cursor-pointer"
                  title="Edit task"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="text-red-500 hover:text-red-700 cursor-pointer"
                  title="Delete task"
                >
                  🗑
                </button>
              </div>
            </div>
          )
        )}

        {/* Add Form */}
        {showAddForm && (
          <div className="bg-white p-4 rounded-xl shadow space-y-3">
            <input
              type="text"
              placeholder="Task title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full border p-2 rounded 2xl:text-2xl xl:text-xl lg:text-lg md:text-md sm:text-sm text-sm"
            />
            <input
              type="date"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              className="w-full border p-2 rounded 2xl:text-lg xl:text-md lg:text-sm text-xs"
            />
            <button
              onClick={handleAddTask}
              className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700 2xl:text-2xl xl:text-xl lg:text-lg md:text-md sm:text-sm text-sm cursor-pointer"
            >
              Save Task
            </button>
          </div>
        )}
      </div>

      {/* Add Task Button */}
      <div className="fixed bottom-5 right-5 z-50">
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full shadow-xl xl:text-lg md:text-md text-sm cursor-pointer"
        >
          {showAddForm ? "Cancel" : "＋ Add Task"}
        </button>
      </div>
    </div>
  );
}

interface EditTaskFormProps {
  task: Task;
  onSave: (id: number, title: string, time: string) => void;
  onCancel: (id: number) => void;
}

function EditTaskForm({ task, onSave, onCancel }: EditTaskFormProps) {
  const [title, setTitle] = React.useState(task.title);
  const [time, setTime] = React.useState(task.time);

  return (
    <div className="bg-white p-4 rounded-xl shadow space-y-3 flex flex-col">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <input
        type="date"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <div className="flex gap-3">
        <button
          onClick={() => onSave(task.id, title, time)}
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 cursor-pointer"
        >
          Save
        </button>
        <button
          onClick={() => onCancel(task.id)}
          className="bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500 cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
