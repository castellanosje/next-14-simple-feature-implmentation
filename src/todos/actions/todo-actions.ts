'use server';
import prisma from '@/lib/prisma';
import { Todo } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export const sleep = async(seconds:number)=>{
    return new Promise(resolve => {
        setTimeout(()=>{
            resolve(true);
        },seconds*1000)
    });
}
export const toggleTodo = async(id:string, complete:boolean):Promise<Todo> =>{
    await sleep(3);

    const todo = await prisma.todo.findFirst({where:{id}});
    if(!todo){
        throw `Todo con id: ${id} no encontrado`;
    }

    const updatedTodo = await prisma.todo.update({
        where: {id},
        data:{complete}
    });

    revalidatePath('/dashboard/server-todos');

    return updatedTodo;
}


export const createTodo = async (
  description: string
): Promise<Todo | { message: string }> => {
  try {
    const newTodo = await prisma.todo.create({ data: { description } });

    revalidatePath("/dashboard/server-todos");

    return newTodo;
  } catch (e) {
    return {
      message: "Error creando Todo",
    };
  }
};

export const deleteTodo = async (): Promise<boolean> => {
  try {
    await prisma.todo.deleteMany({ where: { complete:true } });

    revalidatePath("/dashboard/server-todos");

    return true;
  } catch (e) {
    return false
  }
};

