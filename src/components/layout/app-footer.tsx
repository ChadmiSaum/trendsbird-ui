import { cn } from "@/lib/utils";

/** The strip under every page: copyright on the left, an optional credit link on the right. */
export function AppFooter({
  name,
  credit = { label: "Trends Bird Limited", href: "https://trendsbird.com/" },
  className,
}: {
  /** Shown after the year: "© 2026 {name}. All Rights Reserved." */
  name: string;
  /** "Developed by …" on the right; pass null to hide it. */
  credit?: { label: string; href: string } | null;
  className?: string;
}) {
  return (
    <footer className={cn("relative shrink-0 border-t border-border bg-card px-6 py-3.5", className)}>
      <div className="flex flex-col items-center justify-between gap-2 text-xs font-medium leading-none text-foreground sm:flex-row">
        <p className="text-center sm:text-left">
          © {new Date().getFullYear()} <span className="font-semibold text-primary">{name}</span>. All Rights Reserved.
        </p>
        {credit && (
          <p className="text-center sm:text-right">
            Developed by{" "}
            <a href={credit.href} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-orange hover:underline">
              {credit.label}
            </a>
          </p>
        )}
      </div>
    </footer>
  );
}
