"use client";
import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="relative">
      {/* ครึ่งวงกลมด้านซ้าย */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-yellow-400 opacity-70 rounded-br-full z-0 translate-y-[50px]"></div>

      {/* วงกลมใหญ่ขวาบน */}
      <div className="absolute top-[-120px] right-0 w-[400px] h-[400px] bg-yellow-400 rounded-full z-0 opacity-70"></div>

      {/* วงกลมเล็กขวาล่าง */}
      <div className="absolute top-[200px] right-[20px] w-[100px] h-[100px] bg-yellow-400 rounded-full z-0 opacity-90"></div>

      {/* Navbar */}
      <nav className="relative z-10 bg-white shadow-lg w-full">
        <div className="max-w-4xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-700">Todo List</h1>
          <div className="flex space-x-20 text-xl ">
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
