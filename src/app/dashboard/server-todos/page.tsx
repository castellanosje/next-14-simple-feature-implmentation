export const dynamic = "force-dynamic";
export const revalidate = 0;

import prisma from "@/lib/prisma";
import { NewTodo, TodosGrid } from "@/todos";

export const metadata = {
  title: "Listado de Todos",
  description: "SEO Title",
};

export default async function ServerTodosPage() {
  const todos = await prisma?.todo.findMany({
    orderBy: { description: "asc" },
  });

  return (
    <>
      <div className="mb-5">
        <span className="text-3xl">Server Actions</span>
      </div>
      <div>
        <div className="w-full px-5 mx-5 mb-5">
          <NewTodo />
        </div>
        <TodosGrid todos={todos} />
      </div>
    </>
  );
}
