import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, Panel, Field, DataGrid, Row, Cell as Td, StatusPill } from "@/components/dms/kit";
import { Button } from "@/components/ui/button";
import { FileText, Plus, Search } from "lucide-react";
import { legalCases, formatKES, compactKES } from "@/lib/dms-data";

export const Route = createFileRoute("/_app/module/cases")({
  head: () => ({
    meta: [
      { title: "Cases & Tasks · NewTech CRS" },
      { name: "description", content: "Case and task management: case list, search, dashboard, details, workflow, SLAs, tasks, reminders and approval workflows." },
    ],
  }),
  component: Cases,
});

function Cases() {
  return (
    <>
      <PageHeader
        title="Cases & Tasks"
        subtitle="Case management and task tracking"
        breadcrumbs={[{ label: "Home", to: "/dashboard" }, { label: "Cases & Tasks" }]}
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-2">
              <Search className="size-4" /> Search
            </Button>
            <Button size="sm" className="gradient-brand gap-2">
              <Plus className="size-4" /> New case
            </Button>
          </>
        }
      />

      <div className="grid gap-5 md:grid-cols-4 mb-5">
        <Panel bodyClassName="p-4">
          <Field label="Total cases" value={legalCases.length} />
        </Panel>
        <Panel bodyClassName="p-4">
          <Field label="Active" value={legalCases.filter(c => c.status === "Active").length} tone="info" />
        </Panel>
        <Panel bodyClassName="p-4">
          <Field label="Pending execution" value={legalCases.filter(c => c.status === "Awaiting execution").length} tone="warning" />
        </Panel>
        <Panel bodyClassName="p-4">
          <Field label="Total claim" value={compactKES(legalCases.reduce((s, c) => s + c.claim, 0))} />
        </Panel>
      </div>

      <Panel title="Legal cases" description="All litigation and legal cases" bodyClassName="p-0">
        <DataGrid columns={["Case", "Account", "Customer", "Court", "Stage", "Claim", "Status", ""]}>
          {legalCases.map((c) => (
            <Row key={c.id}>
              <Td className="font-mono font-semibold">{c.id}</Td>
              <Td className="font-mono text-xs">{c.account}</Td>
              <Td>{c.customer}</Td>
              <Td className="text-xs">{c.court}</Td>
              <Td>
                <StatusPill tone={c.stage === "Hearing" ? "warning" : "info"}>{c.stage}</StatusPill>
              </Td>
              <Td className="font-semibold">{compactKES(c.claim)}</Td>
              <Td>
                <StatusPill tone={c.status === "Active" ? "success" : "warning"}>{c.status}</StatusPill>
              </Td>
              <Td>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/legal">View</Link>
                </Button>
              </Td>
            </Row>
          ))}
        </DataGrid>
      </Panel>

      <Panel title="Tasks" description="Open tasks and reminders" className="mt-5" bodyClassName="p-0">
        <DataGrid columns={["Task", "Account", "Due", "Priority", "Status", ""]}>
          <Row>
            <Td className="font-medium">Prepare demand letter pack</Td>
            <Td className="font-mono text-xs">7741-0032-11</Td>
            <Td>10 Sep</Td>
            <Td><StatusPill tone="critical">High</StatusPill></Td>
            <Td>Awaiting approval</Td>
            <Td><Button variant="ghost" size="sm">View</Button></Td>
          </Row>
          <Row>
            <Td className="font-medium">Field visit report upload</Td>
            <Td className="font-mono text-xs">6420-0913-04</Td>
            <Td>Tomorrow 09:00</Td>
            <Td><StatusPill tone="warning">Medium</StatusPill></Td>
            <Td>In progress</Td>
            <Td><Button variant="ghost" size="sm">View</Button></Td>
          </Row>
        </DataGrid>
      </Panel>
    </>
  );
}
