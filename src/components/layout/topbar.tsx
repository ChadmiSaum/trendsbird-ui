"use client";

import { Menu, Search } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { type ReactNode, useEffect, useId, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { isNavActive, type NavItem, navPages } from "./nav";
import { ThemeToggle } from "./theme-toggle";
import type { ShellUser, UserMenuItem } from "./types";
import { UserMenu } from "./user-menu";

/** Jump to any page in the menu. Ctrl/⌘ K opens it from anywhere. */
export function QuickSearch({ nav }: { nav: NavItem[] }) {
  const pathname = usePathname();
  const router = useRouter();
  const pages = useMemo(() => navPages(nav), [nav]);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [highlight, setHighlight] = useState(0);
  const box = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const listId = useId();

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? pages.filter((p) => p.label.toLowerCase().includes(q)) : pages;
  }, [pages, query]);

  const close = () => {
    setOpen(false);
    setQuery("");
    setHighlight(0);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!open) return;
    input.current?.focus();
    const onDown = (e: MouseEvent) => box.current && !box.current.contains(e.target as Node) && close();
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  const go = (href: string) => {
    close();
    router.push(href);
  };

  return (
    <div ref={box} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Search pages"
        aria-expanded={open}
        aria-haspopup="listbox"
        className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-muted text-muted-foreground transition hover:bg-border sm:w-60 sm:justify-between sm:px-3 md:w-80"
      >
        <span className="hidden text-xs sm:inline">Search pages…</span>
        <span className="flex items-center gap-2">
          <kbd className="hidden rounded border border-border bg-card px-1.5 py-0.5 font-sans text-[10px] text-muted-foreground md:inline">Ctrl K</kbd>
          <Search className="h-4 w-4" />
        </span>
      </button>

      {open && (
        <div className="absolute right-0 top-11 z-50 w-[calc(100vw-2rem)] max-w-xs animate-fade-in overflow-hidden rounded-[10px] border border-border bg-card shadow-pop sm:w-80 sm:max-w-none">
          <div className="border-b border-border p-2">
            <input
              ref={input}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setHighlight(0);
              }}
              onKeyDown={(e) => {
                if (e.key === "Escape") close();
                else if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setHighlight((h) => Math.min(h + 1, matches.length - 1));
                } else if (e.key === "ArrowUp") {
                  e.preventDefault();
                  setHighlight((h) => Math.max(h - 1, 0));
                } else if (e.key === "Enter" && matches[highlight]) {
                  e.preventDefault();
                  go(matches[highlight].href);
                }
              }}
              role="combobox"
              aria-expanded
              aria-controls={listId}
              aria-activedescendant={matches[highlight] ? `${listId}-${highlight}` : undefined}
              aria-label="Search pages"
              placeholder="Type a page name…"
              className="h-9 w-full rounded-md border border-border bg-card px-3 text-[13px] outline-none placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/15"
            />
          </div>
          <div className="bg-muted px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Quick navigation</div>
          <ul id={listId} role="listbox" aria-label="Pages" className="max-h-80 overflow-y-auto p-1">
            {matches.length === 0 ? (
              <li className="px-3 py-6 text-center text-xs text-muted-foreground">No page matches “{query}”.</li>
            ) : (
              matches.map((p, i) => (
                <li key={p.href} id={`${listId}-${i}`} role="option" aria-selected={i === highlight}>
                  <Link
                    href={p.href}
                    onClick={close}
                    onMouseEnter={() => setHighlight(i)}
                    className={cn(
                      "flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs text-primary transition-colors",
                      i === highlight && "bg-muted",
                      isNavActive(p.href, pathname) && "font-semibold",
                    )}
                  >
                    <p.icon className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                    <span className="truncate">{p.label}</span>
                  </Link>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export interface TopbarProps {
  nav: NavItem[];
  onToggleSidebar: () => void;
  sidebarCollapsed: boolean;
  /** Left of the right-hand controls, e.g. a context switcher. */
  start?: ReactNode;
  /** Your own buttons before the theme toggle (e.g. a notification bell; style with topbarIconButton). */
  actions?: ReactNode;
  user?: ShellUser;
  userMenu?: UserMenuItem[];
  /** Show quick navigation. Default true. */
  search?: boolean;
}

export function Topbar({ nav, onToggleSidebar, sidebarCollapsed, start, actions, user, userMenu = [], search = true }: TopbarProps) {
  return (
    <header className="relative z-30 flex h-16 shrink-0 items-center gap-3 border-b border-border bg-card px-3.5 shadow-topbar">
      <button
        type="button"
        onClick={onToggleSidebar}
        aria-label={sidebarCollapsed ? "Expand sidebar" : "Toggle sidebar"}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] text-muted-foreground transition hover:bg-muted hover:text-foreground"
      >
        <Menu className="h-5 w-5" />
      </button>
      {start}

      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        {search && <QuickSearch nav={nav} />}
        {actions}
        <ThemeToggle />
        {user && <UserMenu user={user} items={userMenu} />}
      </div>
    </header>
  );
}
