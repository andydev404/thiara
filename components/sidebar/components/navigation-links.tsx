"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Folder } from "lucide-react";

const navigation = [{ name: "Prompts", href: "/prompts", icon: Folder }];

export const NavigationLinks = () => {
  const pathname = usePathname();

  return (
    <ul role="list" className="-mx-2 space-y-1">
      {navigation.map((link) => (
        <li key={link.name}>
          <Link
            href={link.href}
            className={cn(
              pathname === link.href
                ? "bg-card text-amber-400 border"
                : " hover:text-amber-400 border-transparent hover:bg-card hover:border-accent",
              "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold border"
            )}
          >
            <link.icon className="size-6 shrink-0" aria-hidden="true" />
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};
