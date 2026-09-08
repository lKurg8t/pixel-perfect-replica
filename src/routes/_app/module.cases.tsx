import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, Panel, Field, DataGrid, Row, Cell as Td, StatusPill } from "@/components/dms/kit";
import { Button } from "@/components/ui/button";
import { FileText, Plus, Search, X, CheckCircle, Clock, AlertCircle, Gavel } from "lucide-react";
import { legalCases, formatKES, compactKES } from "@/lib/dms-data";
import { useState } from "react";

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
  const [showCaseModal, setShowCaseModal] = useState(false);
  const [selectedCase, setSelectedCase] = useState(legalCases[0] || {
    id: "CASE-001",
    account: "AC-10234",
    customer: "Mary Wanjiru",
    court: "Milimani Commercial Court",
    stage: "Filing",
    claim: 150000,
    status: "Active",
  });

  const caseStages = [
    { id: "intake", label: "Intake", icon: FileText, status: "complete" },
    { id: "assessment", label: "Assessment", icon: Clock, status: "complete" },
    { id: "filing", label: "Filing", icon: AlertCircle, status: "active" },
    { id: "hearing", label: "Hearing", icon: Gavel, status: "pending" },
    { id: "judgment", label: "Judgment", icon: CheckCircle, status: "pending" },
  ];

  if (showCaseModal) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-border flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Case Details</h2>
              <p className="text-sm text-muted-foreground">{selectedCase.id} · {selectedCase.customer}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setShowCaseModal(false)}>
              <X className="size-4" />
            </Button>
          </div>

          <div className="p-6">
            <div className="mb-6">
              <h3 className="font-medium mb-4">Case Lifecycle</h3>
              <div className="flex items-center justify-between">
                {caseStages.map((stage, i) => (
                  <div key={stage.id} className="flex items-center flex-1">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          stage.status === "complete"
                            ? "bg-brand-green text-white"
                            : stage.status === "active"
                            ? "bg-brand-green text-white animate-pulse"
                            : "bg-secondary text-muted-foreground"
                        }`}
                      >
                        <stage.icon className="size-5" />
                      </div>
                      <span className="text-xs mt-2 font-medium">{stage.label}</span>
                    </div>
                    {i < caseStages.length - 1 && (
                      <div className={`flex-1 h-0.5 mx-2 ${
                        stage.status === "complete" ? "bg-brand-green" : "bg-border"
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 mb-6">
              <Panel bodyClassName="p-4">
                <h3 className="font-medium mb-3">Case Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Account</span>
                    <span className="font-mono">{selectedCase.account}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Court</span>
                    <span>{selectedCase.court}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Claim Amount</span>
                    <span className="font-semibold">{formatKES(selectedCase.claim)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Filed Date</span>
                    <span>2026-08-15</span>
                  </div>
                </div>
              </Panel>
              <Panel bodyClassName="p-4">
                <h3 className="font-medium mb-3">Parties</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Plaintiff</span>
                    <span>NewTech Finance Ltd</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Defendant</span>
                    <span>{selectedCase.customer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Legal Counsel</span>
                    <span>Mwangi & Co. Advocates</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Case Number</span>
                    <span className="font-mono">CC/2026/4567</span>
                  </div>
                </div>
              </Panel>
            </div>

            <Panel title="Documents" description="Case-related documents" className="mb-6" bodyClassName="p-0">
              <DataGrid columns={["Document", "Type", "Date", "Uploaded By", ""]}>
                <Row>
                  <Td className="font-medium">Demand Letter Pack</Td>
                  <Td>PDF</Td>
                  <td>2026-08-10</td>
                  <td>J. Otieno</td>
                  <Td><Button variant="ghost" size="sm">Download</Button></Td>
                </Row>
                <Row>
                  <Td className="font-medium">Statement of Claim</Td>
                  <Td>PDF</Td>
                  <td>2026-08-15</td>
                  <td>System</td>
                  <Td><Button variant="ghost" size="sm">Download</Button></Td>
                </Row>
                <Row>
                  <Td className="font-medium">Affidavit of Service</Td>
                  <Td>PDF</Td>
                  <td>2026-08-20</td>
                  <td>Field Agent</td>
                  <Td><Button variant="ghost" size="sm">Download</Button></Td>
                </Row>
              </DataGrid>
            </Panel>

            <div className="flex justify-end gap-2">
              <Button variant="outline">Add Document</Button>
              <Button variant="outline">Update Status</Button>
              <Button className="gradient-brand">Save Changes</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
          <Field label="Active" value={legalCases.filter(c => c.status === "Active").length} />
        </Panel>
        <Panel bodyClassName="p-4">
          <Field label="Pending execution" value={legalCases.filter(c => c.status === "Awaiting execution").length} />
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
                <Button variant="ghost" size="sm" onClick={() => { setSelectedCase(c); setShowCaseModal(true); }}>
                  View
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
