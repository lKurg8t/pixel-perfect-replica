import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  AlertTriangle,
  Calendar,
  ChevronDown,
  ChevronUp,
  Download,
  FileText,
  Gavel,
  MoreHorizontal,
  Plus,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Cell as Td,
  DataGrid,
  Field,
  PageHeader,
  Panel,
  Row,
  StatusPill,
} from "@/components/dms/kit";
import { compactKES, formatKES, legalCases } from "@/lib/dms-data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Route = createFileRoute("/_app/legal")({
  head: () => ({
    meta: [
      { title: "Legal & Litigation · NewTech CRS" },
      {
        name: "description",
        content:
          "Case and litigation management: case list, search, dashboard, details, hearings, filings, SLAs, workflow, legal costs and disbursements.",
      },
      { property: "og:title", content: "Legal & Litigation · NewTech CRS" },
      {
        property: "og:description",
        content: "Manage legal cases, track hearings and deadlines, monitor legal costs, and handle litigation workflow.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Legal,
});

function Legal() {
  const [expandedCase, setExpandedCase] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCases = legalCases.filter(
    (c) =>
      !searchQuery ||
      c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.account.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const caseStats = {
    total: legalCases.length,
    active: legalCases.filter((c) => c.status === "Active").length,
    pendingExecution: legalCases.filter((c) => c.status === "Awaiting execution").length,
    totalClaim: legalCases.reduce((sum, c) => sum + c.claim, 0),
    totalRecovered: legalCases.reduce((sum, c) => sum + c.recovered, 0),
    totalCosts: legalCases.reduce((sum, c) => sum + c.costs, 0),
  };

  return (
    <>
      <PageHeader
        title="Legal & Litigation"
        subtitle="Case management and litigation tracking"
        breadcrumbs={[{ label: "Home", to: "/dashboard" }, { label: "Legal" }]}
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="size-4" /> Export
            </Button>
            <Button size="sm" className="gradient-brand gap-2">
              <Plus className="size-4" /> New case
            </Button>
          </>
        }
      />

      {/* Case stats */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-5 mb-5">
        <Panel bodyClassName="p-4">
          <Field label="Total cases" value={caseStats.total} />
        </Panel>
        <Panel bodyClassName="p-4">
          <Field label="Active" value={caseStats.active} tone="info" />
        </Panel>
        <Panel bodyClassName="p-4">
          <Field label="Pending execution" value={caseStats.pendingExecution} tone="warning" />
        </Panel>
        <Panel bodyClassName="p-4">
          <Field label="Total claim" value={compactKES(caseStats.totalClaim)} />
        </Panel>
        <Panel bodyClassName="p-4">
          <Field label="Recovered" value={compactKES(caseStats.totalRecovered)} tone="success" />
        </Panel>
      </div>

      {/* Search */}
      <Panel className="mb-5" bodyClassName="p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-[300px] flex-1">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by case number, customer, account or court..."
              className="h-10 w-full rounded-lg border border-input bg-card pr-3 pl-9 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/25"
            />
          </div>
          <select className="h-10 rounded-lg border border-input bg-card px-3 text-sm">
            <option>All statuses</option>
            <option>Active</option>
            <option>Awaiting execution</option>
            <option>Closed</option>
            <option>Settled</option>
          </select>
          <select className="h-10 rounded-lg border border-input bg-card px-3 text-sm">
            <option>All handling</option>
            <option>Internal</option>
            <option>External</option>
          </select>
        </div>
      </Panel>

      {/* Case list */}
      <Panel title="Legal cases" description="Click a case to view details and timeline" bodyClassName="p-0">
        <DataGrid columns={["Case", "Account", "Customer", "Court", "Stage", "Handling", "Claim", "Recovered", ""]}>
          {filteredCases.map((c) => {
            const expanded = expandedCase === c.id;
            return (
              <>
                <Row key={c.id}>
                  <Td>
                    <button
                      onClick={() => setExpandedCase(expanded ? null : c.id)}
                      className="flex items-center gap-2 text-left"
                    >
                      {expanded ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
                      <span className="font-mono font-semibold">{c.id}</span>
                    </button>
                  </Td>
                  <Td className="font-mono text-xs">{c.account}</Td>
                  <Td>{c.customer}</Td>
                  <Td className="text-xs">{c.court}</Td>
                  <Td>
                    <StatusPill tone={c.stage === "Hearing" ? "warning" : c.stage === "Judgment" ? "info" : "neutral"}>
                      {c.stage}
                    </StatusPill>
                  </Td>
                  <Td>
                    <StatusPill tone={c.handling === "External" ? "info" : "brand"}>{c.handling}</StatusPill>
                  </Td>
                  <Td className="font-semibold">{compactKES(c.claim)}</Td>
                  <Td className="font-semibold text-brand-green">{compactKES(c.recovered)}</Td>
                  <Td>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link to="/accounts/$accountId" params={{ accountId: c.account.replace(/-/g, "") }}>
                            View account
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>View documents</DropdownMenuItem>
                        <DropdownMenuItem>Add hearing</DropdownMenuItem>
                        <DropdownMenuItem>Update costs</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Close case</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </Td>
                </Row>
                {expanded && (
                  <Row key={c.id + "-x"} className="bg-secondary/40">
                    <Td colSpan={9} className="px-6 py-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <h4 className="text-sm font-semibold mb-2">Case details</h4>
                          <dl className="space-y-2">
                            <Field label="Advocate" value={c.advocate} />
                            <Field label="Opposing counsel" value={c.opposing} />
                            <Field label="Filed date" value={c.filed} />
                            <Field label="Next hearing" value={c.nextHearing} />
                          </dl>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold mb-2">Financials</h4>
                          <dl className="space-y-2">
                            <Field label="Claim amount" value={formatKES(c.claim)} />
                            <Field label="Legal costs" value={formatKES(c.costs)} />
                            <Field label="Amount recovered" value={formatKES(c.recovered)} />
                            <Field label="Recovery rate" value={`${((c.recovered / c.claim) * 100).toFixed(1)}%`} />
                          </dl>
                        </div>
                      </div>
                      <div className="mt-4">
                        <h4 className="text-sm font-semibold mb-2">Upcoming deadlines</h4>
                        <div className="flex flex-wrap gap-2">
                          <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm">
                            <Calendar className="size-4 text-warning" />
                            <span>Hearing: {c.nextHearing}</span>
                          </div>
                          <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm">
                            <AlertTriangle className="size-4 text-critical" />
                            <span>Filing deadline: 2026-09-15</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <Button size="sm" variant="outline" className="gap-1">
                          <FileText className="size-3" /> View documents
                        </Button>
                        <Button size="sm" variant="outline" className="gap-1">
                          <Gavel className="size-3" /> Add hearing
                        </Button>
                        <Button size="sm" variant="outline" className="gap-1">
                          <Plus className="size-3" /> Update costs
                        </Button>
                      </div>
                    </Td>
                  </Row>
                )}
              </>
            );
          })}
        </DataGrid>
      </Panel>

      {/* Quick actions */}
      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <Panel title="Upcoming hearings" description="Next 7 days">
          <ul className="space-y-2">
            {legalCases.map((c) => (
              <li key={c.id} className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
                <div className="flex items-center gap-3">
                  <Calendar className="size-4 text-primary" />
                  <div>
                    <p className="text-sm font-medium">{c.id}</p>
                    <p className="text-xs text-muted-foreground">{c.nextHearing} · {c.court}</p>
                  </div>
                </div>
                <StatusPill tone="warning">{c.stage}</StatusPill>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="SLA alerts" description="Deadlines at risk">
          <ul className="space-y-2">
            <li className="flex items-center justify-between rounded-lg border border-critical/30 bg-critical/5 px-3 py-2">
              <div className="flex items-center gap-3">
                <AlertTriangle className="size-4 text-critical" />
                <div>
                  <p className="text-sm font-medium">Filing deadline</p>
                  <p className="text-xs text-muted-foreground">CASE-2026-0184 · Due in 3 days</p>
                </div>
              </div>
              <StatusPill tone="critical">Critical</StatusPill>
            </li>
            <li className="flex items-center justify-between rounded-lg border border-warning/30 bg-warning/5 px-3 py-2">
              <div className="flex items-center gap-3">
                <AlertTriangle className="size-4 text-warning" />
                <div>
                  <p className="text-sm font-medium">Document submission</p>
                  <p className="text-xs text-muted-foreground">CASE-2026-0142 · Due in 5 days</p>
                </div>
              </div>
              <StatusPill tone="warning">Warning</StatusPill>
            </li>
          </ul>
        </Panel>
      </div>
    </>
  );
}
