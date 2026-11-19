import type { ReactNode } from "react";

/** The bar at the top of a page: title, a line of context, and the page's actions on the right. */
export function PageHeader({
  title,
  description,
  actions,
  children,
}: {
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  /** Extra lines under the description, such as an error. */
  children?: ReactNode;
}) {
  return (
    <div className="relative mb-5 flex flex-col gap-3 rounded-xl border border-border bg-card px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <span aria-hidden className="absolute left-0 top-1/2 h-[34px] w-1 -translate-y-1/2 rounded-sm bg-accent" />
      <div className="min-w-0">
        <h1 className="flex flex-wrap items-center gap-3 text-base font-semibold leading-tight text-foreground">{title}</h1>
        {description && <p className="mt-1.5 text-[13px] font-light text-muted-foreground">{description}</p>}
        {children}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}
