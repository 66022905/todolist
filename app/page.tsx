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
      <div className="flex flex-row justify-center items-center 2xl:my-20 xl:my-14 lg:my-14 md:my-12 sm:my-10 my-8 px-4 2xl:gap-18 xl:gap-14 lg:gap-12 md:gap-10 sm:gap-8 gap-6 relative z-10">
        <div className="flex flex-col items-center text-center md:text-left">
          <h1 className="2xl:text-6xl xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl text-xl font-bold">
            Hello
          </h1>
          <p className="2xl:text-3xl xl:text-2xl lg:text-xl md:text-lg sm:text-md text-sm sm:mt-5 mt-3">
            today you have 2 tasks
          </p>
        </div>
        <div className=" md:w-[100px] 2xl:w-[200px] xl:w-[170px] lg:w-[140px] sm:w-[80px] w-[60px]  relative aspect-square">
          <Image src="/bg.png" alt="background" fill />
        </div>
      </div>

      {/* กล่องลิงก์ */}
      <div className="flex flex-col gap-6 2xl:mx-40 xl:mx-36 lg:mx-32 md:mx-24 sm:mx-18 mx-10 relative mt-10 z-10 cursor-pointer">
        {tasks.map((task) => (
          <Link key={task.id} href={task.href}>
            <div className="flex items-center bg-white rounded-2xl shadow-lg p-5 hover:shadow-xl hover:bg-gray-200 transition">
              <div className="2xl:w-16 2xl:h-16 xl:w-14 xl:h-14 lg:w-12 lg:h-12 md:w-10 md:h-10 sm:w-8 sm:h-8 w-6 h-6 relative overflow-hidden sm:mr-10 mr-7">
                <Image
                  src={task.image}
                  alt={task.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold 2xl:text-2xl xl:text-xl lg:text-lg md:text-md sm:text-sm text-sm">
                  {task.title}
                </span>
                <span className="text-gray-600 2xl:text-lg xl:text-md lg:text-sm text-xs ">
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
