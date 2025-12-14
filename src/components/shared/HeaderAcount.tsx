"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/types";
import Link from "next/link";
import { LogOut, User as UserIcon, ChevronDown } from "lucide-react";
import { logout } from "@/lib/actions/auth";

interface Props {
  user: User;
}

const HeaderAccount: React.FC<Props> = ({ user }) => {
  const [isLoading, startTransition] = React.useTransition();

  if (!user) {
    return (
      <div className="text-sm sm:text-base">
        <Button asChild variant="link" className="p-0">
          <Link href="/login">Login</Link>
        </Button>
      </div>
    );
  }

  const initials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="text-sm sm:text-base">
          {user.name}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-60 p-0" align="end">
        <div className="flex flex-col">
          <div className="flex items-center gap-3 px-4 py-4 border-b">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user.avatar || undefined} alt={user.name} />
              <AvatarFallback>{initials(user.name)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <div className="p-1">
            <Link
              href={
                user.role == "vendor"
                  ? "/brands/profile"
                  : user.role == "admin"
                  ? "/admin/profile"
                  : "/profile"
              }
            >
              <Button variant="ghost" className="w-full justify-start">
                <UserIcon className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Button>
            </Link>
            <Button
              onClick={() => {
                startTransition(() => {
                  logout();
                });
              }}
              variant="ghost"
              className="w-full justify-start"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>{isLoading ? "Loging out..." : "Log out"}</span>
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default HeaderAccount;
