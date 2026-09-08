import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, Field, DataGrid, Row, Cell as Td, StatusPill } from "@/components/dms/kit";
import { Button } from "@/components/ui/button";
import { BarChart3, Download, Search } from "lucide-react";

export const Route = createFileRoute("/_app/module/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics & Reporting · NewTech CRS" },
      { name: "description", content: "Analytics and reporting: dashboards, reports, scheduled reports, custom reports, data export, KPIs and performance metrics." },
    ],
  }),
  component: Analytics,
});

function Analytics() {
  const reports = [
    { id: "RPT-001", name: "Daily Collections Summary", type: "Dashboard", frequency: "Daily", status: "Active" },
    { id: "RPT-012", name: "Recovery Forecast", type: "Report", frequency: "Weekly", status: "Active" },
    { id: "RPT-025", name: "Agent Performance", type: "Dashboard", frequency: "Daily", status: "Active" },
    { id: "RPT-034", name: "Vendor Performance", type: "Report", frequency: "Monthly", status: "Active" },
  ];

  return (
    <>
      <PageHeader
        title="Analytics & Reporting"
        subtitle="Business intelligence and reporting"
        breadcrumbs={[{ label: "Home", to: "/dashboard" }, { label: "Analytics" }]}
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-2">
              <Search className="size-4" /> Search
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="size-4" /> Export
            </Button>
            <Button size="sm" className="gradient-brand gap-2">
              <BarChart3 className="size-4" /> New report
            </Button>
          </>
        }
      />

      <div className="grid gap-5 md:grid-cols-4 mb-5">
        <Panel bodyClassName="p-4">
          <Field label="Total reports" value={reports.length} />
        </Panel>
        <Panel bodyClassName="p-4">
          <Field label="Dashboards" value={reports.filter(r => r.type === "Dashboard").length} />
        </Panel>
        <Panel bodyClassName="p-4">
          <Field label="Scheduled" value={reports.length} />
        </Panel>
        <Panel bodyClassName="p-4">
          <Field label="Last updated" value="Today 08:00" />
        </Panel>
      </div>

      <Panel title="Report library" description="All available reports and dashboards" bodyClassName="p-0">
        <DataGrid columns={["ID", "Name", "Type", "Frequency", "Status", ""]}>
          {reports.map((r) => (
            <Row key={r.id}>
              <Td className="font-mono text-xs">{r.id}</Td>
              <Td className="font-medium">{r.name}</Td>
              <Td>{r.type}</Td>
              <Td>{r.frequency}</Td>
              <Td>
                <StatusPill tone="success">{r.status}</StatusPill>
              </Td>
              <Td>
                <Button variant="ghost" size="sm">Open</Button>
              </Td>
            </Row>
          ))}
        </DataGrid>
      </Panel>

      <Panel title="Quick access" description="Frequently used reports" className="mt-5">
        <div className="grid gap-3 md:grid-cols-2">
          <div className="p-4 border border-border rounded-lg hover:border-brand-green/50 cursor-pointer">
            <p className="font-medium">Daily Collections Dashboard</p>
            <p className="text-sm text-muted-foreground mt-1">KPIs, recovery trends, queue volumes</p>
          </div>
          <div className="p-4 border border-border rounded-lg hover:border-brand-green/50 cursor-pointer">
            <p className="font-medium">Agent Performance Report</p>
            <p className="text-sm text-muted-foreground mt-1">Productivity, PTP rates, call metrics</p>
          </div>
        </div>
      </Panel>

      <Panel title="Agent Productivity Leaderboard" description="Top performing agents this month" className="mt-5" bodyClassName="p-0">
        <DataGrid columns={["Agent", "Contacts", "Promises", "Cash Collected", "PTP Rate", "Promise Kept Rate", ""]}>
          <Row>
            <Td className="font-medium">J. Otieno</Td>
            <Td>212</Td>
            <Td>48</Td>
            <Td className="font-semibold">KES 1.2M</Td>
            <Td>22.6%</Td>
            <Td>62.5%</Td>
            <Td><Button variant="ghost" size="sm">View</Button></Td>
          </Row>
          <Row>
            <Td className="font-medium">F. Achieng</Td>
            <Td>198</Td>
            <Td>41</Td>
            <Td className="font-semibold">KES 980K</Td>
            <Td>20.7%</Td>
            <Td>58.5%</Td>
            <Td><Button variant="ghost" size="sm">View</Button></Td>
          </Row>
          <Row>
            <Td className="font-medium">B. Kiptoo</Td>
            <Td>176</Td>
            <Td>36</Td>
            <Td className="font-semibold">KES 870K</Td>
            <Td>20.5%</Td>
            <Td>55.6%</Td>
            <Td><Button variant="ghost" size="sm">View</Button></Td>
          </Row>
          <Row>
            <Td className="font-medium">G. Mutiso</Td>
            <Td>165</Td>
            <Td>34</Td>
            <Td className="font-semibold">KES 760K</Td>
            <Td>20.6%</Td>
            <Td>52.9%</Td>
            <Td><Button variant="ghost" size="sm">View</Button></Td>
          </Row>
          <Row>
            <Td className="font-medium">D. Ochieng</Td>
            <Td>158</Td>
            <Td>32</Td>
            <Td className="font-semibold">KES 720K</Td>
            <Td>20.3%</Td>
            <Td>50.0%</Td>
            <Td><Button variant="ghost" size="sm">View</Button></Td>
          </Row>
        </DataGrid>
      </Panel>
    </>
  );
}
