import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const post = await prisma.post.findUnique({
    where: { id: Number(params.id) },
  });
  return NextResponse.json(post);
}

export async function PUT(req: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const body = await req.json();
  const updated = await prisma.post.update({
    where: { id: Number(params.id) },
    data: { title: body.title, content: body.content },
  });
  return NextResponse.json(updated);
}

export async function DELETE(req: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  await prisma.post.delete({ where: { id: Number(params.id) } });
  return NextResponse.json({ message: "Silindi" });
}
