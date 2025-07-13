"use client";
import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="relative">
      {/* ครึ่งวงกลมด้านซ้าย */}
      <div className="absolute top-0 left-0   flex items-center justify-cente 2xl:w-[600px] 2xl:h-[600px] xl:w-[550px] xl:h-[550px] lg:w-[450px] md:h-[300px] md:w-[300px] lg:h-[450px] sm:w-[230px] sm:h-[250px] w-[200px] h-[220px] bg-yellow-400 opacity-70 rounded-br-full  z-0 translate-y-[50px]"></div>

      {/* วงกลมใหญ่ขวาบน */}
      <div className="absolute md:top-[-120px] sm:top-[-60px] right-0 2xl:w-[400px] 2xl:h-[400px] xl:w-[350px] xl:h-[350px] lg:w-[300px] lg:h-[300px] md:w-[250px] md:h-[250px] sm:w-[200px] sm:h-[200px] w-35 h-35 bg-yellow-400 rounded-full z-0 opacity-70"></div>

      {/* วงกลมเล็กขวาล่าง */}
      <div className="absolute 2xl:top-[200px] xl:top-[170px] lg:top-[120px] md:top-[120px] sm:top-[100px] top-[110px]  right-[20px]  2xl:w-[100px] 2xl:h-[100px] xl:w-[85px] xl:h-[85px] lg:h-[65px] lg:w-[65px] md:h-[45px] md:w-[45px] sm:w-[35px] sm:h-[35px] w-10 h-10 bg-yellow-400 rounded-full z-0 opacity-90"></div>

      {/* Navbar */}
      <nav className="relative z-10 bg-white shadow-lg w-full">
        <div className="max-w-4xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="lg:text-xl sm:text-md font-bold text-gray-700">
            Todo List
          </h1>
          <div className="flex lg:space-x-20 sm:space-x-14 space-x-10  xl:text-xl sm:text-lg ">
            <Link
              href="/"
              className="text-gray-700 hover:text-yellow-300 font-medium cursor-pointer"
            >
              All
            </Link>
            <Link
              href="/active"
              className="text-gray-700 hover:text-yellow-300 font-medium cursor-pointer"
            >
              Active
            </Link>
            <Link
              href="/completed"
              className="text-gray-700 hover:text-yellow-300 font-medium cursor-pointer"
            >
              Completed
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
