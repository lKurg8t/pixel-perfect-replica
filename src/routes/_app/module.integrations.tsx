import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, Field, DataGrid, Row, Cell as Td, StatusPill } from "@/components/dms/kit";
import { Button } from "@/components/ui/button";
import { Link2, Plus, Search } from "lucide-react";
import { integrations } from "@/lib/dms-data";

export const Route = createFileRoute("/_app/module/integrations")({
  head: () => ({
    meta: [
      { title: "Integrations · NewTech CRS" },
      { name: "description", content: "System integrations: external systems, APIs, data sync, payment gateways, SMS providers, core banking and third-party services." },
    ],
  }),
  component: Integrations,
});

function Integrations() {
  return (
    <>
      <PageHeader
        title="Integrations"
        subtitle="External system connections"
        breadcrumbs={[{ label: "Home", to: "/dashboard" }, { label: "Integrations" }]}
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-2">
              <Search className="size-4" /> Search
            </Button>
            <Button size="sm" className="gradient-brand gap-2">
              <Plus className="size-4" /> New integration
            </Button>
          </>
        }
      />

      <div className="grid gap-5 md:grid-cols-4 mb-5">
        <Panel bodyClassName="p-4">
          <Field label="Total integrations" value={integrations.length} />
        </Panel>
        <Panel bodyClassName="p-4">
          <Field label="Connected" value={integrations.filter(i => i.status === "Connected").length} />
        </Panel>
        <Panel bodyClassName="p-4">
          <Field label="Error" value={integrations.filter(i => i.status === "Error").length} />
        </Panel>
        <Panel bodyClassName="p-4">
          <Field label="Disconnected" value={integrations.filter(i => i.status === "Disconnected").length} />
        </Panel>
      </div>

      <Panel title="Integration registry" description="All external system connections" bodyClassName="p-0">
        <DataGrid columns={["System", "Status", "Last sync", "Records", "Failed", "Health", ""]}>
          {integrations.map((i, idx) => (
            <Row key={idx}>
              <Td className="font-medium">{i.name}</Td>
              <Td>
                <StatusPill tone={i.status === "Connected" ? "success" : i.status === "Error" ? "critical" : "neutral"}>
                  {i.status}
                </StatusPill>
              </Td>
              <Td className="text-xs">{i.lastSync}</Td>
              <Td className="text-xs">{i.records}</Td>
              <Td className="text-xs">{i.failed}</Td>
              <Td>
                <StatusPill tone={i.health >= 95 ? "success" : i.health >= 80 ? "warning" : "critical"}>
                  {i.health}%
                </StatusPill>
              </Td>
              <Td>
                <Button variant="ghost" size="sm">Configure</Button>
              </Td>
            </Row>
          ))}
        </DataGrid>
      </Panel>

      <Panel title="API status" description="External API health" className="mt-5">
        <div className="grid gap-3 md:grid-cols-2">
          <div className="p-4 border border-border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">M-Pesa (Daraja)</span>
              <StatusPill tone="success">Healthy</StatusPill>
            </div>
            <p className="text-sm text-muted-foreground">Last sync: 1 min ago · Health: 96%</p>
          </div>
          <div className="p-4 border border-border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Core Banking (T24)</span>
              <StatusPill tone="success">Healthy</StatusPill>
            </div>
            <p className="text-sm text-muted-foreground">Last sync: 3 min ago · Health: 99%</p>
          </div>
          <div className="p-4 border border-border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Credit Bureau (Metropol)</span>
              <StatusPill tone="critical">Error</StatusPill>
            </div>
            <p className="text-sm text-muted-foreground">Last sync: 6 h ago · Health: 42%</p>
          </div>
          <div className="p-4 border border-border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">WhatsApp Gateway</span>
              <StatusPill tone="critical">Disconnected</StatusPill>
            </div>
            <p className="text-sm text-muted-foreground">Last sync: 2 days ago · Health: 0%</p>
          </div>
        </div>
      </Panel>
    </>
  );
}
