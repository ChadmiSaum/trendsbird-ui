import type { LucideIcon } from "lucide-react";
import { Card } from "./card";
import { Sparkline } from "./sparkline";

export function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  series,
}: {
  label: string;
  value: string;
  hint?: string;
  icon: LucideIcon;
  series?: number[];
}) {
  return (
    <Card className="p-5">
      <div className="flex items-center gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary">
          <Icon className="h-6 w-6" />
        </span>
        <div className="min-w-0">
          <p className="text-sm leading-6 text-muted-foreground">{label}</p>
          <p className="text-xl font-semibold leading-8 tabular-nums text-foreground">{value}</p>
          {hint && <p className="text-[11px] leading-4 text-muted-foreground">{hint}</p>}
        </div>
      </div>
      {series && <Sparkline data={series} className="mt-3" />}
    </Card>
  );
}
