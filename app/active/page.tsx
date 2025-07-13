"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../component/Navbar";

interface Task {
  id: number;
  title: string;
  time: string;
  completed: boolean;
  editing?: boolean;
}

//add api

export default function Active() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  // โหลดข้อมูล task จาก API ตอน mount
  useEffect(() => {
    fetch("/api/tasks")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch((e) => {
        console.error("Failed to fetch tasks", e);
        setLoading(false);
      });
  }, []);

  // ลบ task
  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/tasks?id=${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete task");
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  // ติ๊กว่าทำเสร็จแล้ว
  const handleComplete = async (id: number) => {
    try {
      const res = await fetch(`/api/tasks`, {
        method: "PUT", // หรือ PATCH ขึ้นกับ API
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, completed: true }),
      });
      if (!res.ok) throw new Error("Failed to update task");
      const updatedTask = await res.json();
      setTasks((prev) => prev.map((t) => (t.id === id ? updatedTask : t)));
    } catch (e) {
      console.error(e);
    }
  };

  // เริ่มแก้ไข task
  const handleEdit = (id: number) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, editing: true } : t))
    );
  };

  // ยกเลิกแก้ไข task
  const handleCancelEdit = (id: number) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, editing: false } : t))
    );
  };

  // บันทึกแก้ไข task
  const handleSaveEdit = async (
    id: number,
    updatedTitle: string,
    updatedTime: string
  ) => {
    if (!updatedTitle || !updatedTime) return;
    try {
      const res = await fetch(`/api/tasks`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, title: updatedTitle, time: updatedTime }),
      });
      if (!res.ok) throw new Error("Failed to update task");
      const updatedTask = await res.json();
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? updatedTask : t))
      );
    } catch (e) {
      console.error(e);
    }
  };

  const activeTasks = tasks.filter((t) => !t.completed);

  if (loading) return <div className="p-5 text-center">Loading...</div>;

  return (
    <div className="relative z-0 min-h-screen pb-24 bg-gray-50">
      <Navbar />

      {/* Header */}
      <div className="flex justify-center items-center 2xl:my-20 xl:my-14 lg:my-14 md:my-12 sm:my-10 my-8 px-4  lg:gap-8 gap-4 relative z-10">
        <div className="flex flex-col text-center md:text-left">
          <h1 className="2xl:text-6xl xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl text-xl font-bold">
            Active Todo List
          </h1>
          <p className="2xl:text-3xl xl:text-2xl lg:text-xl md:text-lg sm:text-md text-sm lg:mt-5 sm:mt-3 mt-2">
            You have {activeTasks.length} tasks
          </p>
        </div>
      </div>

      {/* Task List */}
      <div className="relative z-10 2xl:w-[1550px] xl:w-[1040px] lg:w-[830px] md:w-[630px] sm:w-[530px] w-[400px] mx-auto px-6 space-y-6">
        {activeTasks.map((task) =>
          task.editing ? (
            <EditTaskForm
              key={task.id}
              task={task}
              onSave={handleSaveEdit}
              onCancel={handleCancelEdit}
            />
          ) : (
            <div
              key={task.id}
              className="bg-white p-5 rounded-2xl shadow-lg flex justify-between items-center"
            >
              <div>
                <div className="font-bold 2xl:text-2xl xl:text-xl lg:text-lg md:text-md sm:text-sm text-sm">
                  {task.title}
                </div>
                <div className="2xl:text-lg xl:text-md lg:text-sm text-xs text-gray-600">
                  {task.time}
                </div>
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
