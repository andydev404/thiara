"use server";

import { signIn, signOut } from "@/lib/auth";

export async function loginWithGoogle() {
  await signIn("google", { redirectTo: "/prompts" });
}

export async function logOut() {
  await signOut({ redirectTo: "/" });
}
