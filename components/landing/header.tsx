"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Logo from "@/components/ui/logo";
import { loginWithGoogle } from "@/actions/auth.action";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { Button } from "../ui/button";
import { Menu, X } from "lucide-react";
import { Session } from "next-auth";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Features", href: "#features" },
];

type Props = {
  session: Session | null;
};

const Header = ({ session }: Props) => {
  return (
    <header className="absolute inset-x-0 top-0 z-50" id="home">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Logo />
        </div>
        <div className="flex lg:hidden">
          <Sheet>
            <SheetTrigger>
              <Menu className="h-6 w-6 text-neutral-50" aria-hidden="true" />
            </SheetTrigger>
            <SheetContent>
              <div className="flex h-16 shrink-0 items-center">
                <Logo />
              </div>
              <div className="flex flex-col mt-8">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-sm font-semibold py-4 leading-6 text-neutral-50 hover:text-amber-400"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-neutral-50 hover:text-amber-400"
            >
              {item.name}
            </a>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {session?.user ? (
            <Button
              asChild
              variant="secondary"
              className="border border-neutral-700 hover:border-amber-400/30 hover:bg-amber-400/10 bg-neutral-800 transition text-neutral-50 hover:text-amber-400"
            >
              <Link
                href="/prompts"
                className="flex items-center gap-3 text-sm font-semibold"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={session.user.image!}
                    alt={session.user.name!}
                  />
                  <AvatarFallback delayMs={600}>
                    {session.user.name}
                  </AvatarFallback>
                </Avatar>
                My prompts
              </Link>
            </Button>
          ) : (
            <button
              onClick={() => loginWithGoogle()}
              className="text-sm font-semibold leading-6 text-neutral-50 hover:text-amber-400"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
