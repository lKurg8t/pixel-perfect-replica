import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  AlertTriangle,
  Ban,
  CalendarClock,
  FileText,
  Gavel,
  HandCoins,
  MessageSquare,
  Phone,
  Plus,
  Scale,
  StickyNote,
  Users,
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
  collateral,
  communications,
  findAccount,
  formatKES,
  legalCases,
  payments,
  ptps,
  STAGES,
  tasks,
} from "@/lib/dms-data";

export const Route = createFileRoute("/_app/accounts/$accountId")({
  head: () => ({
    meta: [
      { title: "Account 360° · NewTech CRS" },
      {
        name: "description",
        content:
          "Full account 360° view: customer, balances, transactions, promises, communications, notes, tasks, legal, collateral, workflow and audit history.",
      },
      { property: "og:title", content: "Account 360° · NewTech CRS" },
      {
        property: "og:description",
        content: "Chronological debt-card history with every contact, payment, promise and workflow event.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Account360,
  notFoundComponent: () => <p className="text-sm text-muted-foreground">Account not found in demo data.</p>,
});

const actions = [
  { label: "Call", icon: Phone },
  { label: "SMS / WhatsApp", icon: MessageSquare },
  { label: "Create PTP", icon: HandCoins },
  { label: "Record payment", icon: HandCoins },
  { label: "Payment plan", icon: CalendarClock },
  { label: "Add note", icon: StickyNote },
  { label: "Generate letter", icon: FileText },
  { label: "Escalate legal", icon: Gavel },
  { label: "Restrict account", icon: Ban },
];

function Account360() {
  const { accountId } = Route.useParams();
  const account = findAccount(accountId);
  if (!account) throw notFound();
  const c = account.customer;
  const stageIndex = STAGES.indexOf(account.stage);
  const relatedCase = legalCases.find((l) => l.account === account.accountNumber);
  const relatedCollateral = collateral.filter((x) => x.account === account.accountNumber);

  return (
    <>
      <PageHeader
        title={c.name}
        subtitle={`${c.customerNumber} · ${account.accountNumber} · ${account.product}`}
        breadcrumbs={[
          { label: "Home", to: "/dashboard" },
          { label: "Accounts", to: "/accounts" },
          { label: "Account 360°" },
        ]}
        actions={
          <>
            <Button variant="outline" size="sm">
              Change assignee
            </Button>
            <Button size="sm" className="gradient-brand gap-2" asChild>
              <Link to="/workspace" search={{ account: account.id }}>
                Open in workspace
              </Link>
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

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-5">
          <Panel bodyClassName="p-5">
            <div className="flex flex-wrap items-center gap-2">
              <StatusPill tone={toneForStage(account.stage)}>{account.stage}</StatusPill>
              <StatusPill tone={toneForDpd(account.dpd)}>{account.dpd} DPD</StatusPill>
              <StatusPill tone="info">{c.segment}</StatusPill>
              <StatusPill tone={c.risk === "Critical" || c.risk === "High" ? "critical" : "success"}>
                Risk: {c.risk}
              </StatusPill>
              <StatusPill tone="neutral">Preferred: {c.preferredChannel}</StatusPill>
              <StatusPill tone={c.contactability === "Right party" ? "success" : "warning"}>
                {c.contactability}
              </StatusPill>
              {c.restricted && <StatusPill tone="critical">Restricted</StatusPill>}
              <StatusPill tone="brand">{c.accounts.length} account(s)</StatusPill>
            </div>

            <dl className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4">
              <Field label="Outstanding" value={formatKES(account.outstanding)} />
              <Field label="Arrears" value={<span className="text-critical">{formatKES(account.arrears)}</span>} />
              <Field label="Principal" value={formatKES(account.principal)} />
              <Field label="Interest" value={formatKES(account.interest)} />
              <Field label="Fees" value={formatKES(account.fees)} />
              <Field label="Original amount" value={formatKES(account.originalAmount)} />
              <Field label="Due date" value={account.dueDate} />
              <Field
                label="Last payment"
                value={`${formatKES(account.lastPayment.amount)} · ${account.lastPayment.date}`}
              />
              <Field label="Last contact" value={account.lastContact} />
              <Field label="Assigned agent" value={account.assignedAgent} />
              <Field label="Queue" value={account.queue} />
              <Field label="Score" value={`${account.score} (${account.scoreCategory})`} />
            </dl>
          </Panel>

          <Panel title="Lifecycle position" description="Entry / exit criteria, strategy and permitted actions">
            <ol className="flex flex-wrap items-center gap-2">
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
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <Field label="Entry criteria" value="DPD ≥ 31 and no kept promise in 14 days" />
              <Field label="Exit criteria" value="Arrears cleared, or DPD ≥ 120 → Recovery" />
              <Field label="Current strategy" value="STR-014 High Value Asset Finance" />
              <Field label="Workflow" value="WF-COLL-07 · step 3 of 6 · SLA 2h" />
              <Field label="Next action" value="Confirm restructure affordability — due today 14:00" />
              <Field label="Escalation" value="Supervisor at SLA+1h, Legal at DPD 120" />
            </div>
          </Panel>

          <Tabs defaultValue="activity">
            <TabsList className="flex-wrap">
              {[
                "activity",
                "transactions",
                "ptp",
                "communications",
                "notes",
                "tasks",
                "legal",
                "collateral",
                "documents",
                "audit",
              ].map((t) => (
                <TabsTrigger key={t} value={t} className="capitalize">
                  {t}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="activity" className="mt-4">
              <Panel title="Debt card — chronological history">
                <ol className="relative space-y-4 border-l border-border pl-5">
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
              </Panel>
            </TabsContent>

            <TabsContent value="transactions" className="mt-4">
              <Panel bodyClassName="p-0" title="Payments & transactions">
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
              </Panel>
            </TabsContent>

            <TabsContent value="ptp" className="mt-4">
              <Panel bodyClassName="p-0" title="Promises to pay">
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
              </Panel>
            </TabsContent>

            <TabsContent value="communications" className="mt-4">
              <Panel bodyClassName="p-0" title="Communication history">
                <DataGrid columns={["Date", "Channel", "Direction", "Template", "Party", "Status", "Outcome"]}>
                  {communications.map((m) => (
                    <Row key={m.id}>
                      <Td>{m.date}</Td>
                      <Td>{m.channel}</Td>
                      <Td>{m.direction}</Td>
                      <Td className="font-mono text-xs">{m.template}</Td>
                      <Td className="text-xs">{m.party}</Td>
                      <Td>
                        <StatusPill tone="info">{m.status}</StatusPill>
                      </Td>
                      <Td className="text-xs">{m.outcome}</Td>
                    </Row>
                  ))}
                </DataGrid>
              </Panel>
            </TabsContent>

            <TabsContent value="notes" className="mt-4">
              <Panel title="Notes" actions={<Button size="sm" variant="outline" className="gap-1"><Plus className="size-3.5" /> Add note</Button>}>
                <ul className="space-y-3">
                  <li className="rounded-lg border border-border p-3">
                    <p className="text-sm">Customer confirmed contract payment delayed to 20 Sep; will pay KES 120,000 thereafter.</p>
                    <p className="mt-1 text-xs text-muted-foreground">05 Sep 2026 09:20 · Lee Kurgat</p>
                  </li>
                  <li className="rounded-lg border border-border p-3">
                    <p className="text-sm">Vehicle sighted in Nairobi CBD, good condition — field agent report attached.</p>
                    <p className="mt-1 text-xs text-muted-foreground">28 Aug 2026 16:02 · Sentinel Field Services</p>
                  </li>
                </ul>
              </Panel>
            </TabsContent>

            <TabsContent value="tasks" className="mt-4">
              <Panel bodyClassName="p-0" title="Tasks">
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
              </Panel>
            </TabsContent>

            <TabsContent value="legal" className="mt-4">
              <Panel title="Legal & litigation">
                {relatedCase ? (
                  <dl className="grid grid-cols-2 gap-4 md:grid-cols-3">
                    <Field label="Case number" value={relatedCase.id} />
                    <Field label="Court" value={relatedCase.court} />
                    <Field label="Advocate" value={relatedCase.advocate} />
                    <Field label="Stage" value={relatedCase.stage} />
                    <Field label="Next hearing" value={relatedCase.nextHearing} />
                    <Field label="Legal costs" value={formatKES(relatedCase.costs)} />
                  </dl>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No litigation on this account. Escalation to Legal becomes available at DPD 120.
                  </p>
                )}
              </Panel>
            </TabsContent>

            <TabsContent value="collateral" className="mt-4">
              <Panel bodyClassName="p-0" title="Collateral">
                <DataGrid columns={["Ref", "Type", "Description", "Value", "Valued", "Realisation"]}>
                  {(relatedCollateral.length ? relatedCollateral : collateral).map((x) => (
                    <Row key={x.id}>
                      <Td className="font-mono text-xs">{x.id}</Td>
                      <Td>{x.type}</Td>
                      <Td>{x.description}</Td>
                      <Td className="font-semibold">{formatKES(x.value)}</Td>
                      <Td>{x.valued}</Td>
                      <Td>
                        <StatusPill tone="warning">{x.realisation}</StatusPill>
                      </Td>
                    </Row>
                  ))}
                </DataGrid>
              </Panel>
            </TabsContent>

            <TabsContent value="documents" className="mt-4">
              <Panel title="Documents">
                <ul className="grid gap-2 md:grid-cols-2">
                  {["Loan agreement.pdf", "Demand letter 02.pdf", "Valuation report Mar-2026.pdf", "Field visit report.pdf"].map(
                    (d) => (
                      <li key={d} className="flex items-center gap-3 rounded-lg border border-border px-3 py-2 text-sm">
                        <FileText className="size-4 text-primary" /> {d}
                      </li>
                    ),
                  )}
                </ul>
              </Panel>
            </TabsContent>

            <TabsContent value="audit" className="mt-4">
              <Panel bodyClassName="p-0" title="Audit trail" description="Read-only, immutable record">
                <DataGrid columns={["When", "Who", "What", "Before", "After", "Outcome"]}>
                  {[
                    { w: "2026-09-07 11:04", who: "Lee Kurgat", what: "PTP created", b: "—", a: "KES 120,000", o: "Success" },
                    { w: "2026-09-05 09:12", who: "Lee Kurgat", what: "Contact outcome", b: "—", a: "RPC — promise", o: "Success" },
                    { w: "2026-08-22 12:48", who: "Strategy Engine", what: "Queue change", b: "Pool", a: "AF Arrears 60-90", o: "Success" },
                  ].map((r) => (
                    <Row key={r.w}>
                      <Td className="text-xs">{r.w}</Td>
                      <Td>{r.who}</Td>
                      <Td>{r.what}</Td>
                      <Td className="text-xs text-muted-foreground">{r.b}</Td>
                      <Td className="text-xs">{r.a}</Td>
                      <Td>
                        <StatusPill tone="success">{r.o}</StatusPill>
                      </Td>
                    </Row>
                  ))}
                </DataGrid>
              </Panel>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-5">
          <Panel title="Actions" description="Permitted for this stage and role">
            <div className="grid grid-cols-2 gap-2">
              {actions.map((a) => (
                <Button
                  key={a.label}
                  variant="outline"
                  size="sm"
                  disabled={account.status === "Litigation" && a.label !== "Escalate legal"}
                  className="justify-start gap-2"
                >
                  <a.icon className="size-4" /> <span className="truncate">{a.label}</span>
                </Button>
              ))}
            </div>
          </Panel>

          <Panel title="Customer" description="Contact and identifiers">
            <dl className="space-y-3">
              <Field label="Phone" value={c.phone} />
              <Field label="Alternate phone" value={c.altPhone} />
              <Field label="Email" value={c.email} />
              <Field label="Address" value={c.address} />
              <Field label="Region" value={c.region} />
              <Field label="National ID" value={c.nationalId} />
            </dl>
          </Panel>

          <Panel title="Other accounts" description="Consolidated exposure">
            <ul className="space-y-2">
              {c.accounts.map((a) => (
                <li key={a.id}>
                  <Link
                    to="/accounts/$accountId"
                    params={{ accountId: a.id }}
                    className={`block rounded-lg border px-3 py-2 text-sm transition-colors hover:border-primary/40 ${
                      a.id === account.id ? "border-primary/50 bg-secondary" : "border-border"
                    }`}
                  >
                    <span className="font-mono text-xs text-muted-foreground">{a.accountNumber}</span>
                    <span className="block font-medium">{a.product}</span>
                    <span className="text-xs text-muted-foreground">
                      {formatKES(a.outstanding)} · {a.dpd} DPD
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title="Related parties">
            {c.relatedParties.length ? (
              <ul className="space-y-2">
                {c.relatedParties.map((r) => (
                  <li key={r.name} className="flex items-start gap-2 text-sm">
                    <Users className="mt-0.5 size-4 text-muted-foreground" />
                    <span>
                      <span className="font-medium">{r.name}</span>
                      <span className="block text-xs text-muted-foreground">
                        {r.relationship} · {r.phone}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">No related parties captured.</p>
            )}
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
      </div>
    </>
  );
}
