'use client';

import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface TabBarProps {
  currentTab?: number;
  tabOptions?: number[];
}

export const TabBar = ({
  currentTab = 1,
  tabOptions = [1, 2, 3, 4, 5],
}: TabBarProps) => {
    const [selected, setSelected] = useState(currentTab);
    const router = useRouter();
    const handleTabSelect = (tab:number)=>{
        setSelected(tab);
        setCookie("selectedTab", tab.toString());
        router.refresh();
    }
  return (
    <div
      className={'grid w-full grid-cols-5 space-x-2 rounded-xl bg-gray-200 p-2'}
    >
      {tabOptions.map((tab, i) => (
        <div key={tab}>
          <input
            type="radio"
            id={tab.toString()}
            className="peer hidden"
            onChange={()=>{}}
            checked={selected === tab}
          />
          <label
            onClick={() => handleTabSelect(tab)}
            className=" transition-all block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
          >
            {tab}
          </label>
        </div>
      ))}
    </div>
  );
};
