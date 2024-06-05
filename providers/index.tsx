"use client";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <TooltipProvider>
      <SessionProvider>
        {children}
        <Toaster position="top-right" richColors />
      </SessionProvider>
    </TooltipProvider>
  );
};
