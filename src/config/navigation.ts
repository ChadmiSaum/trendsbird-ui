import { Bird, LayoutDashboard, LayoutTemplate, Shapes } from "lucide-react";
import type { NavItem } from "@/components/layout/nav";
import type { Brand } from "@/components/layout/types";

/** Your product. Pass `logo` (an <img>) to use your own logo instead of the tile. */
export const brand: Brand = { name: "Trends Bird", href: "/", icon: Bird };

/**
 * The sidebar menu. A top-level item needs an icon; a folder lists `children`
 * that open in place. Quick search (Ctrl/⌘ K) uses the same list.
 */
export const nav: NavItem[] = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/components", label: "Components", icon: Shapes },
  {
    label: "Pages",
    icon: LayoutTemplate,
    children: [
      { href: "/forms", label: "Form page" },
      { href: "/login", label: "Sign-in screen", tag: "Demo" },
    ],
  },
];
