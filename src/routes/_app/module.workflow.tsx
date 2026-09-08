import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, Field, DataGrid, Row, Cell as Td, StatusPill } from "@/components/dms/kit";
import { Button } from "@/components/ui/button";
import { Workflow, Plus, Search } from "lucide-react";

export const Route = createFileRoute("/_app/module/workflow")({
  head: () => ({
    meta: [
      { title: "Workflow Engine · NewTech CRS" },
      { name: "description", content: "Workflow management: workflow list, designer, stages, tasks, human tasks, SLA timers, escalations and approval workflows." },
    ],
  }),
  component: WorkflowEngine,
});

function WorkflowEngine() {
  const workflows = [
    { id: "WF-COLL-01", name: "Standard Collections", stages: 6, status: "Active", sla: "2h" },
    { id: "WF-COLL-07", name: "High Value Treatment", stages: 8, status: "Active", sla: "4h" },
    { id: "WF-LEGAL-03", name: "Legal Escalation", stages: 5, status: "Active", sla: "1d" },
    { id: "WF-REC-02", name: "Recovery Process", stages: 4, status: "Draft", sla: "3d" },
  ];

  return (
    <>
      <PageHeader
        title="Workflow Engine"
        subtitle="Workflow configuration and designer"
        breadcrumbs={[{ label: "Home", to: "/dashboard" }, { label: "Workflow" }]}
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-2">
              <Search className="size-4" /> Search
            </Button>
            <Button size="sm" className="gradient-brand gap-2">
              <Plus className="size-4" /> New workflow
            </Button>
          </>
        }
      />

      <div className="grid gap-5 md:grid-cols-4 mb-5">
        <Panel bodyClassName="p-4">
          <Field label="Total workflows" value={workflows.length} />
        </Panel>
        <Panel bodyClassName="p-4">
          <Field label="Active" value={workflows.filter(w => w.status === "Active").length} />
        </Panel>
        <Panel bodyClassName="p-4">
          <Field label="Draft" value={workflows.filter(w => w.status === "Draft").length} />
        </Panel>
        <Panel bodyClassName="p-4">
          <Field label="Avg stages" value={Math.round(workflows.reduce((s, w) => s + w.stages, 0) / workflows.length)} />
        </Panel>
      </div>

      <Panel title="Workflow library" description="All configured workflows" bodyClassName="p-0">
        <DataGrid columns={["ID", "Name", "Stages", "SLA", "Status", ""]}>
          {workflows.map((w) => (
            <Row key={w.id}>
              <Td className="font-mono text-xs">{w.id}</Td>
              <Td className="font-medium">{w.name}</Td>
              <Td>{w.stages}</Td>
              <Td>{w.sla}</Td>
              <Td>
                <StatusPill tone={w.status === "Active" ? "success" : "warning"}>{w.status}</StatusPill>
              </Td>
              <Td>
                <Button variant="ghost" size="sm">Designer</Button>
              </Td>
            </Row>
          ))}
        </DataGrid>
      </Panel>

      <Panel title="Workflow designer" description="Visual workflow configuration" className="mt-5">
        <div className="p-6 border border-border rounded-lg bg-secondary/30">
          <div className="flex items-center justify-center gap-4">
            <div className="p-3 border border-border rounded-lg bg-card">
              <p className="text-sm font-medium text-center">Start</p>
            </div>
            <div className="text-muted-foreground">→</div>
            <div className="p-3 border border-border rounded-lg bg-card">
              <p className="text-sm font-medium text-center">Assignment</p>
            </div>
            <div className="text-muted-foreground">→</div>
            <div className="p-3 border border-brand-green/30 rounded-lg bg-brand-green-soft">
              <p className="text-sm font-medium text-center brand-green">Contact</p>
            </div>
            <div className="text-muted-foreground">→</div>
            <div className="p-3 border border-border rounded-lg bg-card">
              <p className="text-sm font-medium text-center">PTP Check</p>
            </div>
            <div className="text-muted-foreground">→</div>
            <div className="p-3 border border-border rounded-lg bg-card">
              <p className="text-sm font-medium text-center">End</p>
            </div>
          </div>
          <div className="mt-4 flex justify-center gap-2">
            <Button size="sm" variant="outline">Add stage</Button>
            <Button size="sm" className="gradient-brand">Save workflow</Button>
          </div>
        </div>
      </Panel>
    </>
  );
}
