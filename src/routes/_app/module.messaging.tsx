import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, Field, DataGrid, Row, Cell as Td, StatusPill } from "@/components/dms/kit";
import { Button } from "@/components/ui/button";
import { MessageSquare, Plus, Search } from "lucide-react";

export const Route = createFileRoute("/_app/module/messaging")({
  head: () => ({
    meta: [
      { title: "Messaging · NewTech CRS" },
      { name: "description", content: "Internal messaging: team chat, agent collaboration, supervisor messages, escalation requests and internal communication." },
    ],
  }),
  component: Messaging,
});

function Messaging() {
  return (
    <>
      <PageHeader
        title="Messaging"
        subtitle="Internal team communication"
        breadcrumbs={[{ label: "Home", to: "/dashboard" }, { label: "Messaging" }]}
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-2">
              <Search className="size-4" /> Search
            </Button>
            <Button size="sm" className="gradient-brand gap-2">
              <Plus className="size-4" /> New message
            </Button>
          </>
        }
      />

      <div className="grid gap-5 md:grid-cols-4 mb-5">
        <Panel bodyClassName="p-4">
          <Field label="Total messages" value="156" />
        </Panel>
        <Panel bodyClassName="p-4">
          <Field label="Unread" value="12" />
        </Panel>
        <Panel bodyClassName="p-4">
          <Field label="Active chats" value="8" />
        </Panel>
        <Panel bodyClassName="p-4">
          <Field label="Escalations" value="3" />
        </Panel>
      </div>

      <Panel title="Message threads" description="Active conversations" bodyClassName="p-0">
        <DataGrid columns={["Thread", "Participants", "Last message", "Unread", ""]}>
          <Row>
            <Td className="font-medium">Queue reassignment request</Td>
            <Td>John Doe, Jane Smith</Td>
            <Td className="text-xs">10 minutes ago</Td>
            <Td><StatusPill tone="critical">2</StatusPill></Td>
            <Td><Button variant="ghost" size="sm">Open</Button></Td>
          </Row>
          <Row>
            <Td className="font-medium">Legal case escalation</Td>
            <Td>Legal Officer, Team Lead</Td>
            <Td className="text-xs">1 hour ago</Td>
            <Td><StatusPill tone="critical">1</StatusPill></Td>
            <Td><Button variant="ghost" size="sm">Open</Button></Td>
          </Row>
          <Row>
            <Td className="font-medium">Strategy review</Td>
            <Td>Manager, Analyst</Td>
            <Td className="text-xs">Yesterday</Td>
            <Td><StatusPill tone="success">0</StatusPill></Td>
            <Td><Button variant="ghost" size="sm">Open</Button></Td>
          </Row>
        </DataGrid>
      </Panel>

      <Panel title="Quick actions" description="Common messaging actions" className="mt-5">
        <div className="grid gap-3 md:grid-cols-2">
          <Button variant="outline" className="justify-start gap-2">
            <MessageSquare className=" size-4" /> Start team chat
          </Button>
          <Button variant="outline" className="justify-start gap-2">
            <MessageSquare className=" size-4" /> Escalate to supervisor
          </Button>
        </div>
      </Panel>
    </>
  );
}
