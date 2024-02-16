export const dynamic = "force-dynamic";
export const revalidate = 0;

import { cookies } from "next/headers";
import { TabBar } from "@/components";

export const metadata = {
  title: "Pápina de cookies",
  description: "SEO Title",
};

export default function CookiesPage() {
  const cookiesStore = cookies();
  const cookieTab = Number(cookiesStore.get("selectedTab")?.value ?? "1");

  return (
    <div className="w-full px-5 mx-5 mb-5">
      <h1 className="text-3xl">Tabs</h1>
      <div>
        <TabBar currentTab={cookieTab} />
      </div>
    </div>
  );
}
