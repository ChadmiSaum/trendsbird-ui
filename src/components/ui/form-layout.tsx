import { ChevronRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Card, CardHeader } from "./card";

/**
 * Building blocks for full-page forms (Add site, Add monitor, New plan, ...).
 * Long forms get a page of their own instead of a dialog: each group of
 * fields is a titled section, and the actions stay in reach at the bottom.
 */

/** A titled group of fields. `action` sits at the right of the title (e.g. "Select all"). */
export function FormSection({
  title,
  description,
  action,
  children,
  className,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Card className={className}>
      <CardHeader title={title} description={description} action={action} />
      <div className="space-y-4 p-5">{children}</div>
    </Card>
  );
}

/** Two columns of fields from `sm` up; one on phones. */
export function FieldGrid({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("grid gap-4 sm:grid-cols-2", className)}>{children}</div>;
}

/** The action bar at the end of a form page (in the page flow, so it never covers fields). */
export function FormFooter({ children, note }: { children: ReactNode; note?: ReactNode }) {
  return (
    <div className="mt-5 flex flex-wrap items-center justify-end gap-2 rounded-xl border border-border bg-card px-4 py-3">
      {note && <div className="mr-auto min-w-0 text-xs text-muted-foreground">{note}</div>}
      {children}
    </div>
  );
}

/** "Sites › Add a site" under a page title. The last crumb is the current page. */
export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mt-1.5 flex flex-wrap items-center gap-1 text-[13px] text-muted-foreground">
      {items.map((c, i) => (
        <span key={c.label} className="flex items-center gap-1">
          {i > 0 && <ChevronRight className="h-3.5 w-3.5" aria-hidden />}
          {c.href ? (
            <Link href={c.href} className="hover:text-foreground hover:underline">
              {c.label}
            </Link>
          ) : (
            <span aria-current={i === items.length - 1 ? "page" : undefined} className={i === items.length - 1 ? "text-primary" : undefined}>
              {c.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
