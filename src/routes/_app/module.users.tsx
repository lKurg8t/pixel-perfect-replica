import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, Field, DataGrid, Row, Cell as Td, StatusPill } from "@/components/dms/kit";
import { Button } from "@/components/ui/button";
import { Users, Plus, Search } from "lucide-react";

export const Route = createFileRoute("/_app/module/users")({
  head: () => ({
    meta: [
      { title: "User Management · NewTech CRS" },
      { name: "description", content: "User management: user directory, roles, permissions, teams, onboarding, offboarding and user activity." },
    ],
  }),
  component: UserManagement,
});

function UserManagement() {
  const users = [
    { id: "USR-001", name: "John Doe", email: "john.doe@newtech.co.ke", role: "Collections Agent", team: "Team Alpha", status: "Active" },
    { id: "USR-002", name: "Jane Smith", email: "jane.smith@newtech.co.ke", role: "Senior Agent", team: "Team Beta", status: "Active" },
    { id: "USR-003", name: "Robert Kamau", email: "robert.kamau@newtech.co.ke", role: "Team Lead", team: "Team Alpha", status: "Active" },
    { id: "USR-004", name: "Grace Wanjiku", email: "grace.wanjiku@newtech.co.ke", role: "Manager", team: "Management", status: "Active" },
  ];

  return (
    <>
      <PageHeader
        title="User Management"
        subtitle="User accounts and permissions"
        breadcrumbs={[{ label: "Home", to: "/dashboard" }, { label: "Users" }]}
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-2">
              <Search className="size-4" /> Search
            </Button>
            <Button size="sm" className="gradient-brand gap-2">
              <Plus className="size-4" /> Add user
            </Button>
          </>
        }
      />

      <div className="grid gap-5 md:grid-cols-4 mb-5">
        <Panel bodyClassName="p-4">
          <Field label="Total users" value={users.length} />
        </Panel>
        <Panel bodyClassName="p-4">
          <Field label="Active" value={users.filter(u => u.status === "Active").length} />
        </Panel>
        <Panel bodyClassName="p-4">
          <Field label="Roles" value="8" />
        </Panel>
        <Panel bodyClassName="p-4">
          <Field label="Teams" value="4" />
        </Panel>
      </div>

      <Panel title="User directory" description="All system users" bodyClassName="p-0">
        <DataGrid columns={["ID", "Name", "Email", "Role", "Team", "Status", ""]}>
          {users.map((u) => (
            <Row key={u.id}>
              <Td className="font-mono text-xs">{u.id}</Td>
              <Td className="font-medium">{u.name}</Td>
              <Td className="text-xs">{u.email}</Td>
              <Td>{u.role}</Td>
              <Td>{u.team}</Td>
              <Td>
                <StatusPill tone="success">{u.status}</StatusPill>
              </Td>
              <Td>
                <Button variant="ghost" size="sm">Edit</Button>
              </Td>
            </Row>
          ))}
        </DataGrid>
      </Panel>

      <Panel title="Roles and permissions" description="System roles" className="mt-5">
        <div className="grid gap-3 md:grid-cols-2">
          <div className="p-4 border border-border rounded-lg">
            <p className="font-medium">Collections Agent</p>
            <p className="text-sm text-muted-foreground mt-1">View accounts, record notes, make calls</p>
          </div>
          <div className="p-4 border border-border rounded-lg">
            <p className="font-medium">Senior Agent</p>
            <p className="text-sm text-muted-foreground mt-1">All agent permissions + reassignment</p>
          </div>
          <div className="p-4 border border-border rounded-lg">
            <p className="font-medium">Team Lead</p>
            <p className="text-sm text-muted-foreground mt-1">Team management + reporting</p>
          </div>
          <div className="p-4 border border-border rounded-lg">
            <p className="font-medium">System Administrator</p>
            <p className="text-sm text-muted-foreground mt-1">Full system access</p>
          </div>
        </div>
      </Panel>
    </>
  );
}
