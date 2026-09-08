import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, Field, DataGrid, Row, Cell as Td, StatusPill } from "@/components/dms/kit";
import { Button } from "@/components/ui/button";
import { Bell, Plus, Search } from "lucide-react";
import { notifications } from "@/lib/dms-data";

export const Route = createFileRoute("/_app/module/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications · NewTech CRS" },
      { name: "description", content: "Notification management: in-app notifications, alerts, reminders, SLA warnings, system notifications and notification preferences." },
    ],
  }),
  component: Notifications,
});

function Notifications() {
  return (
    <>
      <PageHeader
        title="Notifications"
        subtitle="System notifications and alerts"
        breadcrumbs={[{ label: "Home", to: "/dashboard" }, { label: "Notifications" }]}
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-2">
              <Search className="size-4" /> Search
            </Button>
            <Button size="sm" className="gradient-brand gap-2">
              <Plus className="size-4" /> New notification
            </Button>
          </>
        }
      />

      <div className="grid gap-5 md:grid-cols-4 mb-5">
        <Panel bodyClassName="p-4">
          <Field label="Total notifications" value={notifications.length} />
        </Panel>
        <Panel bodyClassName="p-4">
          <Field label="Unread" value={notifications.filter(n => n.unread).length} />
        </Panel>
        <Panel bodyClassName="p-4">
          <Field label="High priority" value={notifications.filter(n => n.priority === "High" || n.priority === "Critical").length} />
        </Panel>
        <Panel bodyClassName="p-4">
          <Field label="SLA breaches" value={notifications.filter(n => n.type === "SLA breach").length} />
        </Panel>
      </div>

      <Panel title="Notification history" description="Recent system notifications" bodyClassName="p-0">
        <DataGrid columns={["Time", "Type", "Title", "Detail", "Priority", "Status", ""]}>
          {notifications.map((n) => (
            <Row key={n.id}>
              <Td className="text-xs">{n.time}</Td>
              <Td>
                <StatusPill tone={n.type === "SLA breach" ? "warning" : n.type === "Legal deadline" ? "critical" : "neutral"}>
                  {n.type}
                </StatusPill>
              </Td>
              <Td className="font-medium">{n.title}</Td>
              <Td className="text-xs">{n.detail}</Td>
              <Td>
                <StatusPill tone={n.priority === "Critical" ? "critical" : n.priority === "High" ? "warning" : "neutral"}>{n.priority}</StatusPill>
              </Td>
              <Td>
                <StatusPill tone={n.unread ? "critical" : "success"}>{n.unread ? "Unread" : "Read"}</StatusPill>
              </Td>
              <Td>
                <Button variant="ghost" size="sm">View</Button>
              </Td>
            </Row>
          ))}
        </DataGrid>
      </Panel>

      <Panel title="Notification preferences" description="Configure notification settings" className="mt-5">
        <div className="grid gap-3 md:grid-cols-2">
          <div className="p-4 border border-border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">In-app notifications</span>
              <StatusPill tone="success">Enabled</StatusPill>
            </div>
            <p className="text-sm text-muted-foreground">Show notifications in the app header</p>
          </div>
          <div className="p-4 border border-border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Email notifications</span>
              <StatusPill tone="success">Enabled</StatusPill>
            </div>
            <p className="text-sm text-muted-foreground">Send critical alerts via email</p>
          </div>
        </div>
      </Panel>
    </>
  );
}
