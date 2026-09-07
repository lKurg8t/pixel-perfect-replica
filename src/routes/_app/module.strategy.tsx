import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, Field, DataGrid, Row, Cell as Td, StatusPill } from "@/components/dms/kit";
import { Button } from "@/components/ui/button";
import { GitBranch, Plus, Search, Play } from "lucide-react";

export const Route = createFileRoute("/_app/module/strategy")({
  head: () => ({
    meta: [
      { title: "Strategy Engine · NewTech CRS" },
      { name: "description", content: "Strategy management: strategy list, creation, rule builder, conditions, actions, stage conditions, routing, escalation and champion/challenger configuration." },
    ],
  }),
  component: Strategy,
});

function Strategy() {
  const strategies = [
    { id: "STR-001", name: "Early Warning Treatment", stage: "Early Warning", status: "Active", version: "v2.1" },
    { id: "STR-014", name: "High Value Asset Finance", stage: "Active Collections", status: "Active", version: "v3.0" },
    { id: "STR-028", name: "Recovery Pipeline", stage: "Recovery", status: "Active", version: "v1.8" },
    { id: "STR-035", name: "Legal Escalation", stage: "Legal", status: "Draft", version: "v0.5" },
  ];

  return (
    <>
      <PageHeader
        title="Strategy Engine"
        subtitle="Collections strategy and rule configuration"
        breadcrumbs={[{ label: "Home", to: "/dashboard" }, { label: "Strategy" }]}
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-2">
              <Search className="size-4" /> Search
            </Button>
            <Button size="sm" className="gradient-brand gap-2">
              <Plus className="size-4" /> New strategy
            </Button>
          </>
        }
      />

      <div className="grid gap-5 md:grid-cols-4 mb-5">
        <Panel bodyClassName="p-4">
          <Field label="Total strategies" value={strategies.length} />
        </Panel>
        <Panel bodyClassName="p-4">
          <Field label="Active" value={strategies.filter(s => s.status === "Active").length} tone="success" />
        </Panel>
        <Panel bodyClassName="p-4">
          <Field label="Draft" value={strategies.filter(s => s.status === "Draft").length} tone="warning" />
        </Panel>
        <Panel bodyClassName="p-4">
          <Field label="Champion/Challenger" value="2" tone="info" />
        </Panel>
      </div>

      <Panel title="Strategy library" description="All collection strategies" bodyClassName="p-0">
        <DataGrid columns={["ID", "Name", "Stage", "Version", "Status", ""]}>
          {strategies.map((s) => (
            <Row key={s.id}>
              <Td className="font-mono text-xs">{s.id}</Td>
              <Td className="font-medium">{s.name}</Td>
              <Td>{s.stage}</Td>
              <Td>{s.version}</Td>
              <Td>
                <StatusPill tone={s.status === "Active" ? "success" : "warning"}>{s.status}</StatusPill>
              </Td>
              <Td>
                <Button variant="ghost" size="sm">Edit</Button>
              </Td>
            </Row>
          ))}
        </DataGrid>
      </Panel>

      <Panel title="Rule builder" description="Create and edit strategy rules" className="mt-5">
        <div className="p-4 border border-border rounded-lg bg-secondary/30">
          <div className="flex items-center gap-2 mb-4">
            <GitBranch className="size-4 text-primary" />
            <span className="font-medium">IF DPD ≥ 31 AND Segment = "High Value"</span>
          </div>
          <div className="flex items-center gap-2 mb-4 ml-6">
            <GitBranch className="size-4 text-muted-foreground" />
            <span className="text-muted-foreground">THEN Assign to "AF Arrears 60-90" queue</span>
          </div>
          <div className="flex items-center gap-2 ml-6">
            <GitBranch className="size-4 text-muted-foreground" />
            <span className="text-muted-foreground">AND Set next action = "Contact customer"</span>
          </div>
          <div className="mt-4 flex gap-2">
            <Button size="sm" variant="outline" className="gap-2">
              <Play className="size-4" /> Simulate
            </Button>
            <Button size="sm" className="gradient-brand">Save rule</Button>
          </div>
        </div>
      </Panel>
    </>
  );
}
