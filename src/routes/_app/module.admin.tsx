import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, Field, DataGrid, Row, Cell as Td, StatusPill } from "@/components/dms/kit";
import { Button } from "@/components/ui/button";
import { Settings, Plus, Search } from "lucide-react";

export const Route = createFileRoute("/_app/module/admin")({
  head: () => ({
    meta: [
      { title: "Administration · NewTech CRS" },
      { name: "description", content: "System administration: configuration, settings, system health, maintenance, logs and system parameters." },
    ],
  }),
  component: Admin,
});

function Admin() {
  return (
    <>
      <PageHeader
        title="Administration"
        subtitle="System configuration and settings"
        breadcrumbs={[{ label: "Home", to: "/dashboard" }, { label: "Admin" }]}
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-2">
              <Search className="size-4" /> Search
            </Button>
            <Button size="sm" className="gradient-brand gap-2">
              <Settings className="size-4" /> System settings
            </Button>
          </>
        }
      />

      <div className="grid gap-5 md:grid-cols-4 mb-5">
        <Panel bodyClassName="p-4">
          <Field label="System status" value="Operational" />
        </Panel>
        <Panel bodyClassName="p-4">
          <Field label="Uptime" value="99.9%" />
        </Panel>
        <Panel bodyClassName="p-4">
          <Field label="Active sessions" value="45" />
        </Panel>
        <Panel bodyClassName="p-4">
          <Field label="Last maintenance" value="2026-09-01" />
        </Panel>
      </div>

      <Panel title="System configuration" description="System-wide settings" bodyClassName="p-0">
        <DataGrid columns={["Setting", "Value", "Category", "Status", ""]}>
          <Row>
            <Td className="font-medium">Quiet hours start</Td>
            <Td>20:00</Td>
            <Td>Compliance</Td>
            <Td><StatusPill tone="success">Active</StatusPill></Td>
            <Td><Button variant="ghost" size="sm">Edit</Button></Td>
          </Row>
          <Row>
            <Td className="font-medium">Quiet hours end</Td>
            <Td>08:00</Td>
            <Td>Compliance</Td>
            <Td><StatusPill tone="success">Active</StatusPill></Td>
            <Td><Button variant="ghost" size="sm">Edit</Button></Td>
          </Row>
          <Row>
            <Td className="font-medium">Max daily contacts</Td>
            <Td>3</Td>
            <Td>Compliance</Td>
            <Td><StatusPill tone="success">Active</StatusPill></Td>
            <Td><Button variant="ghost" size="sm">Edit</Button></Td>
          </Row>
          <Row>
            <Td className="font-medium">Default currency</Td>
            <Td>KES</Td>
            <Td>General</Td>
            <Td><StatusPill tone="success">Active</StatusPill></Td>
            <Td><Button variant="ghost" size="sm">Edit</Button></Td>
          </Row>
        </DataGrid>
      </Panel>

      <Panel title="System health" description="Component status" className="mt-5">
        <div className="grid gap-3 md:grid-cols-2">
          <div className="p-4 border border-border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Database</span>
              <StatusPill tone="success">Healthy</StatusPill>
            </div>
            <p className="text-sm text-muted-foreground">Response time: 12ms</p>
          </div>
          <div className="p-4 border border-border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Cache</span>
              <StatusPill tone="success">Healthy</StatusPill>
            </div>
            <p className="text-sm text-muted-foreground">Hit rate: 94.5%</p>
          </div>
          <div className="p-4 border border-border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">API Gateway</span>
              <StatusPill tone="success">Healthy</StatusPill>
            </div>
            <p className="text-sm text-muted-foreground">Requests/sec: 245</p>
          </div>
          <div className="p-4 border border-border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Message Queue</span>
              <StatusPill tone="success">Healthy</StatusPill>
            </div>
            <p className="text-sm text-muted-foreground">Queue depth: 12</p>
          </div>
        </div>
      </Panel>
    </>
  );
}
