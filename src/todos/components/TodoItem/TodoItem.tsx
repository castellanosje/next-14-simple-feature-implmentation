'use client';
import { Todo } from '@prisma/client';
import styles from './TodoItem.module.css';
import { IoCheckboxOutline, IoSquareOutline } from 'react-icons/io5';
import { useOptimistic, startTransition } from "react";


interface TodoItemProps {
  todo:Todo;
  toggleTodo:(id:string, complete:boolean)=>Promise<Todo|void>
}

export const TodoItem = ({ todo, toggleTodo }: TodoItemProps) => {
  
  const [todoOptimistic, toggleTodoOptimistic] = useOptimistic(
    todo,
    (state, newCompleteValue:boolean) => ({ ...state, complete: newCompleteValue })
  );
  const { id, complete, description, createdAt, updatedAt } = todoOptimistic;
  
  const handleTogle = async()=>{
    try{
      startTransition(()=>toggleTodoOptimistic(!todoOptimistic.complete));
      await toggleTodo(id, !complete);
    }catch(e){
      startTransition(() => toggleTodoOptimistic(!todoOptimistic.complete));
    }
  }

  return (
    <div className={complete ? styles.todoDone : styles.todoPending}>
      <div className="flex flex-col sm:flex-row justify-start items-center gap-4">
        <div
          className={`flex p-2 rounded-md cursor-pointer hover:bg-opacity-60 ${
            complete ? "bg-blue-100" : "bg-red-100"
          } `}
          onClick={handleTogle}
        >
          {complete ? (
            <IoCheckboxOutline size={30} />
          ) : (
            <IoSquareOutline size={30} />
          )}
        </div>
        <div className="text-center sm:text-left">{description}</div>
      </div>
    </div>
  );
};
