import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, Columns3, Download, Filter, Search, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Cell as Td,
  DataGrid,
  PageHeader,
  Panel,
  Row,
  StatusPill,
  toneForDpd,
  toneForStage,
} from "@/components/dms/kit";
import { compactKES, customers, STAGES } from "@/lib/dms-data";

export const Route = createFileRoute("/_app/accounts/")({
  validateSearch: (s: Record<string, unknown>) => ({ stage: (s.stage as string) || "" }),
  head: () => ({
    meta: [
      { title: "Search Accounts & Customers · NewTech CRS" },
      {
        name: "description",
        content:
          "Customer-centric account search with collector, supervisor, collateral and legal views, expandable exposure and configurable columns.",
      },
      { property: "og:title", content: "Search Accounts & Customers · NewTech CRS" },
      {
        property: "og:description",
        content: "Find customers by number, name, phone, ID, segment, stage, DPD, amount and assignment.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AccountsSearch,
});

function AccountsSearch() {
  const { stage } = Route.useSearch();
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState<string | null>(customers[0].id);
  const [stageFilter, setStageFilter] = useState(stage);

  const rows = customers.filter((c) => {
    const q = query.trim().toLowerCase();
    const matches =
      !q ||
      [c.name, c.customerNumber, c.phone, c.email, c.nationalId, ...c.accounts.map((a) => a.accountNumber)]
        .join(" ")
        .toLowerCase()
        .includes(q);
    const stageOk = !stageFilter || c.stage === stageFilter || c.accounts.some((a) => a.stage === stageFilter);
    return matches && stageOk;
  });

  return (
    <>
      <PageHeader
        title="Accounts & Customers"
        subtitle="Customer-centric search — one row per customer with consolidated exposure"
        breadcrumbs={[{ label: "Home", to: "/dashboard" }, { label: "Accounts & Customers" }]}
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-2">
              <Star className="size-4" /> Saved searches
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Columns3 className="size-4" /> Columns
            </Button>
            <Button size="sm" className="gradient-brand gap-2">
              <Download className="size-4" /> Export
            </Button>
          </>
        }
      />

      <Tabs defaultValue="collector" className="mb-4">
        <TabsList>
          <TabsTrigger value="collector">Collector</TabsTrigger>
          <TabsTrigger value="supervisor">Supervisor</TabsTrigger>
          <TabsTrigger value="collateral">Collateral</TabsTrigger>
          <TabsTrigger value="legal">Legal</TabsTrigger>
        </TabsList>
      </Tabs>

      <Panel className="mb-5" bodyClassName="p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-[240px] flex-1">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Customer number, account number, name, phone or national ID"
              className="h-10 w-full rounded-lg border border-input bg-card pr-3 pl-9 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/25"
            />
          </div>
          <select
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value)}
            className="h-10 rounded-lg border border-input bg-card px-3 text-sm"
          >
            <option value="">All stages</option>
            {STAGES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <select className="h-10 rounded-lg border border-input bg-card px-3 text-sm">
            <option>All assignment</option>
            <option>Assigned to me</option>
            <option>Assigned to others</option>
            <option>Pool / unassigned</option>
            <option>External partner</option>
          </select>
          <select className="h-10 rounded-lg border border-input bg-card px-3 text-sm">
            <option>Any DPD</option>
            <option>1-30</option>
            <option>31-60</option>
            <option>61-90</option>
            <option>90+</option>
          </select>
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="size-4" /> Advanced search
          </Button>
        </div>
        <div className="mt-3 flex flex-wrap gap-2 text-xs">
          <StatusPill tone="brand">Assigned to me</StatusPill>
          <StatusPill tone="info">Assigned to another agent</StatusPill>
          <StatusPill tone="critical">Restricted / litigation</StatusPill>
        </div>
      </Panel>

      <Panel bodyClassName="p-0" title={`${rows.length} customers`} description="Expand a row to see all accounts">
        <DataGrid
          columns={["Customer", "Accounts", "Total exposure", "Arrears", "Highest DPD", "Stage", "Segment", "Ownership", ""]}
        >
          {rows.map((c) => {
            const exposure = c.accounts.reduce((s, a) => s + a.outstanding, 0);
            const arrears = c.accounts.reduce((s, a) => s + a.arrears, 0);
            const dpd = Math.max(...c.accounts.map((a) => a.dpd));
            const mine = c.accounts.some((a) => a.assignedAgent === "Lee Kurgat");
            const open = expanded === c.id;
            return (
              <>
                <Row
                  key={c.id}
                  className={
                    c.restricted
                      ? "border-l-4 border-l-critical"
                      : mine
                        ? "border-l-4 border-l-brand-green"
                        : "border-l-4 border-l-transparent"
                  }
                >
                  <Td>
                    <button
                      onClick={() => setExpanded(open ? null : c.id)}
                      className="flex items-center gap-2 text-left"
                    >
                      <ChevronDown className={`size-4 shrink-0 transition-transform ${open ? "" : "-rotate-90"}`} />
                      <span>
                        <span className="font-semibold">{c.name}</span>
                        <span className="block text-xs text-muted-foreground">
                          {c.customerNumber} · {c.phone}
                        </span>
                      </span>
                    </button>
                  </Td>
                  <Td>{c.accounts.length}</Td>
                  <Td className="font-semibold">{compactKES(exposure)}</Td>
                  <Td className="font-semibold text-critical">{compactKES(arrears)}</Td>
                  <Td>
                    <StatusPill tone={toneForDpd(dpd)}>{dpd}</StatusPill>
                  </Td>
                  <Td>
                    <StatusPill tone={toneForStage(c.stage)}>{c.stage}</StatusPill>
                  </Td>
                  <Td className="text-xs">{c.segment}</Td>
                  <Td className="text-xs text-muted-foreground">{c.accounts[0].assignedAgent}</Td>
                  <Td>
                    <Link
                      to="/accounts/$accountId"
                      params={{ accountId: c.accounts[0].id }}
                      className="text-xs font-semibold text-primary hover:underline"
                    >
                      Open 360°
                    </Link>
                  </Td>
                </Row>
                {open && (
                  <Row key={c.id + "-x"} className="bg-secondary/40">
                    <Td colSpan={9} className="px-6 py-4">
                      <div className="grid gap-2">
                        {c.accounts.map((a) => (
                          <Link
                            key={a.id}
                            to="/accounts/$accountId"
                            params={{ accountId: a.id }}
                            className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-card px-4 py-3 transition-colors hover:border-primary/40"
                          >
                            <div className="min-w-[220px]">
                              <p className="font-mono text-xs text-muted-foreground">{a.accountNumber}</p>
                              <p className="text-sm font-medium">{a.product}</p>
                            </div>
                            <div className="text-sm">
                              Outstanding <span className="font-semibold">{compactKES(a.outstanding)}</span>
                            </div>
                            <div className="text-sm">
                              Arrears <span className="font-semibold text-critical">{compactKES(a.arrears)}</span>
                            </div>
                            <StatusPill tone={toneForDpd(a.dpd)}>{a.dpd} DPD</StatusPill>
                            <StatusPill tone={toneForStage(a.stage)}>{a.stage}</StatusPill>
                            <span className="text-xs text-muted-foreground">
                              Score {a.score} · {a.queue}
                            </span>
                            {a.status === "Litigation" && <StatusPill tone="critical">Litigation lock</StatusPill>}
                          </Link>
                        ))}
                      </div>
                    </Td>
                  </Row>
                )}
              </>
            );
          })}
        </DataGrid>
        <div className="flex items-center justify-between border-t border-border px-4 py-3 text-xs text-muted-foreground">
          <span>Showing {rows.length} of 14,907 customers</span>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="sm">
              Previous
            </Button>
            <Button variant="outline" size="sm">
              1
            </Button>
            <Button variant="outline" size="sm">
              2
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </Panel>
    </>
  );
}
