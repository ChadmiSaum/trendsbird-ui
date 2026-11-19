"use client";

import { useId, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
}

export function Tabs({ items, defaultId }: { items: TabItem[]; defaultId?: string }) {
  // An unknown id (e.g. from a URL) falls back to the first tab.
  const [active, setActive] = useState(items.some((t) => t.id === defaultId) ? defaultId : items[0]?.id);
  const base = useId();

  return (
    <div>
      <div role="tablist" className="scrollbar-none mb-4 flex h-12 items-stretch gap-1 overflow-x-auto rounded-xl border border-border bg-card px-1">
        {items.map((t) => {
          const selected = t.id === active;
          return (
            <button
              key={t.id}
              role="tab"
              id={`${base}-tab-${t.id}`}
              aria-selected={selected}
              aria-controls={`${base}-panel-${t.id}`}
              onClick={() => setActive(t.id)}
              className={cn(
                "relative shrink-0 whitespace-nowrap px-5 text-[13px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
                selected
                  ? "font-semibold text-primary after:absolute after:inset-x-2 after:bottom-0 after:h-0.5 after:rounded-full after:bg-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {t.label}
            </button>
          );
        })}
      </div>
      {items.map((t) =>
        t.id === active ? (
          <div key={t.id} role="tabpanel" id={`${base}-panel-${t.id}`} aria-labelledby={`${base}-tab-${t.id}`} className="animate-fade-in">
            {t.content}
          </div>
        ) : null,
      )}
    </div>
  );
}
