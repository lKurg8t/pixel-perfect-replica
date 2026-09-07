import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, Field, DataGrid, Row, Cell as Td, StatusPill } from "@/components/dms/kit";
import { Button } from "@/components/ui/button";
import { Bot, Plus, Search } from "lucide-react";
import { models } from "@/lib/dms-data";

export const Route = createFileRoute("/_app/module/ai")({
  head: () => ({
    meta: [
      { title: "AI & Models · NewTech CRS" },
      { name: "description", content: "AI and model management: model library, training, deployment, performance monitoring, explainability, drift detection and model governance." },
    ],
  }),
  component: AI,
});

function AI() {
  return (
    <>
      <PageHeader
        title="AI & Models"
        subtitle="Machine learning model management"
        breadcrumbs={[{ label: "Home", to: "/dashboard" }, { label: "AI & Models" }]}
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-2">
              <Search className="size-4" /> Search
            </Button>
            <Button size="sm" className="gradient-brand gap-2">
              <Plus className="size-4" /> New model
            </Button>
          </>
        }
      />

      <div className="grid gap-5 md:grid-cols-4 mb-5">
        <Panel bodyClassName="p-4">
          <Field label="Total models" value={models.length} />
        </Panel>
        <Panel bodyClassName="p-4">
          <Field label="In production" value={models.filter(m => m.status === "Production").length} tone="success" />
        </Panel>
        <Panel bodyClassName="p-4">
          <Field label="In training" value={models.filter(m => m.status === "Training").length} tone="warning" />
        </Panel>
        <Panel bodyClassName="p-4">
          <Field label="Avg accuracy" value="94.2%" tone="info" />
        </Panel>
      </div>

      <Panel title="Model library" description="All ML models" bodyClassName="p-0">
        <DataGrid columns={["Model", "Type", "Purpose", "Accuracy", "Status", ""]}>
          {models.map((m) => (
            <Row key={m.id}>
              <Td className="font-mono text-xs">{m.id}</Td>
              <Td>{m.type}</Td>
              <Td className="text-xs">{m.purpose}</Td>
              <Td className="font-semibold">{m.accuracy}%</Td>
              <Td>
                <StatusPill tone={m.status === "Production" ? "success" : m.status === "Training" ? "warning" : "neutral"}>
                  {m.status}
                </StatusPill>
              </Td>
              <Td>
                <Button variant="ghost" size="sm">View</Button>
              </Td>
            </Row>
          ))}
        </DataGrid>
      </Panel>

      <Panel title="Model performance" description="Production model metrics" className="mt-5">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="p-4 border border-border rounded-lg">
            <p className="text-sm text-muted-foreground">Likelihood-to-Pay Model</p>
            <p className="text-2xl font-bold mt-1">94.2%</p>
            <p className="text-xs text-success mt-1">+0.3% vs last month</p>
          </div>
          <div className="p-4 border border-border rounded-lg">
            <p className="text-sm text-muted-foreground">Segmentation Model</p>
            <p className="text-2xl font-bold mt-1">91.8%</p>
            <p className="text-xs text-success mt-1">+0.1% vs last month</p>
          </div>
          <div className="p-4 border border-border rounded-lg">
            <p className="text-sm text-muted-foreground">PTP Prediction Model</p>
            <p className="text-2xl font-bold mt-1">87.5%</p>
            <p className="text-xs text-warning mt-1">-0.2% vs last month</p>
          </div>
        </div>
      </Panel>
    </>
  );
}
