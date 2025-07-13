"use client";
import React, { useState } from "react";
import Navbar from "../component/Navbar";

interface Task {
  id: number;
  title: string;
  time: string;
  completed: boolean;
  editing?: boolean;
}

export default function Active() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "ไปเที่ยววันหยุดกับครอบครัว",
      time: "28/10/2025",
      completed: false,
      editing: false,
    },
    {
      id: 2,
      title: "ประชุมทีมพัฒนาโปรเจค",
      time: "20/07/2025",
      completed: false,
      editing: false,
    },
  ]);

  // ลบ task
  const handleDelete = (id: number) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  // ติ๊กว่าทำเสร็จแล้ว
  const handleComplete = (id: number) => {
    const updated = tasks.map((t) =>
      t.id === id ? { ...t, completed: true, editing: false } : t
    );
    setTasks(updated);
  };

  // เริ่มแก้ไข task
  const handleEdit = (id: number) => {
    const updated = tasks.map((t) =>
      t.id === id ? { ...t, editing: true } : t
    );
    setTasks(updated);
  };

  // ยกเลิกแก้ไข task
  const handleCancelEdit = (id: number) => {
    const updated = tasks.map((t) =>
      t.id === id ? { ...t, editing: false } : t
    );
    setTasks(updated);
  };

  // บันทึกแก้ไข task
  const handleSaveEdit = (
    id: number,
    updatedTitle: string,
    updatedTime: string
  ) => {
    if (!updatedTitle || !updatedTime) return;
    const updated = tasks.map((t) =>
      t.id === id
        ? { ...t, title: updatedTitle, time: updatedTime, editing: false }
        : t
    );
    setTasks(updated);
  };

  const todayTasks = tasks.filter((t) => !t.completed);

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
            You have {todayTasks.length} tasks
          </p>
        </div>
      </div>

      {/* Task List */}
      <div className="relative z-10 2xl:w-[1550px] xl:w-[1040px] lg:w-[830px] md:w-[630px] sm:w-[530px] w-[400px] mx-auto px-6 space-y-6">
        {todayTasks.map((task) =>
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

// Component ฟอร์มแก้ไข task
interface EditTaskFormProps {
  task: Task;
  onSave: (id: number, title: string, time: string) => void;
  onCancel: (id: number) => void;
}

function EditTaskForm({ task, onSave, onCancel }: EditTaskFormProps) {
  const [title, setTitle] = useState(task.title);
  const [time, setTime] = useState(task.time);

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
