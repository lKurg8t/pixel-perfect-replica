import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

export function PageHeader({
  title,
  subtitle,
  breadcrumbs,
  actions,
}: {
  title: string;
  subtitle?: string;
  breadcrumbs?: { label: string; to?: string }[];
  actions?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-3 border-b border-border pb-5 lg:flex-row lg:items-end lg:justify-between">
      <div>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="mb-2 flex items-center gap-1 text-xs text-muted-foreground">
            {breadcrumbs.map((b, i) => (
              <span key={b.label} className="flex items-center gap-1">
                {i > 0 && <ChevronRight className="size-3" />}
                {b.to ? (
                  <Link to={b.to} className="hover:text-primary">
                    {b.label}
                  </Link>
                ) : (
                  <span className="text-foreground">{b.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        <h1 className="text-2xl font-bold text-foreground lg:text-[1.75rem]">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

export function Panel({
  title,
  description,
  actions,
  children,
  className,
  bodyClassName,
}: {
  title?: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <section className={cn("surface-panel overflow-hidden", className)}>
      {(title || actions) && (
        <header className="flex items-start justify-between gap-3 border-b border-border px-5 py-4">
          <div>
            {title && <h2 className="text-base font-semibold text-foreground">{title}</h2>}
            {description && <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>}
          </div>
          {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
        </header>
      )}
      <div className={cn("p-5", bodyClassName)}>{children}</div>
    </section>
  );
}

const toneMap: Record<string, string> = {
  success: "bg-success/10 text-success border-success/25",
  warning: "bg-warning/15 text-warning-foreground border-warning/35",
  critical: "bg-critical/10 text-critical border-critical/25",
  info: "bg-info/10 text-info border-info/25",
  neutral: "bg-muted text-muted-foreground border-border",
  brand: "bg-brand-green-soft text-brand-green border-brand-green/25",
};

export function StatusPill({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: keyof typeof toneMap | string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap",
        toneMap[tone] ?? toneMap.neutral,
        className,
      )}
    >
      {children}
    </span>
  );
}

export function toneForStage(stage: string) {
  switch (stage) {
    case "Pre-Delinquency":
      return "info";
    case "Early Warning":
      return "warning";
    case "Active Collections":
      return "brand";
    case "Recovery":
      return "warning";
    case "Legal":
      return "critical";
    case "Write-off":
      return "neutral";
    default:
      return "neutral";
  }
}

export function toneForDpd(dpd: number) {
  if (dpd === 0) return "success";
  if (dpd <= 30) return "info";
  if (dpd <= 90) return "warning";
  return "critical";
}

export function KpiCard({
  label,
  value,
  delta,
  hint,
  tone = "info",
  to,
  icon,
}: {
  label: string;
  value: string;
  delta?: string;
  hint?: string;
  tone?: string;
  to?: string;
  icon?: ReactNode;
}) {
  const body = (
    <div className="surface-panel group h-full p-4 transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-float)]">
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">{label}</p>
        {icon && (
          <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-secondary text-primary">
            {icon}
          </span>
        )}
      </div>
      <p className="mt-3 text-2xl font-bold text-foreground">{value}</p>
      <div className="mt-2 flex items-center gap-2">
        {delta && <StatusPill tone={tone}>{delta}</StatusPill>}
        {hint && <span className="truncate text-xs text-muted-foreground">{hint}</span>}
      </div>
    </div>
  );
  return to ? (
    <Link to={to} className="block h-full focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none">
      {body}
    </Link>
  ) : (
    body
  );
}

export function DataGrid({
  columns,
  children,
  className,
}: {
  columns: string[];
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("overflow-x-auto", className)}>
      <table className="w-full min-w-[720px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-border bg-secondary/60">
            {columns.map((c) => (
              <th
                key={c}
                className="px-4 py-2.5 text-left text-xs font-semibold tracking-wide text-muted-foreground uppercase"
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

export function Row({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <tr className={cn("border-b border-border/70 transition-colors last:border-0 hover:bg-secondary/50", className)}>
      {children}
    </tr>
  );
}

export function Cell({
  children,
  className,
  colSpan,
}: {
  children: ReactNode;
  className?: string;
  colSpan?: number;
}) {
  return (
    <td colSpan={colSpan} className={cn("px-4 py-3 align-middle text-foreground", className)}>
      {children}
    </td>
  );
}

export function Field({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="min-w-0">
      <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">{label}</dt>
      <dd className="mt-0.5 truncate text-sm font-medium text-foreground">{value}</dd>
    </div>
  );
}
