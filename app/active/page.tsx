"use client";
import React, { useState } from "react";
import Navbar from "../component/Navbar";

interface Task {
  id: number;
  title: string;
  time: string;
  completed: boolean;
  editing?: boolean; // เพิ่มสถานะ editing
}

export default function Active() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newTime, setNewTime] = useState("");

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "ไปเที่ยววันหยุดกับครอบครัว",
      time: "28/10/2025", // วัน/เดือน/ปี
      completed: false,
      editing: false,
    },
    {
      id: 2,
      title: "ประชุมทีมพัฒนาโปรเจค",
      time: "20/07/2025", // วัน/เดือน/ปี
      completed: false,
      editing: false,
    },
  ]);

  // เพิ่ม task ใหม่
  const handleAddTask = () => {
    if (!newTitle || !newTime) return;

    const newTask: Task = {
      id: Date.now(),
      title: newTitle,
      time: newTime,
      completed: false,
      editing: false,
    };

    setTasks([...tasks, newTask]);
    setNewTitle("");
    setNewTime("");
    setShowAddForm(false);
  };

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
      <div className="flex justify-center items-center my-24 px-4 gap-8">
        <div className="flex flex-col text-center md:text-left">
          <h1 className="text-5xl font-bold">Active Todo List</h1>
          <p className="text-2xl mt-5">You have {todayTasks.length} tasks</p>
        </div>
      </div>

      {/* Task List */}
      <div className="relative z-10 w-[1550px] mx-auto px-6 space-y-6">
        {todayTasks.map((task) =>
          task.editing ? (
            // ฟอร์มแก้ไข
            <EditTaskForm
              key={task.id}
              task={task}
              onSave={handleSaveEdit}
              onCancel={handleCancelEdit}
            />
          ) : (
            // แสดง task ปกติ
            <div
              key={task.id}
              className="bg-white p-6 rounded-xl shadow-lg  flex justify-between items-center"
            >
              <div>
                <div className="font-bold text-xl">{task.title}</div>
                <div className="text-md text-gray-600">{task.time}</div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleComplete(task.id)}
                  className="text-green-600 hover:text-green-800  cursor-pointer"
                  title="Mark as completed"
                >
                  ✅
                </button>
                <button
                  onClick={() => handleEdit(task.id)}
                  className="text-blue-600 hover:text-blue-800  cursor-pointer"
                  title="Edit task"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="text-red-500 hover:text-red-700  cursor-pointer"
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
              className="w-full border p-2 rounded  "
            />
            <input
              type="date"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              className="w-full border p-2 rounded  "
            />

            <button
              onClick={handleAddTask}
              className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700  cursor-pointer"
            >
              Save Task
            </button>
          </div>
        )}
      </div>

      {/* Add Task Button (Always at bottom) */}
      <div className="fixed bottom-5 right-5 z-50">
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full shadow-xl  cursor-pointer"
        >
          {showAddForm ? "Cancel" : "＋ Add Task"}
        </button>
      </div>
    </div>
  );
}

// Component แยกฟอร์มแก้ไข task
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
        className="w-full border p-2 rounded  "
      />
      <input
        type="date"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="w-full border p-2 rounded  "
      />

      <div className="flex gap-3 ">
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
