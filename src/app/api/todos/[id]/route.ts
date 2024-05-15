import { getUserSessionServer } from '@/auth/actions/auth-actions';
import { Todo } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server'
import * as yup from 'yup';

interface ArgSegments {
    params:{
        id:string;
    }
}

const getTodo = async (id:string):Promise< Todo | null | undefined>=>{
  const user = await getUserSessionServer();
  if (!user) return null;
  const todo = await prisma?.todo.findFirst({where:{id, userId:user.id}});
  return todo;
}


export async function GET(request: Request, {params}: ArgSegments) {
  const {id} = params;
  const todo = await getTodo(id);
  if(!todo)return NextResponse.json({ message: "no se encontraron registros con este id" }, { status: 404 });
  return NextResponse.json(todo);
}


const putSchema = yup.object({
  description: yup.string().optional(),
  complete: yup.boolean().optional().default(false),
});


export async function PUT(request: Request, { params }: ArgSegments) {
  const { id } = params;
  const todo = await getTodo(id);
  if (!todo)
    return NextResponse.json(
      { message: "no se encontraron registros con este id" },
      { status: 404 }
    );
  try{
    const {complete, description} = await putSchema.validate(await request.json()); 
    const updatedTodo = await prisma?.todo.update({
      where: { id },
      data: { complete, description },
    });
    return NextResponse.json(updatedTodo);
  }catch(error){
    return NextResponse.json({message:"error al actualizar el registro"},{status:400});
  }
}