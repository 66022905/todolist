"use client"; 
import React, { useEffect, useState } from "react";
import Navbar from "./component/Navbar";
import Image from "next/image";
import Link from "next/link";

type Task = {
  id: number;
  title: string;
  isDone: boolean;
  categoryId: number;
};

type CategoryInfo = {
  id: number;
  title: string;
  image: string;
  href: string;
};

// เรียงตามที่คุณบอก (plan=2, today=1, work=3)
const categoryMap: CategoryInfo[] = [
  {
    id: 1,
    title: "Planned",
    image: "/plan.png",
    href: "/plan",
  },
  {
    id: 2,
    title: "Today",
    image: "/today.png",
    href: "/today",
  },
  {
    id: 3,
    title: "Work",
    image: "/work.png",
    href: "/work",
  },
];

export default function Page() {
  const [tasks, setTasks] = useState<Task[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/tasks")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch tasks", err);
        setLoading(false);
      });
  }, []);

  const getTaskCount = (categoryId: number) => {
    return tasks.filter((task) => task.categoryId === categoryId).length;
  };

  return (
    <div className="relative z-0">
      <Navbar />

      {/* ส่วนบน */}
      <div className="flex flex-row justify-center items-center my-10 px-4 gap-6 relative z-10">
        <div className="flex flex-col items-center text-center md:text-left">
          <h1 className="text-4xl font-bold">Hello</h1>
          <p className="text-lg mt-3">
            Today you have {getTaskCount(1)} tasks
          </p>
        </div>
        <div className="w-[100px] relative aspect-square">
          <Image src="/bg.png" alt="background" fill />
        </div>
      </div>

      {/* กล่องลิงก์ */}
      <div className="flex flex-col gap-6 mx-10 mt-10 relative z-10 cursor-pointer">
        {categoryMap.map((category) => (
          <Link key={category.id} href={category.href}>
            <div className="flex items-center bg-white rounded-2xl shadow-lg p-5 hover:shadow-xl hover:bg-gray-200 transition">
              <div className="w-10 h-10 relative overflow-hidden mr-6">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg">{category.title}</span>
                <span className="text-gray-600 text-sm">
                  {getTaskCount(category.id)} tasks
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}//add api
