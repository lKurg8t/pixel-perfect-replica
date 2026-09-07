import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, Field, DataGrid, Row, Cell as Td, StatusPill } from "@/components/dms/kit";
import { Button } from "@/components/ui/button";
import { Shield, Plus, Search } from "lucide-react";
import { auditTrail } from "@/lib/dms-data";

export const Route = createFileRoute("/_app/module/compliance")({
  head: () => ({
    meta: [
      { title: "Compliance & Audit · NewTech CRS" },
      { name: "description", content: "Compliance and audit: audit trail, compliance rules, regulatory reporting, data privacy, consent management and audit logs." },
    ],
  }),
  component: Compliance,
});

function Compliance() {
  return (
    <>
      <PageHeader
        title="Compliance & Audit"
        subtitle="Regulatory compliance and audit trail"
        breadcrumbs={[{ label: "Home", to: "/dashboard" }, { label: "Compliance" }]}
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-2">
              <Search className="size-4" /> Search
            </Button>
            <Button size="sm" className="gradient-brand gap-2">
              <Plus className="size-4" /> New rule
            </Button>
          </>
        }
      />

      <div className="grid gap-5 md:grid-cols-4 mb-5">
        <Panel bodyClassName="p-4">
          <Field label="Audit entries" value={auditTrail.length} />
        </Panel>
        <Panel bodyClassName="p-4">
          <Field label="Compliance score" value="98.5%" tone="success" />
        </Panel>
        <Panel bodyClassName="p-4">
          <Field label="Open issues" value="2" tone="warning" />
        </Panel>
        <Panel bodyClassName="p-4">
          <Field label="Last audit" value="2026-09-01" />
        </Panel>
      </div>

      <Panel title="Audit trail" description="Recent system activity" bodyClassName="p-0">
        <DataGrid columns={["Timestamp", "User", "Action", "Entity", "Details", ""]}>
          {auditTrail.slice(0, 5).map((a) => (
            <Row key={a.id}>
              <Td className="text-xs">{a.timestamp}</Td>
              <Td>{a.user}</Td>
              <Td className="font-medium">{a.action}</Td>
              <Td className="text-xs">{a.entity}</Td>
              <Td className="text-xs">{a.details}</Td>
              <Td>
                <Button variant="ghost" size="sm">View</Button>
              </Td>
            </Row>
          ))}
        </DataGrid>
      </Panel>

      <Panel title="Compliance rules" description="Active compliance checks" className="mt-5">
        <div className="grid gap-3 md:grid-cols-2">
          <div className="p-4 border border-border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Contact frequency limit</span>
              <StatusPill tone="success">Active</StatusPill>
            </div>
            <p className="text-sm text-muted-foreground">Max 3 contacts per customer per day</p>
          </div>
          <div className="p-4 border border-border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Quiet hours enforcement</span>
              <StatusPill tone="success">Active</StatusPill>
            </div>
            <p className="text-sm text-muted-foreground">No contact 20:00–08:00 EAT</p>
          </div>
          <div className="p-4 border border-border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Consent verification</span>
              <StatusPill tone="success">Active</StatusPill>
            </div>
            <p className="text-sm text-muted-foreground">Verify consent before each communication</p>
          </div>
          <div className="p-4 border border-border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Data retention policy</span>
              <StatusPill tone="success">Active</StatusPill>
            </div>
            <p className="text-sm text-muted-foreground">7-year retention for audit records</p>
          </div>
        </div>
      </Panel>
    </>
  );
}
