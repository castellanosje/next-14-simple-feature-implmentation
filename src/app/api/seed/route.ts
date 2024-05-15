import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs';

export async function GET(request: Request) { 
// purga la tabla
await prisma.todo.deleteMany();
await prisma.user.deleteMany();

const user = await prisma.user.create({
  data: {
    email: "test1@google.com",
    password: bcrypt.hashSync("test1"),
    roles: ["admin", "client", "super-user"],
    todos: {
      create: [
        { description: "Piedra del alma", complete: true },
        { description: "Piedra del poder" },
        { description: "Piedra del tiempo" },
        { description: "Piedra del espacio" },
        { description: "Piedra del realidad" },
      ],
    },
  },
});
// añade records de ejemplo
// const todo = await prisma.todo.createMany({
//   data: [
//     { description: "Piedra del alma", complete: true },
//     { description: "Piedra del poder" },
//     { description: "Piedra del tiempo" },
//     { description: "Piedra del espacio" },
//     { description: "Piedra del realidad" },
//   ],
// });

  return NextResponse.json({
    seed:'executed'
  })
}