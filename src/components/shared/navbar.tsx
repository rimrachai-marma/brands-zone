import { Bell } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { getUserProfile } from "@/lib/actions/user";
import HeaderAccount from "./HeaderAcount";
import { Suspense } from "react";

export async function Navbar() {
  const result = await getUserProfile();

  if (!result?.data) return null;

  return (
    <div className="border-b bg-white sticky top-0 z-10">
      <div className="flex justify-between h-18 items-center px-6 gap-4">
        <Button size="icon-lg" variant="ghost" asChild>
          <SidebarTrigger />
        </Button>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon-lg" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </Button>

          <Suspense fallback={null}>
            <HeaderAccount user={result?.data?.user} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
