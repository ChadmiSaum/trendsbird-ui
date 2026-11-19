import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

/** The product shown at the top of the sidebar and on the sign-in screen. */
export interface Brand {
  name: string;
  /** Where the logo links to. Default "/". */
  href?: string;
  /** Your logo (an <img> or SVG). Without one, a brand-blue tile with `icon` (or the first letter) is shown. */
  logo?: ReactNode;
  icon?: LucideIcon;
}

/** The signed-in person, shown in the sidebar's account card and the top bar's account menu. */
export interface ShellUser {
  name: string;
  email?: string;
  /** A second line in the account menu, e.g. "Admin · Acme Ltd". */
  subtitle?: string;
}

/** An entry in the account menu: a link, or an action. */
export interface UserMenuItem {
  label: string;
  icon?: LucideIcon;
  href?: string;
  onClick?: () => void;
  /** Red styling, e.g. for "Sign out". */
  danger?: boolean;
}
