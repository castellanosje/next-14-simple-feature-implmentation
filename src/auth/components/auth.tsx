'use client';

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface AuthProps{
    children:ReactNode
}

export default function AuthProvider({children, ...rest}:AuthProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
