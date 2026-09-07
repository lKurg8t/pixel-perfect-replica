import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, Field, DataGrid, Row, Cell as Td, StatusPill } from "@/components/dms/kit";
import { Button } from "@/components/ui/button";
import { Building2, Plus, Search } from "lucide-react";
import { vendors, compactKES } from "@/lib/dms-data";

export const Route = createFileRoute("/_app/module/vendors")({
  head: () => ({
    meta: [
      { title: "Vendor & Partner Management · NewTech CRS" },
      { name: "description", content: "Vendor management: vendor directory, profiles, contracts, fee structures, SLAs, partner accounts, performance, recovery targets and reconciliation." },
    ],
  }),
  component: Vendors,
});

function Vendors() {
  return (
    <>
      <PageHeader
        title="Vendor & Partner Management"
        subtitle="External partners and vendor relationships"
        breadcrumbs={[{ label: "Home", to: "/dashboard" }, { label: "Vendors" }]}
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-2">
              <Search className="size-4" /> Search
            </Button>
            <Button size="sm" className="gradient-brand gap-2">
              <Plus className="size-4" /> Add vendor
            </Button>
          </>
        }
      />

      <div className="grid gap-5 md:grid-cols-4 mb-5">
        <Panel bodyClassName="p-4">
          <Field label="Total vendors" value={vendors.length} />
        </Panel>
        <Panel bodyClassName="p-4">
          <Field label="Active" value={vendors.filter(v => v.status === "Active").length} tone="success" />
        </Panel>
        <Panel bodyClassName="p-4">
          <Field label="Total placed" value={vendors.reduce((s, v) => s + v.placed, 0).toLocaleString()} />
        </Panel>
        <Panel bodyClassName="p-4">
          <Field label="Total recovered" value={compactKES(vendors.reduce((s, v) => s + v.recovered, 0))} />
        </Panel>
      </div>

      <Panel title="Vendor directory" description="All external partners and vendors" bodyClassName="p-0">
        <DataGrid columns={["Vendor", "Type", "Placed", "Value", "Recovered", "Rate", "Commission", "SLA", "Status", ""]}>
          {vendors.map((v) => (
            <Row key={v.id}>
              <Td className="font-medium">{v.name}</Td>
              <Td>{v.type}</Td>
              <Td>{v.placed}</Td>
              <Td className="font-semibold">{compactKES(v.value)}</Td>
              <Td className="font-semibold text-brand-green">{compactKES(v.recovered)}</Td>
              <Td>{v.rate}%</Td>
              <Td>{v.commission}%</Td>
              <Td>
                <StatusPill tone={v.sla >= 90 ? "success" : v.sla >= 80 ? "warning" : "critical"}>{v.sla}%</StatusPill>
              </Td>
              <Td>
                <StatusPill tone={v.status === "Active" ? "success" : "warning"}>{v.status}</StatusPill>
              </Td>
              <Td>
                <Button variant="ghost" size="sm">View</Button>
              </Td>
            </Row>
          ))}
        </DataGrid>
      </Panel>

      <Panel title="Performance league table" description="Vendor performance comparison" className="mt-5" bodyClassName="p-0">
        <DataGrid columns={["Rank", "Vendor", "Recovery Rate", "Commission", "SLA", "Status"]}>
          {vendors.map((v, i) => (
            <Row key={v.id}>
              <Td className="font-bold">#{i + 1}</Td>
              <Td className="font-medium">{v.name}</Td>
              <Td className="font-semibold">{v.rate}%</Td>
              <Td>{v.commission}%</Td>
              <Td>
                <StatusPill tone={v.sla >= 90 ? "success" : "warning"}>{v.sla}%</StatusPill>
              </Td>
              <Td>
                <StatusPill tone={v.status === "Active" ? "success" : "warning"}>{v.status}</StatusPill>
              </Td>
            </Row>
          ))}
        </DataGrid>
      </Panel>
    </>
  );
}
