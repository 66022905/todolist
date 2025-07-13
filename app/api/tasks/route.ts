import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma"; // หรือ path ให้ตรงกับไฟล์จริง


export async function GET() {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(tasks);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 });
  }
}

// เพิ่มงานใหม่ (POST /api/tasks)
export async function POST(request: Request) {
  try {
    const { title, categoryId } = await request.json();

    if (!title || typeof title !== "string") {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    if (!categoryId || typeof categoryId !== "number") {
      return NextResponse.json({ error: "Category ID is required" }, { status: 400 });
    }

    const newTask = await prisma.task.create({
      data: {
        title,
        category: {
          connect: { id: categoryId }, // เชื่อมความสัมพันธ์กับ category
        },
      },
    });

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create task" }, { status: 500 });
  }
}


// ลบงานตาม id (DELETE /api/tasks?id=123)
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Task id is required" }, { status: 400 });
    }

    const deletedTask = await prisma.task.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json(deletedTask);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete task" }, { status: 500 });
  }
}
