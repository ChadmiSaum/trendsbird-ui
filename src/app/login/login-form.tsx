"use client";

import { Lock, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/** Demo only: any input "signs in". Call your auth endpoint here. */
export function LoginForm() {
  const router = useRouter();
  const submit = (e: FormEvent) => {
    e.preventDefault();
    router.push("/");
  };
  return (
    <form className="space-y-4" onSubmit={submit}>
      <div className="space-y-2">
        <label htmlFor="email" className="block text-[13px] font-semibold leading-none">Email</label>
        <Input id="email" name="email" type="email" icon={<Mail />} autoComplete="username" placeholder="you@company.com" />
      </div>
      <div className="space-y-2">
        <label htmlFor="password" className="block text-[13px] font-semibold leading-none">Password</label>
        <Input id="password" name="password" type="password" icon={<Lock />} autoComplete="current-password" />
      </div>
      <Button type="submit" size="lg" className="w-full rounded-full font-semibold">Sign in</Button>
    </form>
  );
}
