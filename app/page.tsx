"use client";
import React from "react";
import Navbar from "./component/Navbar";
import Image from "next/image";
import Link from "next/link";

const tasks = [
  {
    id: 1,
    title: "Today",
    description: "2 tasks",
    image: "/today.png",
    href: "/today",
  },
  {
    id: 2,
    title: "Planned",
    description: "1 tasks",
    image: "/plan.png",
    href: "/plan",
  },
  {
    id: 3,
    title: "Work",
    description: "1 tasks",
    image: "/work.png",
    href: "/work",
  },
];

export default function Page() {
  return (
    <div className="relative z-0">
      <Navbar />

      {/* ส่วนบน */}
      <div className="flex flex-row justify-center items-center my-20 px-4 gap-18 relative z-10">
        <div className="flex flex-col items-center text-center md:text-left">
          <h1 className="text-6xl">Hello</h1>
          <p className="text-3xl mt-5">today you have 2 tasks</p>
        </div>
        <div className="w-full md:w-[100px] lg:w-[200px] relative aspect-square">
          <Image src="/bg.png" alt="background" fill />
        </div>
      </div>

      {/* กล่องลิงก์ */}
      <div className="flex flex-col gap-6 mx-40 relative mt-10 z-10 cursor-pointer">
        {tasks.map((task) => (
          <Link key={task.id} href={task.href}>
            <div className="flex items-center bg-white rounded-2xl shadow-lg p-5 hover:shadow-xl hover:bg-gray-200 transition">
              <div className="w-16 h-16 relative overflow-hidden mr-10">
                <Image
                  src={task.image}
                  alt={task.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-2xl">{task.title}</span>
                <span className="text-gray-600 text-lg">
                  {task.description}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
