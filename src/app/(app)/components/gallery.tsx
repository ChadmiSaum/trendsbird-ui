"use client";

import { Download, Inbox, Mail, Plus, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { BulkBar, Checkbox, useSelection } from "@/components/ui/bulk";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Dialog } from "@/components/ui/dialog";
import { EmptyState } from "@/components/ui/empty-state";
import { Field, Select, Textarea } from "@/components/ui/field";
import { FieldGrid } from "@/components/ui/form-layout";
import { Input } from "@/components/ui/input";
import { Meter } from "@/components/ui/meter";
import { Notice } from "@/components/ui/notice";
import { Sparkline } from "@/components/ui/sparkline";
import { SeverityBadge, StatusBadge } from "@/components/ui/status";
import { Switch } from "@/components/ui/switch";
import { Tabs } from "@/components/ui/tabs";

const rows = [
  { id: "1", name: "Invoice #1042", amount: "৳ 24,000" },
  { id: "2", name: "Invoice #1043", amount: "৳ 8,500" },
  { id: "3", name: "Invoice #1044", amount: "৳ 61,200" },
];

function Section({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <Card>
      <CardHeader title={title} description={description} />
      <CardContent className="space-y-4">{children}</CardContent>
    </Card>
  );
}

export function Gallery() {
  const [dialog, setDialog] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [emails, setEmails] = useState(true);
  const [sms, setSms] = useState(false);
  const sel = useSelection(rows.map((r) => r.id));

  return (
    <>
      <PageHeader title="Components" description="Every building block in the kit, in light and dark." />

      <div className="grid gap-5 xl:grid-cols-2">
        <Section title="Buttons" description="primary · secondary · ghost · danger, in sm · md · lg · icon">
          <div className="flex flex-wrap items-center gap-2">
            <Button><Plus className="h-4 w-4" /> Primary</Button>
            <Button variant="secondary"><Download className="h-4 w-4" /> Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger"><Trash2 className="h-4 w-4" /> Danger</Button>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button size="icon" variant="secondary" aria-label="Search"><Search className="h-4 w-4" /></Button>
            <Button disabled>Disabled</Button>
          </div>
        </Section>

        <Section title="Badges & status" description="Status is never shown by colour alone: every chip has a label.">
          <div className="flex flex-wrap gap-2">
            <Badge>Neutral</Badge>
            <Badge tone="primary">Primary</Badge>
            <Badge tone="success">Success</Badge>
            <Badge tone="warning">Warning</Badge>
            <Badge tone="danger">Danger</Badge>
          </div>
          <div className="flex flex-wrap gap-2">
            <StatusBadge tone="success" label="Active" />
            <StatusBadge tone="warning" label="Pending" />
            <StatusBadge tone="danger" label="Down" pulse />
            <StatusBadge tone="neutral" label="Paused" />
          </div>
          <div className="flex flex-wrap gap-2">
            <SeverityBadge severity="info" />
            <SeverityBadge severity="low" />
            <SeverityBadge severity="medium" />
            <SeverityBadge severity="high" />
            <SeverityBadge severity="critical" />
          </div>
        </Section>

        <Section title="Inputs & fields">
          <FieldGrid>
            <Field label="Full name" htmlFor="g-name">
              <Input id="g-name" placeholder="Jane Doe" />
            </Field>
            <Field label="Email" htmlFor="g-email" hint="We never share it.">
              <Input id="g-email" type="email" icon={<Mail />} placeholder="jane@company.com" />
            </Field>
            <Field label="Role" htmlFor="g-role">
              <Select id="g-role" defaultValue="editor">
                <option value="admin">Admin</option>
                <option value="editor">Editor</option>
                <option value="viewer">Viewer</option>
              </Select>
            </Field>
            <Field label="Phone" htmlFor="g-phone" error="Enter a number like +880 1700-000000.">
              <Input id="g-phone" aria-invalid defaultValue="12345" />
            </Field>
          </FieldGrid>
          <Field label="Notes" htmlFor="g-notes">
            <Textarea id="g-notes" placeholder="Anything we should know?" />
          </Field>
        </Section>

        <Section title="Switches, meters & sparkline">
          <div className="space-y-3">
            <label className="flex items-center justify-between gap-4 text-sm">
              Email notifications <Switch label="Email notifications" checked={emails} onChange={setEmails} />
            </label>
            <label className="flex items-center justify-between gap-4 text-sm">
              SMS notifications <Switch label="SMS notifications" checked={sms} onChange={setSms} />
            </label>
            <label className="flex items-center justify-between gap-4 text-sm text-muted-foreground">
              Locked setting <Switch label="Locked setting" checked disabled onChange={() => {}} />
            </label>
          </div>
          <Meter label="Storage used" value={64} />
          <Meter label="Monthly quota" value={91} />
          <Sparkline data={[12, 18, 14, 22, 19, 27, 31, 26, 35]} className="h-12" />
        </Section>

        <Section title="Dialogs" description="Short forms open in a dialog; long forms get a page (see Form page).">
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => setDialog(true)}>Open dialog</Button>
            <Button variant="danger" onClick={() => setConfirm(true)}>Delete something</Button>
          </div>
          <Dialog open={dialog} onClose={() => setDialog(false)} title="Invite a member" description="They get an email with a link to join.">
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                setDialog(false);
              }}
            >
              <Field label="Email" htmlFor="d-email">
                <Input id="d-email" type="email" placeholder="jane@company.com" />
              </Field>
              <Field label="Role" htmlFor="d-role">
                <Select id="d-role" defaultValue="viewer">
                  <option value="admin">Admin</option>
                  <option value="viewer">Viewer</option>
                </Select>
              </Field>
              <div className="flex justify-end gap-2 border-t border-border pt-4">
                <Button variant="secondary" onClick={() => setDialog(false)}>Cancel</Button>
                <Button type="submit">Send invite</Button>
              </div>
            </form>
          </Dialog>
          <ConfirmDialog
            open={confirm}
            onClose={() => setConfirm(false)}
            onConfirm={() => {}}
            title="Delete this project?"
            description="Its files and history are removed. This can't be undone."
            confirmLabel="Delete project"
            destructive
          />
        </Section>

        <Section title="Notices">
          <Notice title="Heads up">Plain information for the current page.</Notice>
          <Notice tone="success" title="Saved">Your changes are live.</Notice>
          <Notice tone="warning" title="Plan limit almost reached">You have used 23 of 25 projects.</Notice>
          <Notice tone="danger" title="Payment failed">Update your card to keep the service running.</Notice>
        </Section>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-2">
        <Card className="overflow-hidden">
          <CardHeader title="Table with bulk actions" description="Tick rows to show the action bar." />
          <div className="p-5 pb-0">
            <BulkBar count={sel.count} noun="invoice" onClear={sel.clear}>
              <Button size="sm" variant="secondary"><Download className="h-4 w-4" /> Export</Button>
              <Button size="sm" variant="danger"><Trash2 className="h-4 w-4" /> Delete</Button>
            </BulkBar>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="w-10 py-3 pl-5"><Checkbox label="Select all" checked={sel.allSelected} indeterminate={sel.someSelected} onChange={sel.toggleAll} /></th>
                <th className="px-3 py-3">Invoice</th>
                <th className="px-5 py-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((r) => (
                <tr key={r.id} className="hover:bg-muted/40">
                  <td className="py-3 pl-5"><Checkbox label={`Select ${r.name}`} checked={sel.isSelected(r.id)} onChange={(v) => sel.toggle(r.id, v)} /></td>
                  <td className="px-3 py-3 font-medium">{r.name}</td>
                  <td className="px-5 py-3 text-right tabular-nums">{r.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <div>
          <Tabs
            items={[
              { id: "overview", label: "Overview", content: <Card className="p-5 text-sm text-muted-foreground">Tabs keep related views on one page.</Card> },
              { id: "activity", label: "Activity", content: <Card className="p-5 text-sm text-muted-foreground">Recent changes would be listed here.</Card> },
              {
                id: "empty",
                label: "Empty state",
                content: <EmptyState icon={Inbox} title="No messages yet" description="When customers write to you, their messages appear here." action={<Button size="sm"><Plus className="h-4 w-4" /> New message</Button>} />,
              },
            ]}
          />
        </div>
      </div>
    </>
  );
}
