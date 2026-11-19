import { Badge, type BadgeTone } from "./badge";
import { cn } from "@/lib/utils";

const DOT: Record<BadgeTone, string> = {
  neutral: "bg-muted-foreground",
  primary: "bg-primary",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
};

/** A small coloured dot; `pulse` adds a ring that draws the eye (e.g. something is down). */
export function StatusDot({ tone, pulse = false, className }: { tone: BadgeTone; pulse?: boolean; className?: string }) {
  return (
    <span className={cn("relative inline-flex h-2 w-2", className)} aria-hidden>
      {pulse && <span className={cn("absolute inset-0 rounded-full animate-pulse-ring", DOT[tone])} />}
      <span className={cn("relative h-2 w-2 rounded-full", DOT[tone])} />
    </span>
  );
}

/**
 * A labelled status chip with a dot. Status is never shown by colour alone:
 * always pass a label ("Active", "Pending", "Failed", ...).
 */
export function StatusBadge({ tone, label, pulse = false }: { tone: BadgeTone; label: string; pulse?: boolean }) {
  return (
    <Badge tone={tone}>
      <StatusDot tone={tone} pulse={pulse} />
      {label}
    </Badge>
  );
}

export type Severity = "info" | "low" | "medium" | "high" | "critical";

const SEVERITY_TONE: Record<Severity, BadgeTone> = {
  info: "neutral",
  low: "neutral",
  medium: "warning",
  high: "danger",
  critical: "danger",
};

/** Priority / severity chip; `critical` is filled for emphasis. */
export function SeverityBadge({ severity }: { severity: Severity }) {
  return (
    <Badge tone={SEVERITY_TONE[severity]} className={cn("capitalize", severity === "critical" && "bg-danger text-white")}>
      {severity}
    </Badge>
  );
}
