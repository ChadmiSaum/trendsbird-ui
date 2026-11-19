import { Info, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const TONES = {
  neutral: { box: "border-border bg-muted/60", icon: "text-muted-foreground" },
  info: { box: "border-primary/25 bg-primary-soft", icon: "text-primary" },
  success: { box: "border-success/30 bg-success-soft", icon: "text-success" },
  warning: { box: "border-warning/30 bg-warning-soft", icon: "text-warning" },
  danger: { box: "border-danger/30 bg-danger-soft", icon: "text-danger" },
} as const;

/** An inline message box for a page or section: a title and an optional explanation. */
export function Notice({
  title,
  children,
  tone = "neutral",
  icon: Icon = Info,
  className,
}: {
  title: ReactNode;
  children?: ReactNode;
  tone?: keyof typeof TONES;
  icon?: LucideIcon;
  className?: string;
}) {
  const t = TONES[tone];
  return (
    <div role={tone === "danger" ? "alert" : "note"} className={cn("flex items-start gap-3 rounded-lg border p-4 text-sm", t.box, className)}>
      <Icon className={cn("mt-0.5 h-4 w-4 shrink-0", t.icon)} aria-hidden />
      <div className="min-w-0">
        <p className="font-medium text-foreground">{title}</p>
        {children && <div className="mt-0.5 text-muted-foreground">{children}</div>}
      </div>
    </div>
  );
}
