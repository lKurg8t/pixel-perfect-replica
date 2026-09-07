import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, Field, DataGrid, Row, Cell as Td, StatusPill } from "@/components/dms/kit";
import { Button } from "@/components/ui/button";
import { User, Plus, Search } from "lucide-react";

export const Route = createFileRoute("/_app/module/self-service")({
  head: () => ({
    meta: [
      { title: "Customer Self-Service · NewTech CRS" },
      { name: "description", content: "Customer self-service portal: account view, payment options, PTP requests, document upload, communication preferences and dispute resolution." },
    ],
  }),
  component: SelfService,
});

function SelfService() {
  return (
    <>
      <PageHeader
        title="Customer Self-Service"
        subtitle="Customer portal configuration"
        breadcrumbs={[{ label: "Home", to: "/dashboard" }, { label: "Self-Service" }]}
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-2">
              <Search className="size-4" /> Search
            </Button>
            <Button size="sm" className="gradient-brand gap-2">
              <Plus className="size-4" /> Configure
            </Button>
          </>
        }
      />

      <div className="grid gap-5 md:grid-cols-4 mb-5">
        <Panel bodyClassName="p-4">
          <Field label="Active users" value="1,234" />
        </Panel>
        <Panel bodyClassName="p-4">
          <Field label="Payments via portal" value="456" tone="success" />
        </Panel>
        <Panel bodyClassName="p-4">
          <Field label="PTP requests" value="89" tone="info" />
        </Panel>
        <Panel bodyClassName="p-4">
          <Field label="Satisfaction" value="4.6 / 5" tone="success" />
        </Panel>
      </div>

      <Panel title="Portal features" description="Available self-service options" bodyClassName="p-0">
        <DataGrid columns={["Feature", "Status", "Usage", ""]}>
          <Row>
            <Td className="font-medium">Account balance view</Td>
            <Td><StatusPill tone="success">Enabled</StatusPill></Td>
            <Td>2,345 views today</Td>
            <Td><Button variant="ghost" size="sm">Configure</Button></Td>
          </Row>
          <Row>
            <Td className="font-medium">Online payment</Td>
            <Td><StatusPill tone="success">Enabled</StatusPill></Td>
            <Td>456 payments today</Td>
            <Td><Button variant="ghost" size="sm">Configure</Button></Td>
          </Row>
          <Row>
            <Td className="font-medium">PTP request</Td>
            <Td><StatusPill tone="success">Enabled</StatusPill></Td>
            <Td>89 requests today</Td>
            <Td><Button variant="ghost" size="sm">Configure</Button></Td>
          </Row>
          <Row>
            <Td className="font-medium">Document upload</Td>
            <Td><StatusPill tone="success">Enabled</StatusPill></Td>
            <Td>23 uploads today</Td>
            <Td><Button variant="ghost" size="sm">Configure</Button></Td>
          </Row>
          <Row>
            <Td className="font-medium">Dispute resolution</Td>
            <Td><StatusPill tone="warning">Requires approval</StatusPill></Td>
            <Td>12 disputes pending</Td>
            <Td><Button variant="ghost" size="sm">Configure</Button></Td>
          </Row>
        </DataGrid>
      </Panel>

      <Panel title="Communication preferences" description="Customer consent management" className="mt-5">
        <div className="grid gap-3 md:grid-cols-2">
          <div className="p-4 border border-border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">SMS consent</span>
              <StatusPill tone="success">92% opted in</StatusPill>
            </div>
            <p className="text-sm text-muted-foreground">1,134 customers consent to SMS</p>
          </div>
          <div className="p-4 border border-border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Email consent</span>
              <StatusPill tone="success">88% opted in</StatusPill>
            </div>
            <p className="text-sm text-muted-foreground">1,086 customers consent to email</p>
          </div>
        </div>
      </Panel>
    </>
  );
}
