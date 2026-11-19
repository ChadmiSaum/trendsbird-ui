import type { LucideIcon } from "lucide-react";

/** A page in the menu. Inside a folder the icon is optional (children show as text). */
export interface NavLink {
  href: string;
  label: string;
  icon?: LucideIcon;
  /** A small tag after the label, e.g. "New" or "Beta". */
  tag?: string;
}

/** A folder that opens in place to show its pages. */
export interface NavFolder {
  label: string;
  icon: LucideIcon;
  children: NavLink[];
}

/** One row of the sidebar: a top-level page (with an icon) or a folder. */
export type NavItem = (NavLink & { icon: LucideIcon }) | NavFolder;

export const isFolder = (item: NavItem): item is NavFolder => "children" in item;

/** Whether a link is the current page: exact for "/", and the page or anything beneath it otherwise. */
export function isNavActive(href: string, pathname: string): boolean {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

/** Every page in the menu, folder pages labelled "Folder › Page" (used by quick search). */
export function navPages(items: NavItem[]): { href: string; label: string; icon: LucideIcon }[] {
  return items.flatMap((item) =>
    isFolder(item)
      ? item.children.map((c) => ({ href: c.href, label: `${item.label} › ${c.label}`, icon: c.icon ?? item.icon }))
      : [{ href: item.href, label: item.label, icon: item.icon }],
  );
}
