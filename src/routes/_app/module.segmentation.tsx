import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, Field, DataGrid, Row, Cell as Td, StatusPill } from "@/components/dms/kit";
import { Button } from "@/components/ui/button";
import { Layers, Plus, Search } from "lucide-react";
import { customers, STAGES } from "@/lib/dms-data";

export const Route = createFileRoute("/_app/module/segmentation")({
  head: () => ({
    meta: [
      { title: "Segmentation & Scoring · NewTech CRS" },
      { name: "description", content: "Segmentation and scoring: assignment segments, segment rules, segment membership, account scores, likelihood-to-pay, roll-forward risk and model reason codes." },
    ],
  }),
  component: Segmentation,
});

function Segmentation() {
  const segments = ["Self-Cure", "Responsive", "Hard-to-Reach", "High Value", "Hardship"];
  
  return (
    <>
      <PageHeader
        title="Segmentation & Scoring"
        subtitle="Customer segmentation and risk scoring"
        breadcrumbs={[{ label: "Home", to: "/dashboard" }, { label: "Segmentation" }]}
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-2">
              <Search className="size-4" /> Search
            </Button>
            <Button size="sm" className="gradient-brand gap-2">
              <Plus className="size-4" /> New segment
            </Button>
          </>
        }
      />

      <div className="grid gap-5 md:grid-cols-5 mb-5">
        {segments.map((s) => (
          <Panel key={s} bodyClassName="p-4">
            <Field label={s} value={customers.filter(c => c.segment === s).length} />
          </Panel>
        ))}
      </div>

      <Panel title="Segment rules" description="Automatic segment assignment rules" bodyClassName="p-0">
        <DataGrid columns={["Rule", "Condition", "Segment", "Priority", "Status", ""]}>
          <Row>
            <Td className="font-medium">High Value Detection</Td>
            <Td>Outstanding &gt; KES 1M</Td>
            <Td>High Value</Td>
            <Td><StatusPill tone="critical">High</StatusPill></Td>
            <Td><StatusPill tone="success">Active</StatusPill></Td>
            <Td><Button variant="ghost" size="sm">Edit</Button></Td>
          </Row>
          <Row>
            <Td className="font-medium">Hardship Flag</Td>
            <Td>DPD &gt; 90 + No payment 60 days</Td>
            <Td>Hardship</Td>
            <Td><StatusPill tone="warning">Medium</StatusPill></Td>
            <Td><StatusPill tone="success">Active</StatusPill></Td>
            <Td><Button variant="ghost" size="sm">Edit</Button></Td>
          </Row>
        </DataGrid>
      </Panel>

      <Panel title="Score distribution" description="Account score ranges by segment" className="mt-5" bodyClassName="p-0">
        <DataGrid columns={["Segment", "Min Score", "Max Score", "Avg Score", "Accounts", ""]}>
          {segments.map((s) => {
            const segCustomers = customers.filter(c => c.segment === s);
            const scores = segCustomers.flatMap(c => c.accounts.map(a => a.score));
            const avgScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
            return (
              <Row key={s}>
                <Td className="font-medium">{s}</Td>
                <Td>{Math.min(...scores, 0)}</Td>
                <Td>{Math.max(...scores, 1000)}</Td>
                <Td className="font-semibold">{avgScore}</Td>
                <Td>{segCustomers.length}</Td>
                <Td><Button variant="ghost" size="sm">View</Button></Td>
              </Row>
            );
          })}
        </DataGrid>
      </Panel>
    </>
  );
}
