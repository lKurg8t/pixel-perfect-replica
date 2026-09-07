import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  CalendarClock,
  ChevronDown,
  ChevronUp,
  FileText,
  Gavel,
  HandCoins,
  MessageSquare,
  Phone,
  Plus,
  Scale,
  StickyNote,
  User,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Cell as Td,
  DataGrid,
  Field,
  PageHeader,
  Panel,
  Row,
  StatusPill,
  toneForDpd,
  toneForStage,
} from "@/components/dms/kit";
import {
  activityTimeline,
  communications,
  findAccount,
  formatKES,
  legalCases,
  payments,
  ptps,
  STAGES,
  tasks,
} from "@/lib/dms-data";

export const Route = createFileRoute("/_app/workspace")({
  validateSearch: (s: Record<string, unknown>) => ({ account: (s.account as string) || "" }),
  head: () => ({
    meta: [
      { title: "Agent Workspace · NewTech CRS" },
      {
        name: "description",
        content:
          "Collections agent workspace: customer info, balances, PTPs, communications, notes, tasks, collateral, legal, workflow and quick actions.",
      },
      { property: "og:title", content: "Agent Workspace · NewTech CRS" },
      {
        property: "og:description",
        content: "Single-screen agent console for collections operations with all account context and actions.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Workspace,
});

function Workspace() {
  const { account: accountId } = Route.useSearch();
  const account = accountId ? findAccount(accountId) : null;
  const c = account?.customer;
  const stageIndex = account ? STAGES.indexOf(account.stage) : 0;
  const relatedCase = account ? legalCases.find((l) => l.account === account.accountNumber) : null;
  const [expandedSection, setExpandedSection] = useState<string | null>("customer");

  const quickActions = [
    { label: "Call customer", icon: Phone, primary: true },
    { label: "SMS / WhatsApp", icon: MessageSquare },
    { label: "Create PTP", icon: HandCoins },
    { label: "Record payment", icon: HandCoins },
    { label: "Payment plan", icon: CalendarClock },
    { label: "Add note", icon: StickyNote },
    { label: "Generate letter", icon: FileText },
    { label: "Escalate legal", icon: Gavel },
  ];

  if (!account) {
    return (
      <>
        <PageHeader
          title="Agent Workspace"
          subtitle="Select an account from the queue or search to begin work"
          breadcrumbs={[{ label: "Home", to: "/dashboard" }, { label: "Workspace" }]}
        />
        <Panel className="text-center py-12">
          <p className="text-muted-foreground mb-4">No account selected</p>
          <Button asChild className="gradient-brand">
            <Link to="/accounts">Browse accounts</Link>
          </Button>
        </Panel>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title={`${c?.name || "Unknown"}`}
        subtitle={`${account.accountNumber} · ${account.product} · ${account.stage}`}
        breadcrumbs={[
          { label: "Home", to: "/dashboard" },
          { label: "Accounts", to: "/accounts" },
          { label: "Workspace" },
        ]}
        actions={
          <>
            <Button variant="outline" size="sm">
              <X className="size-4 mr-2" /> Close account
            </Button>
            <Button size="sm" className="gradient-brand">
              <ArrowRight className="size-4 mr-2" /> Next in queue
            </Button>
          </>
        }
      />

      {account.status === "Litigation" && (
        <div className="mb-5 flex items-center gap-3 rounded-xl border border-critical/30 bg-critical/5 px-4 py-3">
          <AlertTriangle className="size-5 text-critical" />
          <div className="text-sm">
            <p className="font-semibold text-critical">Account locked — active litigation</p>
            <p className="text-muted-foreground">
              Collection contact, PTPs and settlement offers are blocked. Legal actions only via case{" "}
              {relatedCase?.id}.
            </p>
          </div>
          <Button variant="outline" size="sm" className="ml-auto" asChild>
            <Link to="/legal">Open case</Link>
          </Button>
        </div>
      )}

      <div className="grid gap-5 xl:grid-cols-4">
        {/* Left column - Account info and actions */}
        <div className="space-y-5 xl:col-span-1">
          <Panel title="Account status" bodyClassName="p-4">
            <div className="flex flex-wrap gap-2 mb-4">
              <StatusPill tone={toneForStage(account.stage)}>{account.stage}</StatusPill>
              <StatusPill tone={toneForDpd(account.dpd)}>{account.dpd} DPD</StatusPill>
              <StatusPill tone="info">{c?.segment}</StatusPill>
              <StatusPill tone={c?.risk === "Critical" || c?.risk === "High" ? "critical" : "success"}>
                Risk: {c?.risk}
              </StatusPill>
            </div>
            <dl className="space-y-3">
              <Field label="Outstanding" value={formatKES(account.outstanding)} />
              <Field label="Arrears" value={<span className="text-critical">{formatKES(account.arrears)}</span>} />
              <Field label="Last payment" value={`${formatKES(account.lastPayment.amount)} · ${account.lastPayment.date}`} />
              <Field label="Last contact" value={account.lastContact} />
              <Field label="Assigned agent" value={account.assignedAgent} />
              <Field label="Queue" value={account.queue} />
              <Field label="Score" value={`${account.score} (${account.scoreCategory})`} />
            </dl>
          </Panel>

          <Panel title="Quick actions" description="Permitted for this stage">
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map((a) => (
                <Button
                  key={a.label}
                  variant={a.primary ? "default" : "outline"}
                  size="sm"
                  disabled={account.status === "Litigation" && a.label !== "Escalate legal"}
                  className={`justify-start gap-2 ${a.primary ? "gradient-brand" : ""}`}
                >
                  <a.icon className="size-4" /> <span className="truncate text-xs">{a.label}</span>
                </Button>
              ))}
            </div>
          </Panel>

          <Panel title="Customer contact">
            <dl className="space-y-3">
              <Field label="Phone" value={c?.phone} />
              <Field label="Alternate" value={c?.altPhone} />
              <Field label="Email" value={c?.email} />
              <Field label="Address" value={c?.address} />
            </dl>
          </Panel>

          <Panel title="Compliance">
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Scale className="size-4 text-brand-green" /> Contact attempts today: 1 of 3
              </li>
              <li className="flex items-center gap-2">
                <Scale className="size-4 text-brand-green" /> Quiet hours: 20:00 – 08:00 EAT
              </li>
              <li className="flex items-center gap-2">
                <Scale className="size-4 text-brand-green" /> Consent: granted (SMS, Call, WhatsApp)
              </li>
            </ul>
          </Panel>
        </div>

        {/* Right columns - Expandable sections */}
        <div className="space-y-5 xl:col-span-3">
          <Panel title="Workflow position" bodyClassName="p-4">
            <ol className="flex flex-wrap items-center gap-2 mb-4">
              {STAGES.map((s, i) => (
                <li key={s} className="flex items-center gap-2">
                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                      i === stageIndex
                        ? "gradient-brand border-transparent text-primary-foreground"
                        : i < stageIndex
                          ? "border-brand-green/30 bg-brand-green-soft text-brand-green"
                          : "border-border bg-secondary text-muted-foreground"
                    }`}
                  >
                    {s}
                  </span>
                  {i < STAGES.length - 1 && <span className="text-muted-foreground">→</span>}
                </li>
              ))}
            </ol>
            <div className="grid gap-4 md:grid-cols-3">
              <Field label="Current strategy" value="STR-014 High Value Asset Finance" />
              <Field label="Workflow" value="WF-COLL-07 · step 3 of 6 · SLA 2h" />
              <Field label="Next action" value="Confirm restructure affordability — due today 14:00" />
            </div>
          </Panel>

          {/* Expandable sections */}
          <div className="space-y-3">
            {[
              { id: "customer", title: "Customer & related parties", icon: User },
              { id: "ptp", title: "Promises to pay (PTP)", icon: HandCoins, count: ptps.length },
              { id: "payments", title: "Payment history", icon: HandCoins, count: payments.length },
              { id: "communications", title: "Communication history", icon: MessageSquare, count: communications.length },
              { id: "tasks", title: "Tasks & reminders", icon: CalendarClock, count: tasks.length },
              { id: "activity", title: "Activity timeline", icon: StickyNote, count: activityTimeline.length },
              { id: "legal", title: "Legal & litigation", icon: Gavel },
              { id: "collateral", title: "Collateral", icon: FileText },
            ].map((section) => {
              const expanded = expandedSection === section.id;
              return (
                <Panel
                  key={section.id}
                  title={
                    <div className="flex items-center gap-2">
                      <section.icon className="size-4" />
                      {section.title}
                      {section.count && <span className="text-xs text-muted-foreground">({section.count})</span>}
                    </div>
                  }
                  actions={
                    <button
                      onClick={() => setExpandedSection(expanded ? null : section.id)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {expanded ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
                    </button>
                  }
                  bodyClassName={expanded ? "p-4" : "p-0"}
                >
                  {expanded && (
                    <>
                      {section.id === "customer" && (
                        <div className="grid gap-4 md:grid-cols-2">
                          <div>
                            <h4 className="text-sm font-semibold mb-2">Customer details</h4>
                            <dl className="space-y-2">
                              <Field label="Customer number" value={c?.customerNumber} />
                              <Field label="National ID" value={c?.nationalId} />
                              <Field label="Region" value={c?.region} />
                              <Field label="Preferred channel" value={c?.preferredChannel} />
                            </dl>
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold mb-2">Related parties</h4>
                            {c?.relatedParties.length ? (
                              <ul className="space-y-2">
                                {c.relatedParties.map((r) => (
                                  <li key={r.name} className="text-sm">
                                    <span className="font-medium">{r.name}</span>
                                    <span className="text-muted-foreground"> · {r.relationship} · {r.phone}</span>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-sm text-muted-foreground">No related parties</p>
                            )}
                          </div>
                        </div>
                      )}

                      {section.id === "ptp" && (
                        <DataGrid columns={["Amount", "Due", "Channel", "Agent", "Status"]}>
                          {ptps.map((p) => (
                            <Row key={p.id}>
                              <Td className="font-semibold">{formatKES(p.amount)}</Td>
                              <Td>{p.dueDate}</Td>
                              <Td>{p.channel}</Td>
                              <Td>{p.agent}</Td>
                              <Td>
                                <StatusPill tone={p.status === "Broken" ? "critical" : p.status === "Kept" ? "success" : "info"}>
                                  {p.status}
                                </StatusPill>
                              </Td>
                            </Row>
                          ))}
                        </DataGrid>
                      )}

                      {section.id === "payments" && (
                        <DataGrid columns={["Date", "Amount", "Method", "Reference", "Status"]}>
                          {payments.map((p) => (
                            <Row key={p.id}>
                              <Td>{p.date}</Td>
                              <Td className="font-semibold">{formatKES(p.amount)}</Td>
                              <Td>{p.method}</Td>
                              <Td className="font-mono text-xs">{p.reference}</Td>
                              <Td>
                                <StatusPill tone={p.status === "Posted" ? "success" : "critical"}>{p.status}</StatusPill>
                              </Td>
                            </Row>
                          ))}
                        </DataGrid>
                      )}

                      {section.id === "communications" && (
                        <DataGrid columns={["Date", "Channel", "Direction", "Status", "Outcome"]}>
                          {communications.map((m) => (
                            <Row key={m.id}>
                              <Td>{m.date}</Td>
                              <Td>{m.channel}</Td>
                              <Td>{m.direction}</Td>
                              <Td>
                                <StatusPill tone="info">{m.status}</StatusPill>
                              </Td>
                              <Td className="text-xs">{m.outcome}</Td>
                            </Row>
                          ))}
                        </DataGrid>
                      )}

                      {section.id === "tasks" && (
                        <DataGrid columns={["Task", "Due", "Priority", "Status"]}>
                          {tasks.map((t) => (
                            <Row key={t.id}>
                              <Td className="font-medium">{t.title}</Td>
                              <Td>{t.due}</Td>
                              <Td>
                                <StatusPill tone={t.priority === "High" ? "critical" : "warning"}>{t.priority}</StatusPill>
                              </Td>
                              <Td>{t.status}</Td>
                            </Row>
                          ))}
                        </DataGrid>
                      )}

                      {section.id === "activity" && (
                        <ol className="relative space-y-3 border-l border-border pl-5">
                          {activityTimeline.map((e) => (
                            <li key={e.id} className="relative">
                              <span className="absolute top-1.5 -left-[26px] size-2.5 rounded-full bg-brand-green" />
                              <p className="text-sm font-semibold">{e.action}</p>
                              <p className="text-sm text-muted-foreground">{e.outcome}</p>
                              <p className="mt-0.5 text-xs text-muted-foreground">
                                {e.when} · {e.who} · {e.channel}
                              </p>
                            </li>
                          ))}
                        </ol>
                      )}

                      {section.id === "legal" && (
                        relatedCase ? (
                          <dl className="grid grid-cols-2 gap-4 md:grid-cols-3">
                            <Field label="Case number" value={relatedCase.id} />
                            <Field label="Court" value={relatedCase.court} />
                            <Field label="Advocate" value={relatedCase.advocate} />
                            <Field label="Stage" value={relatedCase.stage} />
                            <Field label="Next hearing" value={relatedCase.nextHearing} />
                            <Field label="Legal costs" value={formatKES(relatedCase.costs)} />
                          </dl>
                        ) : (
                          <p className="text-sm text-muted-foreground">No litigation on this account</p>
                        )
                      )}

                      {section.id === "collateral" && (
                        <p className="text-sm text-muted-foreground">No collateral attached to this account</p>
                      )}
                    </>
                  )}
                </Panel>
              );
            })}
          </div>

          {/* Quick note input */}
          <Panel title="Add note" bodyClassName="p-4">
            <textarea
              placeholder="Enter note about this account or customer..."
              className="w-full min-h-[80px] rounded-lg border border-input bg-card px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/25"
            />
            <div className="mt-3 flex justify-end">
              <Button size="sm" className="gradient-brand gap-2">
                <Plus className="size-4" /> Save note
              </Button>
            </div>
          </Panel>
        </div>
      </div>
    </>
  );
}
