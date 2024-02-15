"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactElement } from "react";

interface SidebarItemProps {
  path: string;
  text: string;
  icon?: ReactElement;
}

export const SidebarItem = ({ path, text, icon }: SidebarItemProps) => {
  const currentPath = usePathname();
  return (
    <li>
      <Link
        href={path}
        className={`relative px-4 py-3 flex items-center space-x-4 rounded-xl ${
          path === currentPath
            ? "text-white bg-gradient-to-r from-sky-600 to-cyan-400 hover:from-sky-800 hover:to-cyan-600"
            : "bg-gradient-to-t hover:from-slate-100 hover:to-slate-200"
        }
        `}
      >
        {icon && icon}
        <span className="-mr-1 font-medium">{text}</span>
      </Link>
    </li>
  );
};
