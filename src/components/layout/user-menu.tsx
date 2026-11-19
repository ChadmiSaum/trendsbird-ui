"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cn, initials } from "@/lib/utils";
import type { ShellUser, UserMenuItem } from "./types";

/** The account chip in the top bar and its dropdown (name, email, subtitle, then your items). */
export function UserMenu({ user, items }: { user: ShellUser; items: UserMenuItem[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => ref.current && !ref.current.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const itemClass = (danger?: boolean) =>
    cn("flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-xs", danger ? "text-danger hover:bg-danger-soft" : "hover:bg-muted");

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Account: ${user.name}`}
        className="flex h-9 items-center gap-1.5 rounded-[10px] bg-muted px-2 text-xs transition-colors hover:bg-border"
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-[11px] font-bold text-primary">{initials(user.name, user.email)}</span>
        <span className="hidden max-w-[110px] truncate px-0.5 text-foreground sm:block">{user.name}</span>
        <ChevronDown className={cn("h-3 w-3 text-foreground/45 transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div role="menu" className="absolute right-0 top-11 z-50 w-64 animate-fade-in overflow-hidden rounded-[10px] border border-border bg-card p-1.5 shadow-pop">
          <div className="px-3 py-2">
            <p className="truncate text-sm font-medium">{user.name}</p>
            {user.email && <p className="truncate text-xs text-muted-foreground">{user.email}</p>}
            {user.subtitle && <p className="mt-1 truncate text-xs text-muted-foreground">{user.subtitle}</p>}
          </div>
          {items.length > 0 && (
            <div className="border-t border-border pt-1.5">
              {items.map(({ label, icon: Icon, href, onClick, danger }) =>
                href ? (
                  <Link key={label} href={href} role="menuitem" onClick={() => setOpen(false)} className={itemClass(danger)}>
                    {Icon && <Icon className={cn("h-4 w-4", !danger && "text-muted-foreground")} />} {label}
                  </Link>
                ) : (
                  <button
                    key={label}
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setOpen(false);
                      onClick?.();
                    }}
                    className={itemClass(danger)}
                  >
                    {Icon && <Icon className={cn("h-4 w-4", !danger && "text-muted-foreground")} />} {label}
                  </button>
                ),
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
