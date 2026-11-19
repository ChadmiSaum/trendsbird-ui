import { Activity, FolderKanban, Plus, Users, Wallet } from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Meter } from "@/components/ui/meter";
import { StatCard } from "@/components/ui/stat-card";
import { SeverityBadge, StatusBadge } from "@/components/ui/status";

export const metadata = { title: "Dashboard" };

const projects = [
  { name: "Acme Store redesign", owner: "Rahim", status: { tone: "success", label: "Live" }, priority: "low", due: "Nov 28" },
  { name: "Lira Import ERP", owner: "Nadia", status: { tone: "warning", label: "In review" }, priority: "high", due: "Dec 02" },
  { name: "Winter campaign ads", owner: "Tanvir", status: { tone: "primary", label: "Planned" }, priority: "medium", due: "Dec 10" },
  { name: "Payment gateway", owner: "Sadia", status: { tone: "danger", label: "Blocked" }, priority: "critical", due: "Nov 21" },
] as const;

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        title="Welcome back, Dana"
        description="Here's what is happening across your projects today."
        actions={
          <Link href="/forms" className={buttonVariants()}>
            <Plus className="h-4 w-4" /> New project
          </Link>
        }
      />

      <div className="mb-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active projects" value="12" hint="3 due this week" icon={FolderKanban} series={[4, 6, 5, 8, 7, 10, 12]} />
        <StatCard label="Team members" value="28" hint="2 joined this month" icon={Users} />
        <StatCard label="Revenue · Nov" value="৳ 8.4 L" hint="+12% on October" icon={Wallet} series={[3, 4, 4, 5, 6, 6, 8]} />
        <StatCard label="Uptime · 30 days" value="99.97%" hint="1 incident" icon={Activity} />
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_340px]">
        <Card className="overflow-hidden">
          <CardHeader title="Projects" description="Everything in progress, by due date." action={<Badge tone="primary">{projects.length} open</Badge>} />
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-5 py-3">Project</th>
                  <th className="px-3 py-3">Owner</th>
                  <th className="px-3 py-3">Status</th>
                  <th className="px-3 py-3">Priority</th>
                  <th className="px-5 py-3 text-right">Due</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {projects.map((p) => (
                  <tr key={p.name} className="transition-colors hover:bg-muted/40">
                    <td className="px-5 py-3 font-medium">{p.name}</td>
                    <td className="px-3 py-3 text-muted-foreground">{p.owner}</td>
                    <td className="px-3 py-3"><StatusBadge tone={p.status.tone} label={p.status.label} pulse={p.status.tone === "danger"} /></td>
                    <td className="px-3 py-3"><SeverityBadge severity={p.priority} /></td>
                    <td className="px-5 py-3 text-right tabular-nums text-muted-foreground">{p.due}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <CardHeader title="Capacity" description="How busy each team is." />
          <CardContent className="space-y-4">
            <Meter label="Development" value={86} />
            <Meter label="Design" value={72} />
            <Meter label="Marketing" value={54} />
            <Meter label="Support" value={31} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
