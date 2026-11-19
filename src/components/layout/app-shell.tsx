"use client";

import { X } from "lucide-react";
import { usePathname } from "next/navigation";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { AppFooter } from "./app-footer";
import type { NavItem } from "./nav";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";
import type { Brand, ShellUser, UserMenuItem } from "./types";

/** Tailwind's `lg`: the sidebar is part of the page at this width and above, a drawer below it. */
const DESKTOP_QUERY = "(min-width: 1024px)";

export interface AppShellProps {
  brand: Brand;
  nav: NavItem[];
  user?: ShellUser;
  /** Account menu entries (top bar). Add a "Sign out" item here too if you want it in the menu. */
  userMenu?: UserMenuItem[];
  /** Shows a sign-out button on the sidebar's account card. */
  onSignOut?: () => void;
  /** Your buttons in the top bar, before the theme toggle. */
  topbarActions?: ReactNode;
  /** Left side of the top bar, after the sidebar toggle. */
  topbarStart?: ReactNode;
  /** A card above the sidebar's account card (e.g. plan usage). */
  sidebarExtra?: ReactNode;
  /** Above the page content, e.g. an announcement banner. */
  banner?: ReactNode;
  /** Replace the default footer; pass null for none. */
  footer?: ReactNode | null;
  /** localStorage key that remembers the collapsed sidebar. */
  storageKey?: string;
  children: ReactNode;
}

/**
 * The signed-in frame: sidebar, top bar, the scrolling content area and the
 * footer. The page scrolls inside the content area, so the sidebar and top bar
 * stay in place.
 */
export function AppShell({
  brand,
  nav,
  user,
  userMenu,
  onSignOut,
  topbarActions,
  topbarStart,
  sidebarExtra,
  banner,
  footer,
  storageKey = "tb-sidebar-collapsed",
  children,
}: AppShellProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const content = useRef<HTMLElement>(null);

  // A per-browser convenience; read after mount so the server and first client render agree.
  useEffect(() => {
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- restoring a stored preference once
      if (localStorage.getItem(storageKey) === "1") setCollapsed(true);
    } catch {
      // Storage unavailable: keep the sidebar open.
    }
  }, [storageKey]);

  const setAndStoreCollapsed = (next: boolean) => {
    setCollapsed(next);
    try {
      localStorage.setItem(storageKey, next ? "1" : "0");
    } catch {
      // Not remembered this time; nothing else depends on it.
    }
  };

  // The content area, not the window, is what scrolls: start each page at its top.
  useEffect(() => {
    content.current?.scrollTo({ top: 0 });
  }, [pathname]);

  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setDrawerOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawerOpen]);

  const toggleSidebar = () => {
    if (window.matchMedia(DESKTOP_QUERY).matches) setAndStoreCollapsed(!collapsed);
    else setDrawerOpen(true);
  };

  const sidebarProps = { brand, nav, user, onSignOut, extra: sidebarExtra };

  return (
    <div data-print-root className="flex h-screen w-full overflow-hidden bg-background">
      <aside
        data-print-hide
        className={cn(
          "relative z-40 hidden h-screen shrink-0 flex-col border-r border-border bg-card shadow-sidebar transition-[width] duration-200 lg:flex",
          collapsed ? "w-16" : "w-72",
        )}
      >
        <Sidebar {...sidebarProps} collapsed={collapsed} onExpand={() => setAndStoreCollapsed(false)} />
      </aside>

      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Navigation">
          <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm" onClick={() => setDrawerOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-72 max-w-[85vw] animate-fade-in border-r border-border bg-card shadow-sidebar">
            <button
              type="button"
              className="absolute right-3 top-3.5 z-10 flex h-9 w-9 items-center justify-center rounded-[10px] text-muted-foreground hover:bg-muted hover:text-foreground"
              aria-label="Close menu"
              onClick={() => setDrawerOpen(false)}
            >
              <X className="h-4 w-4" />
            </button>
            <Sidebar {...sidebarProps} onNavigate={() => setDrawerOpen(false)} />
          </aside>
        </div>
      )}

      <div data-print-root className="flex min-w-0 flex-1 flex-col">
        <div data-print-hide>
          <Topbar
            nav={nav}
            onToggleSidebar={toggleSidebar}
            sidebarCollapsed={collapsed}
            start={topbarStart}
            actions={topbarActions}
            user={user}
            userMenu={userMenu}
          />
        </div>
        <main ref={content} id="content" className="scrollbar-thin min-w-0 flex-1 overflow-y-auto overflow-x-clip p-4 sm:p-5">
          {banner && <div data-print-hide>{banner}</div>}
          <div className="animate-fade-in">{children}</div>
        </main>
        {footer !== null && <div data-print-hide>{footer ?? <AppFooter name={brand.name} />}</div>}
      </div>
    </div>
  );
}
