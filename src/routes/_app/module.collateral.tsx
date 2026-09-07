import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, Field, DataGrid, Row, Cell as Td, StatusPill } from "@/components/dms/kit";
import { Button } from "@/components/ui/button";
import { FileText, Plus, Search } from "lucide-react";
import { collateral, formatKES, compactKES } from "@/lib/dms-data";

export const Route = createFileRoute("/_app/module/collateral")({
  head: () => ({
    meta: [
      { title: "Collateral Management · NewTech CRS" },
      { name: "description", content: "Collateral management: collateral list, details, valuation history, realisation process, status, documents and activity history." },
    ],
  }),
  component: Collateral,
});

function Collateral() {
  return (
    <>
      <PageHeader
        title="Collateral Management"
        subtitle="Asset collateral and realisation"
        breadcrumbs={[{ label: "Home", to: "/dashboard" }, { label: "Collateral" }]}
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-2">
              <Search className="size-4" /> Search
            </Button>
            <Button size="sm" className="gradient-brand gap-2">
              <Plus className="size-4" /> Add collateral
            </Button>
          </>
        }
      />

      <div className="grid gap-5 md:grid-cols-4 mb-5">
        <Panel bodyClassName="p-4">
          <Field label="Total collateral" value={collateral.length} />
        </Panel>
        <Panel bodyClassName="p-4">
          <Field label="Total value" value={compactKES(collateral.reduce((s, c) => s + c.value, 0))} />
        </Panel>
        <Panel bodyClassName="p-4">
          <Field label="In realisation" value={collateral.filter(c => c.realisation !== "Not started").length} tone="warning" />
        </Panel>
        <Panel bodyClassName="p-4">
          <Field label="Held" value={collateral.filter(c => c.status === "Held").length} tone="success" />
        </Panel>
      </div>

      <Panel title="Collateral register" description="All registered collateral assets" bodyClassName="p-0">
        <DataGrid columns={["Ref", "Account", "Type", "Description", "Value", "Valued", "Status", "Realisation", ""]}>
          {collateral.map((c) => (
            <Row key={c.id}>
              <Td className="font-mono text-xs">{c.id}</Td>
              <Td className="font-mono text-xs">{c.account}</Td>
              <Td>{c.type}</Td>
              <Td className="text-xs">{c.description}</Td>
              <Td className="font-semibold">{formatKES(c.value)}</Td>
              <Td>{c.valued}</Td>
              <Td>
                <StatusPill tone={c.status === "Held" ? "success" : "warning"}>{c.status}</StatusPill>
              </Td>
              <Td>
                <StatusPill tone={c.realisation === "Not started" ? "neutral" : "warning"}>{c.realisation}</StatusPill>
              </Td>
              <Td>
                <Button variant="ghost" size="sm">View</Button>
              </Td>
            </Row>
          ))}
        </DataGrid>
      </Panel>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <Panel title="Realisation pipeline" description="Collateral in realisation process">
          <ul className="space-y-2">
            {collateral.filter(c => c.realisation !== "Not started").map((c) => (
              <li key={c.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div>
                  <p className="font-medium">{c.description}</p>
                  <p className="text-xs text-muted-foreground">{c.id} · {formatKES(c.value)}</p>
                </div>
                <StatusPill tone="warning">{c.realisation}</StatusPill>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Valuation schedule" description="Upcoming valuations">
          <ul className="space-y-2">
            <li className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div>
                <p className="font-medium">COL-4471</p>
                <p className="text-xs text-muted-foreground">Toyota Hiace · Due 2026-12-18</p>
              </div>
              <Button variant="outline" size="sm">Schedule</Button>
            </li>
          </ul>
        </Panel>
      </div>
    </>
  );
}
