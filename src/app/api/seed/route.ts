import prisma from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: Request) { 
// purga la tabla
await prisma.todo.deleteMany();
// añade records de ejemplo
const todo = await prisma.todo.createMany({
  data: [
    { description: "Piedra del alma", complete: true },
    { description: "Piedra del poder" },
    { description: "Piedra del tiempo" },
    { description: "Piedra del espacio" },
    { description: "Piedra del realidad" },
  ],
});

  return NextResponse.json({
    seed:'executed'
  })
}