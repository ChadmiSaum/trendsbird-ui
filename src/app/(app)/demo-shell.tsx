"use client";

import { Bell, LogOut, Settings, User } from "lucide-react";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { topbarIconButton } from "@/components/layout/topbar-style";
import { brand, nav } from "@/config/navigation";

/**
 * Wires the shell for the demo. In your app, take `user` from your session and
 * make onSignOut call your logout endpoint. (The menu holds icon components, so
 * the shell is set up in a client component like this one.)
 */
export function DemoShell({ children }: { children: ReactNode }) {
  const router = useRouter();
  const signOut = () => router.push("/login");
  const user = { name: "Dana Reviewer", email: "dana@example.com", subtitle: "Admin · Acme Ltd" };

  return (
    <AppShell
      brand={brand}
      nav={nav}
      user={user}
      onSignOut={signOut}
      userMenu={[
        { label: "Profile", icon: User, href: "/forms" },
        { label: "Settings", icon: Settings, href: "/components" },
        { label: "Sign out", icon: LogOut, onClick: signOut, danger: true },
      ]}
      topbarActions={
        <button type="button" className={topbarIconButton} aria-label="Notifications, 3 unread">
          <Bell className="h-[18px] w-[18px]" />
          <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-danger px-1 text-[10px] font-semibold leading-none text-white">3</span>
        </button>
      }
      sidebarExtra={
        <div className="rounded-[13px] border border-border bg-muted p-3.5">
          <p className="truncate text-xs font-semibold text-foreground">Acme Ltd · Pro plan</p>
          <p className="mt-0.5 text-xs text-muted-foreground">12 of 25 projects used</p>
          <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-border">
            <div className="h-full w-[48%] rounded-full bg-primary" />
          </div>
        </div>
      }
    >
      {children}
    </AppShell>
  );
}
