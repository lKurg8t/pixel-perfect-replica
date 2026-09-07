import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, Field, DataGrid, Row, Cell as Td, StatusPill } from "@/components/dms/kit";
import { Button } from "@/components/ui/button";
import { CalendarClock, Plus, Search } from "lucide-react";
import { ptps, formatKES } from "@/lib/dms-data";

export const Route = createFileRoute("/_app/module/payment-plans")({
  head: () => ({
    meta: [
      { title: "Payment Plans · NewTech CRS" },
      { name: "description", content: "Payment plan management: instalments, lump-sum settlement, settlement options, future-dated payments, auto-payment and affordability-based recommendations." },
    ],
  }),
  component: PaymentPlans,
});

function PaymentPlans() {
  return (
    <>
      <PageHeader
        title="Payment Plans"
        subtitle="Payment plan and settlement management"
        breadcrumbs={[{ label: "Home", to: "/dashboard" }, { label: "Payment Plans" }]}
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-2">
              <Search className="size-4" /> Search
            </Button>
            <Button size="sm" className="gradient-brand gap-2">
              <Plus className="size-4" /> New payment plan
            </Button>
          </>
        }
      />

      <div className="grid gap-5 md:grid-cols-4 mb-5">
        <Panel bodyClassName="p-4">
          <Field label="Active plans" value={ptps.filter(p => p.status === "Open").length} />
        </Panel>
        <Panel bodyClassName="p-4">
          <Field label="Kept promises" value={ptps.filter(p => p.status === "Kept").length} tone="success" />
        </Panel>
        <Panel bodyClassName="p-4">
          <Field label="Broken promises" value={ptps.filter(p => p.status === "Broken").length} tone="critical" />
        </Panel>
        <Panel bodyClassName="p-4">
          <Field label="Total promised" value={formatKES(ptps.reduce((s, p) => s + p.amount, 0))} />
        </Panel>
      </div>

      <Panel title="Promises to pay" description="All PTPs and payment plans" bodyClassName="p-0">
        <DataGrid columns={["Account", "Customer", "Amount", "Due", "Channel", "Agent", "Status", ""]}>
          {ptps.map((p) => (
            <Row key={p.id}>
              <Td className="font-mono text-xs">{p.account}</Td>
              <Td>{p.customer}</Td>
              <Td className="font-semibold">{formatKES(p.amount)}</Td>
              <Td>{p.dueDate}</Td>
              <Td>{p.channel}</Td>
              <Td>{p.agent}</Td>
              <Td>
                <StatusPill tone={p.status === "Broken" ? "critical" : p.status === "Kept" ? "success" : "info"}>
                  {p.status}
                </StatusPill>
              </Td>
              <Td>
                <Button variant="ghost" size="sm">View</Button>
              </Td>
            </Row>
          ))}
        </DataGrid>
      </Panel>

      <Panel title="Settlement options" description="Pre-approved settlement offers" className="mt-5">
        <div className="grid gap-3 md:grid-cols-2">
          <div className="p-4 border border-border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Full & Final Settlement</span>
              <StatusPill tone="success">Available</StatusPill>
            </div>
            <p className="text-sm text-muted-foreground mb-3">Pay 85% of outstanding balance to close account</p>
            <Button size="sm" variant="outline" className="w-full">Offer to customer</Button>
          </div>
          <div className="p-4 border border-border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Restructure</span>
              <StatusPill tone="warning">Requires approval</StatusPill>
            </div>
            <p className="text-sm text-muted-foreground mb-3">Extend term with reduced instalments</p>
            <Button size="sm" variant="outline" className="w-full">Request approval</Button>
          </div>
        </div>
      </Panel>
    </>
  );
}
