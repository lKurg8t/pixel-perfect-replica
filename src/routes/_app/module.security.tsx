import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, Field, DataGrid, Row, Cell as Td, StatusPill } from "@/components/dms/kit";
import { Button } from "@/components/ui/button";
import { ShieldAlert, Plus, Search } from "lucide-react";

export const Route = createFileRoute("/_app/module/security")({
  head: () => ({
    meta: [
      { title: "Security UX · NewTech CRS" },
      { name: "description", content: "Security user experience: MFA, password policies, session management, access logs, security alerts and authentication settings." },
    ],
  }),
  component: Security,
});

function Security() {
  return (
    <>
      <PageHeader
        title="Security UX"
        subtitle="Authentication and access security"
        breadcrumbs={[{ label: "Home", to: "/dashboard" }, { label: "Security" }]}
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-2">
              <Search className="size-4" /> Search
            </Button>
            <Button size="sm" className="gradient-brand gap-2">
              <Plus className="size-4" /> Security settings
            </Button>
          </>
        }
      />

      <div className="grid gap-5 md:grid-cols-4 mb-5">
        <Panel bodyClassName="p-4">
          <Field label="Security score" value="A+" />
        </Panel>
        <Panel bodyClassName="p-4">
          <Field label="MFA enabled" value="94%" />
        </Panel>
        <Panel bodyClassName="p-4">
          <Field label="Failed logins" value="3" />
        </Panel>
        <Panel bodyClassName="p-4">
          <Field label="Active sessions" value="45" />
        </Panel>
      </div>

      <Panel title="Security settings" description="Authentication and access controls" bodyClassName="p-0">
        <DataGrid columns={["Setting", "Value", "Status", ""]}>
          <Row>
            <Td className="font-medium">Multi-factor authentication</Td>
            <Td>Required for all users</Td>
            <Td><StatusPill tone="success">Active</StatusPill></Td>
            <Td><Button variant="ghost" size="sm">Configure</Button></Td>
          </Row>
          <Row>
            <Td className="font-medium">Password policy</Td>
            <Td>Min 12 chars, special chars required</Td>
            <Td><StatusPill tone="success">Active</StatusPill></Td>
            <Td><Button variant="ghost" size="sm">Configure</Button></Td>
          </Row>
          <Row>
            <Td className="font-medium">Session timeout</Td>
            <Td>30 minutes inactivity</Td>
            <Td><StatusPill tone="success">Active</StatusPill></Td>
            <Td><Button variant="ghost" size="sm">Configure</Button></Td>
          </Row>
          <Row>
            <Td className="font-medium">IP whitelist</Td>
            <Td>Corporate network only</Td>
            <Td><StatusPill tone="warning">Partial</StatusPill></Td>
            <Td><Button variant="ghost" size="sm">Configure</Button></Td>
          </Row>
        </DataGrid>
      </Panel>

      <Panel title="Recent security events" description="Security-related activity" className="mt-5">
        <ul className="space-y-2">
          <li className="flex items-center justify-between p-3 border border-border rounded-lg">
            <div className="flex items-center gap-3">
              <ShieldAlert className="size-4 text-warning" />
              <div>
                <p className="font-medium">Failed login attempt</p>
                <p className="text-xs text-muted-foreground">user@example.com · 10 minutes ago</p>
              </div>
            </div>
            <StatusPill tone="warning">Investigated</StatusPill>
          </li>
          <li className="flex items-center justify-between p-3 border border-border rounded-lg">
            <div className="flex items-center gap-3">
              <ShieldAlert className="size-4 text-success" />
              <div>
                <p className="font-medium">MFA enabled</p>
                <p className="text-xs text-muted-foreground">john.doe@newtech.co.ke · 1 hour ago</p>
              </div>
            </div>
            <StatusPill tone="success">Completed</StatusPill>
          </li>
        </ul>
      </Panel>
    </>
  );
}
