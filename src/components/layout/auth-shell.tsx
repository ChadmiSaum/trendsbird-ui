import type { ReactNode } from "react";
import type { Brand } from "./types";

function Logo({ brand, large = false }: { brand: Brand; large?: boolean }) {
  if (brand.logo) return <>{brand.logo}</>;
  const Icon = brand.icon;
  return (
    <span className="flex items-center gap-2.5">
      <span className={`flex items-center justify-center rounded-[13px] bg-white/15 font-bold ${large ? "h-11 w-11" : "h-9 w-9"}`}>
        {Icon ? <Icon className={large ? "h-6 w-6" : "h-5 w-5"} /> : brand.name.slice(0, 1).toUpperCase()}
      </span>
      <span className={`font-semibold tracking-tight ${large ? "text-xl" : "text-lg"}`}>{brand.name}</span>
    </span>
  );
}

/**
 * Two-panel card for sign-in, sign-up and invitation pages: a curved brand
 * panel on the left, the form on the right. On phones the brand panel becomes
 * a banner above the form.
 */
export function AuthShell({
  brand,
  headline,
  tagline,
  title,
  subtitle,
  children,
}: {
  brand: Brand;
  /** Big text on the brand panel. */
  headline?: ReactNode;
  /** A line under the headline (and on the mobile banner). */
  tagline?: ReactNode;
  /** Above the form, e.g. "Welcome back". */
  title: string;
  subtitle?: ReactNode;
  children: ReactNode;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-surface p-4 sm:p-6">
      <section className="relative flex w-full max-w-4xl animate-fade-in flex-col overflow-hidden rounded-[30px] border border-border/60 bg-card shadow-2xl md:min-h-[500px] md:flex-row md:rounded-[40px]">
        <div className="flex flex-col items-center gap-3 bg-brand p-6 text-center text-brand-foreground md:hidden">
          <Logo brand={brand} />
          {tagline && <p className="text-sm text-white/80">{tagline}</p>}
        </div>

        <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden rounded-r-[150px] bg-brand p-8 text-brand-foreground shadow-lg md:flex">
          <Logo brand={brand} large />
          <div className="flex flex-1 flex-col justify-center pr-12">
            {headline && <p className="text-3xl font-extrabold leading-tight tracking-tight">{headline}</p>}
            {tagline && <p className="mt-3 max-w-xs text-sm text-white/80">{tagline}</p>}
          </div>
        </div>

        <div className="flex w-full items-center justify-center p-6 sm:p-10 md:w-1/2">
          <div className="w-full max-w-[340px]">
            <div className="mb-6 text-center">
              <h1 className="text-xl font-bold tracking-tight text-foreground">{title}</h1>
              {subtitle && <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>}
            </div>
            {children}
          </div>
        </div>
      </section>
    </main>
  );
}
