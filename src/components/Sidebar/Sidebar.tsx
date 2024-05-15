import Image from "next/image";
import Link from "next/link";
import { CiLogout } from "react-icons/ci";
import { BsClipboard2Check } from "react-icons/bs";
import { LiaCookieBiteSolid } from "react-icons/lia";
import { RxDashboard } from "react-icons/rx";
import { HiOutlineServerStack } from "react-icons/hi2";
import { SidebarItem } from "./SidebarItem";
import { IoBasketOutline, IoPersonOutline } from "react-icons/io5";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { LogoutButton } from "..";

const sidebarItems = [
  {
    text: "Dashboard",
    path: "/dashboard",
    icon: <RxDashboard size={25} />,
  },
  {
    text: "REST Todos",
    path: "/dashboard/rest-todos",
    icon: <BsClipboard2Check size={25} />,
  },
  {
    text: "Server Actions",
    path: "/dashboard/server-todos",
    icon: <HiOutlineServerStack size={25} />,
  },
  {
    text: "Cookies",
    path: "/dashboard/cookies",
    icon: <LiaCookieBiteSolid size={25} />,
  },
  {
    text: "Products",
    path: "/dashboard/products",
    icon: <IoBasketOutline size={25} />,
  },
  {
    text: "Profile",
    path: "/dashboard/profile",
    icon: <IoPersonOutline size={25} />,
  },
];



export const Sidebar = async () => {



  const session = await getServerSession(authOptions);
  const userName = session?.user?.name ?? undefined
  const avatar = session?.user?.image ?? undefined;
  const userRoles = session?.user?.roles ?? undefined;

  return (
    <aside className="ml-[-100%] overflow-y-auto fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div>
        <div className="-mx-6 px-6 py-4">
          <Link href="/dashboard" title="home">
            <Image
              src="https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg"
              className="w-32"
              width={32}
              height={32}
              alt="tailus logo"
            />
          </Link>
        </div>

        <div className="mt-8 text-center">
          {!!avatar && (
            <Image
              src={avatar}
              alt=""
              width={100}
              height={100}
              className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
            />
          )}
          {!!userName && (
            <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
              {userName}
            </h5>
          )}
          {!!userRoles?.length &&<span className="hidden text-gray-400 lg:block capitalize">
             {userRoles.join(', ')}
          </span>}
        </div>

        <ul className="space-y-2 tracking-wide mt-8">
          {sidebarItems?.map((item) => (
            <SidebarItem key={item.path} {...item} />
          ))}
        </ul>
      </div>

      <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
       <LogoutButton  />
      </div>
    </aside>
  );
}
