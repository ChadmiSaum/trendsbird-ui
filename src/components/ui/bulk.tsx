"use client";

import { X } from "lucide-react";
import { type ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "./button";

/**
 * Row selection for tables with bulk actions. Selection is kept to ids that are
 * still visible, so filtering or deleting rows never leaves hidden rows selected.
 */
export function useSelection(visibleIds: string[]) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const visible = useMemo(() => new Set(visibleIds), [visibleIds]);
  const current = useMemo(() => new Set([...selected].filter((id) => visible.has(id))), [selected, visible]);
  const allSelected = visibleIds.length > 0 && visibleIds.every((id) => current.has(id));
  return {
    selected: current,
    count: current.size,
    allSelected,
    someSelected: current.size > 0 && !allSelected,
    isSelected: (id: string) => current.has(id),
    toggle: (id: string, on?: boolean) =>
      setSelected((s) => {
        const next = new Set(s);
        if (on ?? !next.has(id)) next.add(id);
        else next.delete(id);
        return next;
      }),
    /** Select or clear a group of rows (e.g. every row in one group). */
    setMany: (ids: string[], on: boolean) =>
      setSelected((s) => {
        const next = new Set(s);
        for (const id of ids) {
          if (on) next.add(id);
          else next.delete(id);
        }
        return next;
      }),
    toggleAll: () => setSelected(allSelected ? new Set() : new Set(visibleIds)),
    clear: () => setSelected(new Set()),
  };
}

/** Checkbox with an indeterminate ("some selected") state. */
export function Checkbox({ checked, indeterminate = false, onChange, label }: { checked: boolean; indeterminate?: boolean; onChange: (v: boolean) => void; label: string }) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (ref.current) ref.current.indeterminate = indeterminate;
  }, [indeterminate]);
  return (
    <input
      ref={ref}
      type="checkbox"
      aria-label={label}
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      onClick={(e) => e.stopPropagation()}
      className="h-4 w-4 shrink-0 cursor-pointer rounded border-border accent-[hsl(var(--primary))]"
    />
  );
}

/** Sticky bar shown while rows are selected. */
export function BulkBar({ count, noun, onClear, children, busy }: { count: number; noun: string; onClear: () => void; children: ReactNode; busy?: boolean }) {
  if (count === 0) return null;
  return (
    <div role="toolbar" aria-label="Bulk actions" className="sticky top-0 z-20 mb-3 flex flex-wrap items-center gap-2 rounded-xl border border-primary/30 bg-primary-soft px-4 py-2.5 shadow-card">
      <span className="text-sm font-medium text-primary">
        {count} {noun}
        {count === 1 ? "" : "s"} selected
      </span>
      <div className="flex flex-wrap items-center gap-1.5">{children}</div>
      <Button size="sm" variant="ghost" className="ml-auto" onClick={onClear} disabled={busy} aria-label="Clear selection">
        <X className="h-4 w-4" /> Clear
      </Button>
    </div>
  );
}

/**
 * Runs `fn` for each item, a few at a time, through the normal per-item API
 * (same permission checks and audit entries as single actions). Returns the
 * ids that succeeded and the first error message, if any.
 */
export async function runBulk<T extends { id: string }, R>(items: T[], fn: (item: T) => Promise<R>, concurrency = 4): Promise<{ done: Map<string, R>; failed: number; firstError: string | null }> {
  const done = new Map<string, R>();
  let failed = 0;
  let firstError: string | null = null;
  const queue = [...items];
  await Promise.all(
    Array.from({ length: Math.min(concurrency, queue.length) }, async () => {
      for (let item = queue.shift(); item; item = queue.shift()) {
        try {
          done.set(item.id, await fn(item));
        } catch (err) {
          failed++;
          firstError ??= err instanceof Error ? err.message : "Something went wrong";
        }
      }
    }),
  );
  return { done, failed, firstError };
}
