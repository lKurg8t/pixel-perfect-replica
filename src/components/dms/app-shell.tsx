import { useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  ChevronLeft,
  CircleHelp,
  ListChecks,
  LogOut,
  MessageSquare,
  Search,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { visibleGroups } from "@/lib/dms-nav";
import { notifications, roles, tasks, type Role } from "@/lib/dms-data";
import { useRole } from "./role-context";
import { StatusPill } from "./kit";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

function Brand({ collapsed }: { collapsed: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span className="gradient-brand grid size-9 shrink-0 place-items-center rounded-xl text-primary-foreground shadow-[var(--shadow-card)]">
        <ShieldCheck className="size-5" />
      </span>
      {!collapsed && (
        <div className="leading-tight">
          <p className="text-base font-extrabold tracking-tight text-foreground">NewTech CRS</p>
          <p className="text-[11px] font-medium text-brand-green">Collections &amp; Recovery</p>
        </div>
      )}
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const { role, setRole } = useRole();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const groups = visibleGroups(role);
  const unread = notifications.filter((n) => n.unread).length;

  return (
    <div className="flex min-h-screen bg-background">
      <aside
        className={cn(
          "sticky top-0 hidden h-screen shrink-0 flex-col border-r border-sidebar-border bg-sidebar transition-[width] duration-200 lg:flex",
          collapsed ? "w-[76px]" : "w-[268px]",
        )}
      >
        <div className="flex items-center justify-between gap-2 border-b border-sidebar-border px-4 py-4">
          <Brand collapsed={collapsed} />
          <button
            aria-label={collapsed ? "Expand navigation" : "Collapse navigation"}
            onClick={() => setCollapsed((c) => !c)}
            className="grid size-7 shrink-0 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <ChevronLeft className={cn("size-4 transition-transform", collapsed && "rotate-180")} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {groups.map((g) => (
            <div key={g.group} className="mb-5">
              {!collapsed && (
                <p className="px-3 pb-2 text-[10px] font-bold tracking-[0.12em] text-muted-foreground uppercase">
                  {g.group}
                </p>
              )}
              <ul className="space-y-0.5">
                {g.items.map((item) => {
                  const active = pathname === item.to || pathname.startsWith(item.to + "/");
                  return (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        title={item.label}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                          active
                            ? "bg-sidebar-accent text-sidebar-accent-foreground"
                            : "text-sidebar-foreground hover:bg-secondary",
                        )}
                      >
                        <span
                          className={cn(
                            "size-1.5 shrink-0 rounded-full",
                            active ? "bg-brand-green" : "bg-border",
                          )}
                        />
                        {!collapsed && <span className="flex-1 truncate">{item.label}</span>}
                        {!collapsed && item.badge && (
                          <span className="rounded-full bg-critical/10 px-1.5 py-0.5 text-[10px] font-bold text-critical">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div className="border-t border-sidebar-border p-3">
          <div className="flex items-center gap-3 rounded-xl bg-secondary/70 p-2.5">
            <span className="gradient-brand grid size-9 shrink-0 place-items-center rounded-full text-sm font-bold text-primary-foreground">
              LK
            </span>
            {!collapsed && (
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-foreground">Lee Kurgat</p>
                <p className="truncate text-[11px] text-muted-foreground">{role}</p>
              </div>
            )}
            {!collapsed && (
              <Link to="/" aria-label="Sign out" className="text-muted-foreground hover:text-critical">
                <LogOut className="size-4" />
              </Link>
            )}
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex flex-wrap items-center gap-3 border-b border-border bg-card/95 px-4 py-3 backdrop-blur lg:px-7">
          <div className="relative min-w-[200px] flex-1 lg:max-w-md">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search customer, account, case, phone or ID…"
              className="h-10 w-full rounded-full border border-input bg-secondary/60 pr-4 pl-9 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
            />
          </div>

          <div className="ml-auto flex items-center gap-1.5">
            <StatusPill tone="brand" className="hidden xl:inline-flex">
              NewTech Bank · Kenya
            </StatusPill>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="hidden gap-2 rounded-full md:inline-flex">
                  <UserRound className="size-4" />
                  <span className="max-w-[150px] truncate">{role}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <DropdownMenuLabel>Preview experience as</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {roles.map((r) => (
                  <DropdownMenuItem key={r} onClick={() => setRole(r as Role)}>
                    {r}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Popover>
              <PopoverTrigger asChild>
                <button
                  aria-label="Tasks"
                  className="relative grid size-9 place-items-center rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground"
                >
                  <ListChecks className="size-5" />
                </button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-80 p-0">
                <p className="border-b border-border px-4 py-3 text-sm font-semibold">My tasks</p>
                <ul className="max-h-80 overflow-y-auto">
                  {tasks.map((t) => (
                    <li key={t.id} className="border-b border-border/60 px-4 py-3 last:border-0">
                      <p className="text-sm font-medium">{t.title}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {t.account} · {t.due} · {t.status}
                      </p>
                    </li>
                  ))}
                </ul>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <button
                  aria-label="Notifications"
                  className="relative grid size-9 place-items-center rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground"
                >
                  <Bell className="size-5" />
                  {unread > 0 && (
                    <span className="absolute top-0.5 right-0.5 grid size-4 place-items-center rounded-full bg-critical text-[10px] font-bold text-critical-foreground">
                      {unread}
                    </span>
                  )}
                </button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-96 p-0">
                <div className="flex items-center justify-between border-b border-border px-4 py-3">
                  <p className="text-sm font-semibold">Notification centre</p>
                  <Link to="/module/notifications" className="text-xs font-medium text-primary hover:underline">
                    View all
                  </Link>
                </div>
                <ul className="max-h-96 overflow-y-auto">
                  {notifications.map((n) => (
                    <li key={n.id} className="border-b border-border/60 px-4 py-3 last:border-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-medium">{n.title}</p>
                        <StatusPill tone={n.priority === "Critical" || n.priority === "High" ? "critical" : "info"}>
                          {n.priority}
                        </StatusPill>
                      </div>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {n.detail} · {n.time}
                      </p>
                    </li>
                  ))}
                </ul>
              </PopoverContent>
            </Popover>

            <Link
              to="/module/messaging"
              aria-label="Messages"
              className="grid size-9 place-items-center rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              <MessageSquare className="size-5" />
            </Link>
            <button
              aria-label="Help"
              className="hidden size-9 place-items-center rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground sm:grid"
            >
              <CircleHelp className="size-5" />
            </button>

            <span className="gradient-brand ml-1 grid size-9 place-items-center rounded-full text-sm font-bold text-primary-foreground">
              LK
            </span>
          </div>
        </header>

        <main className="min-w-0 flex-1 px-4 py-6 lg:px-7 lg:py-8">{children}</main>
      </div>
    </div>
  );
}
