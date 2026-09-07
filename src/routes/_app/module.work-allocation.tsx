import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, Field, DataGrid, Row, Cell as Td, StatusPill } from "@/components/dms/kit";
import { Button } from "@/components/ui/button";
import { Users, ArrowUpDown, Plus, Download } from "lucide-react";
import { compactKES } from "@/lib/dms-data";

export const Route = createFileRoute("/_app/module/work-allocation")({
  head: () => ({
    meta: [
      { title: "Work Allocation · NewTech CRS" },
      { name: "description", content: "Work allocation management: automatic/manual allocation, reassignment, team allocation, agent allocation, external partner allocation and capacity-aware routing." },
    ],
  }),
  component: WorkAllocation,
});

function WorkAllocation() {
  return (
    <>
      <PageHeader
        title="Work Allocation"
        subtitle="Automatic and manual work distribution"
        breadcrumbs={[{ label: "Home", to: "/dashboard" }, { label: "Work Allocation" }]}
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="size-4" /> Export
            </Button>
            <Button size="sm" className="gradient-brand gap-2">
              <Plus className="size-4" /> New allocation rule
            </Button>
          </>
        }
      />

      <div className="grid gap-5 md:grid-cols-3 mb-5">
        <Panel bodyClassName="p-4">
          <Field label="Auto-allocation" value="Enabled" />
        </Panel>
        <Panel bodyClassName="p-4">
          <Field label="Capacity-aware" value="Yes" />
        </Panel>
        <Panel bodyClassName="p-4">
          <Field label="Amount-based routing" value="Yes" />
        </Panel>
      </div>

      <Panel title="Allocation rules" description="Rules for automatic work distribution" bodyClassName="p-0">
        <DataGrid columns={["Rule", "Condition", "Target", "Priority", "Status", ""]}>
          <Row>
            <Td className="font-medium">High Value → Senior Agents</Td>
            <Td>Arrears &gt; KES 500K</Td>
            <Td>Senior Recovery Team</Td>
            <Td><StatusPill tone="critical">High</StatusPill></Td>
            <Td><StatusPill tone="success">Active</StatusPill></Td>
            <Td><Button variant="ghost" size="sm">Edit</Button></Td>
          </Row>
          <Row>
            <Td className="font-medium">Early Warning → Pool</Td>
            <Td>DPD 1-30</Td>
            <Td>Pre-Delinquency Pool</Td>
            <Td><StatusPill tone="warning">Medium</StatusPill></Td>
            <Td><StatusPill tone="success">Active</StatusPill></Td>
            <Td><Button variant="ghost" size="sm">Edit</Button></Td>
          </Row>
          <Row>
            <Td className="font-medium">Legal → External</Td>
            <Td>Stage = Legal</Td>
            <Td>Wachira & Co. Advocates</Td>
            <Td><StatusPill tone="critical">High</StatusPill></Td>
            <Td><StatusPill tone="success">Active</StatusPill></Td>
            <Td><Button variant="ghost" size="sm">Edit</Button></Td>
          </Row>
        </DataGrid>
      </Panel>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <Panel title="Team allocation" description="Assign work to teams">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div className="flex items-center gap-3">
                <Users className="size-4 text-brand-green" />
                <span className="font-medium">Team Alpha</span>
              </div>
              <span className="text-sm text-muted-foreground">412 accounts</span>
            </div>
            <div className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div className="flex items-center gap-3">
                <Users className="size-4 text-brand-blue" />
                <span className="font-medium">Team Beta</span>
              </div>
              <span className="text-sm text-muted-foreground">688 accounts</span>
            </div>
            <Button size="sm" variant="outline" className="w-full gap-2">
              <ArrowUpDown className="size-4" /> Rebalance teams
            </Button>
          </div>
        </Panel>

        <Panel title="External partners" description="Vendor allocation">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div>
                <p className="font-medium">Ridge Recoveries Ltd</p>
                <p className="text-xs text-muted-foreground">356 accounts · {compactKES(296_000_000)}</p>
              </div>
              <StatusPill tone="success">Active</StatusPill>
            </div>
            <Button size="sm" variant="outline" className="w-full gap-2">
              <Plus className="size-4" /> Add partner
            </Button>
          </div>
        </Panel>
      </div>
    </>
  );
}
