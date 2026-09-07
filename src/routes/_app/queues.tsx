import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  AlertTriangle,
  ArrowUpDown,
  ChevronDown,
  ChevronUp,
  Download,
  Filter,
  MoreHorizontal,
  Plus,
  RefreshCw,
  Search,
  Users,
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
import { compactKES, queues } from "@/lib/dms-data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Route = createFileRoute("/_app/queues")({
  head: () => ({
    meta: [
      { title: "Queue Management · NewTech CRS" },
      {
        name: "description",
        content:
          "Work allocation and queue management: queue dashboard, creation, prioritisation, automatic/manual allocation, reassignment and SLA monitoring.",
      },
      { property: "og:title", content: "Queue Management · NewTech CRS" },
      {
        property: "og:description",
        content: "Manage operational queues, monitor SLA breaches, and handle work allocation across teams and external partners.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Queues,
});

function Queues() {
  const [expandedQueue, setExpandedQueue] = useState<string | null>(null);

  const queueStats = {
    total: queues.length,
    totalAccounts: queues.reduce((sum, q) => sum + q.accounts, 0),
    totalValue: queues.reduce((sum, q) => sum + parseInt(q.value.replace(/[^0-9]/g, "")), 0),
    slaBreaches: queues.reduce((sum, q) => sum + q.breaches, 0),
  };

  return (
    <>
      <PageHeader
        title="Queue Management"
        subtitle="Work allocation and queue prioritisation"
        breadcrumbs={[{ label: "Home", to: "/dashboard" }, { label: "Queues" }]}
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-2">
              <RefreshCw className="size-4" /> Refresh
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="size-4" /> Filters
            </Button>
            <Button size="sm" className="gradient-brand gap-2">
              <Download className="size-4" /> Export
            </Button>
            <Button size="sm" className="gradient-brand gap-2">
              <Plus className="size-4" /> Create queue
            </Button>
          </>
        }
      />

      {/* Queue stats */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 mb-5">
        <Panel bodyClassName="p-4">
          <Field label="Total queues" value={queueStats.total} />
        </Panel>
        <Panel bodyClassName="p-4">
          <Field label="Total accounts" value={queueStats.totalAccounts.toLocaleString()} />
        </Panel>
        <Panel bodyClassName="p-4">
          <Field label="Total value" value={compactKES(queueStats.totalValue)} />
        </Panel>
        <Panel bodyClassName="p-4">
          <Field label="SLA breaches" value={queueStats.slaBreaches} tone="critical" />
        </Panel>
      </div>

      {/* Queue list */}
      <Panel title="Operational queues" description="Click a queue to view details and accounts" bodyClassName="p-0">
        <DataGrid columns={["Queue", "Owner", "Type", "Accounts", "Value", "SLA", "Breaches", ""]}>
          {queues.map((q) => {
            const expanded = expandedQueue === q.id;
            return (
              <>
                <Row key={q.id}>
                  <Td>
                    <button
                      onClick={() => setExpandedQueue(expanded ? null : q.id)}
                      className="flex items-center gap-2 text-left"
                    >
                      {expanded ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
                      <span className="font-semibold">{q.name}</span>
                    </button>
                  </Td>
                  <Td>{q.owner}</Td>
                  <Td>
                    <StatusPill tone={q.type === "External" ? "info" : q.type === "Legal" ? "critical" : "brand"}>
                      {q.type}
                    </StatusPill>
                  </Td>
                  <Td className="font-semibold">{q.accounts}</Td>
                  <Td className="font-semibold">{q.value}</Td>
                  <Td>{q.sla}</Td>
                  <Td>
                    <StatusPill tone={q.breaches > 8 ? "critical" : q.breaches > 4 ? "warning" : "success"}>
                      {q.breaches}
                    </StatusPill>
                  </Td>
                  <Td>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link to="/accounts">View accounts</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>Reassign accounts</DropdownMenuItem>
                        <DropdownMenuItem>Edit queue</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-critical">Delete queue</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </Td>
                </Row>
                {expanded && (
                  <Row key={q.id + "-x"} className="bg-secondary/40">
                    <Td colSpan={8} className="px-6 py-4">
                      <div className="grid gap-4 md:grid-cols-3">
                        <div>
                          <h4 className="text-sm font-semibold mb-2">Allocation rules</h4>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            <li>• Automatic: Enabled</li>
                            <li>• Capacity-aware: Yes</li>
                            <li>• Amount-based routing: Yes</li>
                            <li>• Channel-based routing: No</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold mb-2">Assignment</h4>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            <li>• Multi-layer ownership: RM → Team → Agent</li>
                            <li>• External partner: {q.type === "External" ? "Yes" : "No"}</li>
                            <li>• CSV allocation upload: Available</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold mb-2">Actions</h4>
                          <div className="flex flex-wrap gap-2">
                            <Button size="sm" variant="outline" className="gap-1">
                              <Users className="size-3" /> Reassign
                            </Button>
                            <Button size="sm" variant="outline" className="gap-1">
                              <ArrowUpDown className="size-3" /> Reprioritise
                            </Button>
                            <Button size="sm" variant="outline" className="gap-1">
                              <Search className="size-3" /> Search
                            </Button>
                          </div>
                        </div>
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
      <div className="mt-5 grid gap-5 md:grid-cols-3">
        <Panel title="Bulk reassignment" description="Reassign multiple accounts at once">
          <div className="space-y-3">
            <select className="w-full h-10 rounded-lg border border-input bg-card px-3 text-sm">
              <option>Select source queue</option>
              {queues.map((q) => (
                <option key={q.id}>{q.name}</option>
              ))}
            </select>
            <select className="w-full h-10 rounded-lg border border-input bg-card px-3 text-sm">
              <option>Select target queue/agent</option>
            </select>
            <Button size="sm" className="w-full gradient-brand">
              Execute reassignment
            </Button>
          </div>
        </Panel>

        <Panel title="CSV allocation upload" description="Upload CSV for bulk account assignment">
          <div className="space-y-3">
            <input
              type="file"
              accept=".csv"
              className="w-full h-10 rounded-lg border border-input bg-card px-3 text-sm"
            />
            <p className="text-xs text-muted-foreground">
              Format: account_number, target_queue, target_agent (optional)
            </p>
            <Button size="sm" className="w-full gradient-brand">
              Upload and process
            </Button>
          </div>
        </Panel>

        <Panel title="SLA monitoring" description="Accounts approaching or past SLA">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Critical (past SLA)</span>
              <StatusPill tone="critical">{queueStats.slaBreaches} accounts</StatusPill>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Warning (80% of SLA)</span>
              <StatusPill tone="warning">24 accounts</StatusPill>
            </div>
            <Button size="sm" variant="outline" className="w-full mt-2 gap-2">
              <AlertTriangle className="size-4" /> View all SLA risks
            </Button>
          </div>
        </Panel>
      </div>
    </>
  );
}
