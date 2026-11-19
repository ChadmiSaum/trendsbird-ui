"use client";

import { ChevronRight, LogOut, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode, useState } from "react";
import { cn, initials } from "@/lib/utils";
import { isFolder, isNavActive, type NavItem } from "./nav";
import type { Brand, ShellUser } from "./types";

const rowBase = "flex w-full items-center gap-3 rounded-[13px] text-left text-[13px] transition-colors";

function IconTile({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[13px] bg-sidebar-icon text-sidebar-icon-foreground shadow-tile ring-1 ring-black/5">
      <Icon className="h-5 w-5" />
    </span>
  );
}

function Tag({ children }: { children: ReactNode }) {
  return <span className="shrink-0 rounded-[4px] bg-muted px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">{children}</span>;
}

function BrandMark({ brand }: { brand: Brand }) {
  if (brand.logo) return <>{brand.logo}</>;
  const Icon = brand.icon;
  return (
    <span className="flex h-9 w-9 items-center justify-center rounded-[13px] bg-brand text-sm font-bold text-brand-foreground shadow-tile">
      {Icon ? <Icon className="h-5 w-5" /> : brand.name.slice(0, 1).toUpperCase()}
    </span>
  );
}

export interface SidebarProps {
  brand: Brand;
  nav: NavItem[];
  user?: ShellUser;
  onSignOut?: () => void;
  /** Extra content above the account card, e.g. a plan or usage card. Hidden when collapsed. */
  extra?: ReactNode;
  /** Icons only (desktop rail). The mobile drawer always passes false. */
  collapsed?: boolean;
  /** Called when a folder is chosen in the collapsed rail, so its pages can be shown. */
  onExpand?: () => void;
  /** Called after a link is followed (the mobile drawer closes itself with it). */
  onNavigate?: () => void;
}

/** Sidebar contents: logo, menu (pages and folders), an optional extra card and the account card. */
export function Sidebar({ brand, nav, user, onSignOut, extra, collapsed = false, onExpand, onNavigate }: SidebarProps) {
  const pathname = usePathname();
  // Folders opened or closed by hand; the rest follow the route.
  const [toggled, setToggled] = useState<Record<string, boolean>>({});

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 shrink-0 items-center justify-center border-b border-border px-3.5">
        <Link href={brand.href ?? "/"} onClick={onNavigate} aria-label={`${brand.name} home`} className="flex items-center gap-2.5">
          <BrandMark brand={brand} />
          {!collapsed && !brand.logo && <span className="text-base font-semibold tracking-tight text-foreground">{brand.name}</span>}
        </Link>
      </div>

      <nav aria-label="Primary" className={cn("scrollbar-none flex-1 overflow-y-auto py-4", collapsed ? "px-2" : "px-3")}>
        <ul className={cn(collapsed ? "space-y-2" : "space-y-1")}>
          {nav.map((item) => {
            if (!isFolder(item)) {
              const active = isNavActive(item.href, pathname);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    title={collapsed ? item.label : undefined}
                    aria-label={collapsed ? item.label : undefined}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      rowBase,
                      active ? "bg-brand font-semibold text-brand-foreground" : "text-foreground hover:bg-muted",
                      collapsed ? "mx-auto h-12 w-12 justify-center p-0" : "h-[47px] px-2",
                    )}
                  >
                    <IconTile icon={item.icon} />
                    {!collapsed && <span className="flex-1 truncate">{item.label}</span>}
                    {!collapsed && item.tag && <Tag>{item.tag}</Tag>}
                  </Link>
                </li>
              );
            }

            const branchActive = item.children.some((l) => isNavActive(l.href, pathname));
            const open = !collapsed && (toggled[item.label] ?? branchActive);
            const panelId = `nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`;
            return (
              <li key={item.label}>
                <button
                  type="button"
                  onClick={() => {
                    if (collapsed) {
                      // The rail has no room for the pages: widen the sidebar and open this folder.
                      setToggled((t) => ({ ...t, [item.label]: true }));
                      onExpand?.();
                      return;
                    }
                    setToggled((t) => ({ ...t, [item.label]: !open }));
                  }}
                  title={collapsed ? item.label : undefined}
                  aria-label={collapsed ? item.label : undefined}
                  aria-expanded={collapsed ? undefined : open}
                  aria-controls={collapsed ? undefined : panelId}
                  className={cn(
                    rowBase,
                    branchActive ? "bg-brand font-semibold text-brand-foreground" : "text-foreground hover:bg-muted",
                    collapsed ? "mx-auto h-12 w-12 justify-center p-0" : "h-[47px] px-2",
                  )}
                >
                  <IconTile icon={item.icon} />
                  {!collapsed && (
                    <>
                      <span className="flex-1 truncate">{item.label}</span>
                      <ChevronRight className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-90")} aria-hidden />
                    </>
                  )}
                </button>

                {open && (
                  <ul id={panelId} className="ml-8 mt-1 space-y-1">
                    {item.children.map((child) => {
                      const active = isNavActive(child.href, pathname);
                      return (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={onNavigate}
                            aria-current={active ? "page" : undefined}
                            className={cn(
                              rowBase,
                              "h-[41px] px-4",
                              active ? "font-semibold text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground",
                            )}
                          >
                            <span className="flex-1 truncate">{child.label}</span>
                            {child.tag && <Tag>{child.tag}</Tag>}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {extra && !collapsed && <div className="mx-3 mb-3">{extra}</div>}

      {user && (
        <div className={cn("shrink-0 border-t border-border py-3", collapsed ? "px-2" : "px-3")}>
          {collapsed ? (
            <div className="flex flex-col items-center gap-2">
              <span title={user.name} className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-sm font-semibold text-brand-foreground">
                {initials(user.name, user.email)}
              </span>
              {onSignOut && (
                <button
                  type="button"
                  onClick={onSignOut}
                  aria-label="Sign out"
                  title="Sign out"
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-danger-soft hover:text-danger"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3 rounded-[13px] bg-brand px-3 py-2.5 text-brand-foreground">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-sm font-semibold">
                {initials(user.name, user.email)}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{user.name}</p>
                {user.email && <p className="truncate text-xs text-white/70">{user.email}</p>}
              </div>
              {onSignOut && (
                <button
                  type="button"
                  onClick={onSignOut}
                  aria-label="Sign out"
                  title="Sign out"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition hover:bg-white/15"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
