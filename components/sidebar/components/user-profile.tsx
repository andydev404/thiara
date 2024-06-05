"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { useSession } from "next-auth/react";
import { logOut } from "@/actions/auth.action";
import { LogOut } from "lucide-react";

export const UserProfile = () => {
  const session = useSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="link">
          <h3 className="text-sm font-semibold leading-6 text-neutral-900 mr-4">
            {session?.data?.user?.name}
          </h3>
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={session?.data?.user?.image!}
              alt={session?.data?.user?.name!}
            />
            <AvatarFallback delayMs={600}>
              {session?.data?.user?.name}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="center" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {session?.data?.user?.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {session?.data?.user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <Button
          variant="link"
          className="w-full mt-4 justify-start"
          onClick={() => {
            logOut();
          }}
        >
          <LogOut className="mr-2 size-4" />
          Log out
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
