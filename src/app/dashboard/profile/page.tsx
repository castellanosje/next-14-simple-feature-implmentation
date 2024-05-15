'use client'

import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function PorfilePage() {

    const {data:session} = useSession();

useEffect(() => {
  console.log('client side');
}, []);

  return (
    <div>
      <h1 className="text-2xl mb-2">Profile page client side</h1>
      <hr className="mb-2" />
      <div className="flex flex-col">
        <span>{session?.user?.name ?? "No name"}</span>
        <span>{session?.user?.image ?? "No image"}</span>
        <span>{session?.user?.email ?? "No email"}</span>
        <span>{session?.user?.roles?.join(', ') ?? ["No roles"]}</span>
        <span>{session?.user?.id ?? "No id"}</span>
      </div>
    </div>
  );
}