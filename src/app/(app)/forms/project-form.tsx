"use client";

import { ArrowLeft, Bell, CheckCircle2, Clock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Field, Select, Textarea } from "@/components/ui/field";
import { Breadcrumb, FieldGrid, FormFooter, FormSection } from "@/components/ui/form-layout";
import { Input } from "@/components/ui/input";
import { Notice } from "@/components/ui/notice";
import { Switch } from "@/components/ui/switch";

/**
 * A long form as a page: titled sections, a side panel and an action bar at the
 * end. Short forms (a few fields) belong in a Dialog instead.
 */
export function ProjectForm() {
  const router = useRouter();
  const [errors, setErrors] = useState<{ name?: string }>({});
  const [notify, setNotify] = useState(true);
  const [saved, setSaved] = useState(false);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = String(new FormData(e.currentTarget).get("name") ?? "").trim();
    if (name.length < 2) return setErrors({ name: "Enter a name of at least 2 characters." });
    setErrors({});
    setSaved(true);
    document.getElementById("content")?.scrollTo({ top: 0 });
  };

  return (
    <>
      <PageHeader
        title="New project"
        description="Long forms get their own page: sections, a side panel and actions at the end."
        actions={
          <Link href="/" className={buttonVariants({ variant: "secondary" })}>
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>
        }
      >
        <Breadcrumb items={[{ label: "Dashboard", href: "/" }, { label: "New project" }]} />
      </PageHeader>

      {saved && (
        <Notice tone="success" icon={CheckCircle2} title="Project created" className="mb-5">
          This is a demo, so nothing was stored. <button className="font-medium text-primary hover:underline" onClick={() => router.push("/")}>Back to the dashboard</button>
        </Notice>
      )}

      <form onSubmit={submit} noValidate>
        <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-5">
            <FormSection title="Project details" description="The name is how the project appears in lists.">
              <FieldGrid>
                <Field label="Project name" htmlFor="p-name" error={errors.name}>
                  <Input id="p-name" name="name" placeholder="Acme Store redesign" aria-invalid={!!errors.name} />
                </Field>
                <Field label="Client" htmlFor="p-client">
                  <Input id="p-client" name="client" placeholder="Acme Ltd" />
                </Field>
                <Field label="Type" htmlFor="p-type">
                  <Select id="p-type" name="type" defaultValue="website">
                    <option value="website">Website</option>
                    <option value="software">Software</option>
                    <option value="marketing">Digital marketing</option>
                  </Select>
                </Field>
                <Field label="Budget (৳)" htmlFor="p-budget">
                  <Input id="p-budget" name="budget" inputMode="numeric" placeholder="250000" />
                </Field>
              </FieldGrid>
              <Field label="Brief" htmlFor="p-brief" hint="A few lines about the goal.">
                <Textarea id="p-brief" name="brief" placeholder="What should this project achieve?" />
              </Field>
            </FormSection>

            <FormSection title="Schedule">
              <FieldGrid>
                <Field label="Start date" htmlFor="p-start">
                  <Input id="p-start" name="start" type="date" />
                </Field>
                <Field label="Due date" htmlFor="p-due">
                  <Input id="p-due" name="due" type="date" />
                </Field>
              </FieldGrid>
            </FormSection>

            <FormSection title="Notifications">
              <label className="flex items-center justify-between gap-4 text-sm">
                Email the team when the status changes
                <Switch label="Email the team when the status changes" checked={notify} onChange={setNotify} />
              </label>
            </FormSection>
          </div>

          <aside className="space-y-5 xl:sticky xl:top-0">
            <Card>
              <CardHeader title="What happens next" />
              <ul className="space-y-3 p-5 text-[13px] text-muted-foreground">
                <li className="flex gap-2.5"><Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> The project appears on the dashboard right away.</li>
                <li className="flex gap-2.5"><Bell className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> The team is notified if you keep notifications on.</li>
              </ul>
            </Card>
          </aside>
        </div>

        <FormFooter note="Fields can be changed later.">
          <Link href="/" className={buttonVariants({ variant: "secondary" })}>Cancel</Link>
          <Button type="submit">Create project</Button>
        </FormFooter>
      </form>
    </>
  );
}
