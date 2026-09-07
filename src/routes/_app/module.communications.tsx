import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, Field, DataGrid, Row, Cell as Td, StatusPill } from "@/components/dms/kit";
import { Button } from "@/components/ui/button";
import { MessageSquare, Plus, Search } from "lucide-react";
import { communications } from "@/lib/dms-data";

export const Route = createFileRoute("/_app/module/communications")({
  head: () => ({
    meta: [
      { title: "Communications · NewTech CRS" },
      { name: "description", content: "Omnichannel communications: templates, campaigns, SMS, WhatsApp, email, IVR, letter generation, consent management and delivery tracking." },
    ],
  }),
  component: Communications,
});

function Communications() {
  return (
    <>
      <PageHeader
        title="Communications"
        subtitle="Omnichannel communication management"
        breadcrumbs={[{ label: "Home", to: "/dashboard" }, { label: "Communications" }]}
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-2">
              <Search className="size-4" /> Search
            </Button>
            <Button size="sm" className="gradient-brand gap-2">
              <Plus className="size-4" /> New campaign
            </Button>
          </>
        }
      />

      <div className="grid gap-5 md:grid-cols-4 mb-5">
        <Panel bodyClassName="p-4">
          <Field label="Total communications" value={communications.length} />
        </Panel>
        <Panel bodyClassName="p-4">
          <Field label="SMS sent" value={communications.filter(c => c.channel === "SMS").length} tone="info" />
        </Panel>
        <Panel bodyClassName="p-4">
          <Field label="Email sent" value={communications.filter(c => c.channel === "Email").length} tone="success" />
        </Panel>
        <Panel bodyClassName="p-4">
          <Field label="Delivery rate" value="98.5%" tone="success" />
        </Panel>
      </div>

      <Panel title="Communication history" description="Recent communications" bodyClassName="p-0">
        <DataGrid columns={["Date", "Account", "Channel", "Direction", "Status", "Outcome", ""]}>
          {communications.map((c) => (
            <Row key={c.id}>
              <Td>{c.date}</Td>
              <Td className="font-mono text-xs">{c.account}</Td>
              <Td>
                <StatusPill tone={c.channel === "SMS" ? "info" : c.channel === "Email" ? "success" : "neutral"}>
                  {c.channel}
                </StatusPill>
              </Td>
              <Td>{c.direction}</Td>
              <Td>
                <StatusPill tone="info">{c.status}</StatusPill>
              </Td>
              <Td className="text-xs">{c.outcome}</Td>
              <Td>
                <Button variant="ghost" size="sm">View</Button>
              </Td>
            </Row>
          ))}
        </DataGrid>
      </Panel>

      <Panel title="Templates" description="Communication templates" className="mt-5">
        <div className="grid gap-3 md:grid-cols-2">
          <div className="p-4 border border-border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">SMS Reminder - DPD 1-7</span>
              <StatusPill tone="success">Active</StatusPill>
            </div>
            <p className="text-sm text-muted-foreground mb-3">Template EW-REM-01 · 1,234 uses this month</p>
            <Button size="sm" variant="outline" className="w-full">Edit template</Button>
          </div>
          <div className="p-4 border border-border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Email Statement</span>
              <StatusPill tone="success">Active</StatusPill>
            </div>
            <p className="text-sm text-muted-foreground mb-3">Template EW-STMT-02 · 856 uses this month</p>
            <Button size="sm" variant="outline" className="w-full">Edit template</Button>
          </div>
        </div>
      </Panel>
    </>
  );
}
