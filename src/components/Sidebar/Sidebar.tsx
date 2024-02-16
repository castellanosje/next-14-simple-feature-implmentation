import Image from "next/image";
import Link from "next/link";
import { CiLogout } from "react-icons/ci";
import { BsClipboard2Check } from "react-icons/bs";
import { LiaCookieBiteSolid } from "react-icons/lia";
import { RxDashboard } from "react-icons/rx";
import { HiOutlineServerStack } from "react-icons/hi2";
import { SidebarItem } from "./SidebarItem";
import { IoBasketOutline } from "react-icons/io5";

const sidebarItems = [
  {
    text: "Dashboard",
    path: "/dashboard",
    icon: <RxDashboard size={30} />,
  },
  {
    text: "REST Todos",
    path: "/dashboard/rest-todos",
    icon: <BsClipboard2Check size={30} />,
  },
  {
    text: "Server Actions",
    path: "/dashboard/server-todos",
    icon: <HiOutlineServerStack size={30} />,
  },
  {
    text: "Cookies",
    path: "/dashboard/cookies",
    icon: <LiaCookieBiteSolid size={30} />,
  },
  {
    text: "Products",
    path: "/dashboard/products",
    icon: <IoBasketOutline size={30} />,
  },
];

export const Sidebar = () => {
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
          <Image
            src="https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp"
            alt=""
            width={100}
            height={100}
            className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
          />
          <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
            Cynthia J. Watts
          </h5>
          <span className="hidden text-gray-400 lg:block">Admin</span>
        </div>

        <ul className="space-y-2 tracking-wide mt-8">          
          {sidebarItems?.map(item=>(
            <SidebarItem key={item.path} {...item} />
          ))}
        </ul>
      </div>

      <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
        <button className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
          <CiLogout />
          <span className="group-hover:text-gray-700">Logout</span>
        </button>
      </div>
    </aside>
  );
}
