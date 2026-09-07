import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Download, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataGrid, Cell as Td, KpiCard, PageHeader, Panel, Row, StatusPill, toneForDpd, toneForStage } from "@/components/dms/kit";
import {
  agentProductivity,
  allAccounts,
  channelEffectiveness,
  compactKES,
  dpdBuckets,
  funnel,
  kpis,
  ptps,
  queues,
  recoveryTrend,
} from "@/lib/dms-data";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({
    meta: [
      { title: "Collections Dashboard · NewTech CRS" },
      {
        name: "description",
        content:
          "Operational collections dashboard: portfolio, arrears, recovery and cure rates, lifecycle funnel, DPD distribution and agent productivity.",
      },
      { property: "og:title", content: "Collections Dashboard · NewTech CRS" },
      {
        property: "og:description",
        content: "Portfolio, arrears, recovery performance and queue health for the collections operation.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

const kpiLinks: Record<string, string> = {
  portfolio: "/accounts",
  arrears: "/accounts",
  recovery: "/module/analytics",
  cure: "/module/analytics",
  cost: "/module/analytics",
  ptp: "/module/payment-plans",
  rpc: "/module/communications",
  roll: "/module/segmentation",
  selfservice: "/module/self-service",
  npl: "/module/analytics",
  contact: "/module/communications",
  sla: "/queues",
};

function Dashboard() {
  const topPriority = [...allAccounts].sort((a, b) => b.arrears - a.arrears).slice(0, 6);

  return (
    <>
      <PageHeader
        title="Welcome back, Lee Kurgat"
        subtitle="Portfolio operations summary · Last updated 11:23 EAT · Demonstration data"
        breadcrumbs={[{ label: "Home", to: "/dashboard" }, { label: "Dashboard" }]}
        actions={
          <>
            <Button variant="outline" size="sm">
              Last 7 days
            </Button>
            <Button size="sm" className="gradient-brand gap-2">
              <Download className="size-4" /> Export report
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
        {kpis.map((k) => (
          <KpiCard
            key={k.key}
            label={k.label}
            value={k.value}
            delta={k.delta}
            hint={k.hint}
            tone={k.tone}
            to={kpiLinks[k.key]}
          />
        ))}
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-3">
        <Panel
          className="xl:col-span-2"
          title="Recovery & promise trend"
          description="KES millions collected against promised and target"
        >
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={recoveryTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis tickLine={false} axisLine={false} fontSize={12} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="recovered" stroke="var(--chart-1)" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="promised" stroke="var(--chart-2)" strokeWidth={2} dot={false} />
                <Line
                  type="monotone"
                  dataKey="target"
                  stroke="var(--chart-3)"
                  strokeWidth={2}
                  strokeDasharray="5 4"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="Collections lifecycle funnel" description="Click a stage to filter accounts">
          <ul className="space-y-2.5">
            {funnel.map((f, i) => {
              const width = 100 - i * 13;
              return (
                <li key={f.stage}>
                  <Link
                    to="/accounts"
                    search={{ stage: f.stage }}
                    className="block rounded-lg p-2 transition-colors hover:bg-secondary"
                  >
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{f.stage}</span>
                      <span className="text-muted-foreground">
                        {f.accounts.toLocaleString()} · KES {f.value}B
                      </span>
                    </div>
                    <div className="mt-1.5 h-2.5 rounded-full bg-secondary">
                      <div className="gradient-brand h-full rounded-full" style={{ width: `${width}%` }} />
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Panel>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-3">
        <Panel title="DPD distribution" description="Accounts per delinquency bucket">
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dpdBuckets}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="bucket" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis tickLine={false} axisLine={false} fontSize={12} />
                <Tooltip />
                <Bar dataKey="accounts" radius={[6, 6, 0, 0]}>
                  {dpdBuckets.map((_, i) => (
                    <Cell key={i} fill={i < 2 ? "var(--chart-1)" : i < 4 ? "var(--chart-3)" : "var(--chart-4)"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="Channel effectiveness" description="Contact rate vs PTP conversion (%)">
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={channelEffectiveness}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="channel" tickLine={false} axisLine={false} fontSize={11} />
                <YAxis tickLine={false} axisLine={false} fontSize={12} />
                <Tooltip />
                <Legend />
                <Bar dataKey="contact" fill="var(--chart-2)" radius={[6, 6, 0, 0]} />
                <Bar dataKey="ptp" fill="var(--chart-1)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel
          title="Queue volumes & SLA"
          description="Live operational queues"
          actions={
            <Link to="/queues" className="text-xs font-semibold text-primary hover:underline">
              Manage
            </Link>
          }
        >
          <ul className="space-y-2">
            {queues.slice(0, 6).map((q) => (
              <li key={q.id}>
                <Link
                  to="/queues"
                  className="flex items-center justify-between gap-3 rounded-lg border border-border px-3 py-2 transition-colors hover:bg-secondary"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{q.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {q.accounts} accounts · {q.value}
                    </p>
                  </div>
                  <StatusPill tone={q.breaches > 8 ? "critical" : q.breaches > 4 ? "warning" : "success"}>
                    {q.breaches} SLA
                  </StatusPill>
                </Link>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-3">
        <Panel
          className="xl:col-span-2"
          title="Top priority accounts"
          description="Highest arrears requiring action today"
          actions={
            <Link to="/accounts" className="text-xs font-semibold text-primary hover:underline">
              View all accounts
            </Link>
          }
          bodyClassName="p-0"
        >
          <DataGrid columns={["Customer", "Account", "Arrears", "DPD", "Stage", "Owner", ""]}>
            {topPriority.map((a) => (
              <Row key={a.id}>
                <Td>
                  <Link to="/accounts/$accountId" params={{ accountId: a.id }} className="font-semibold hover:text-primary">
                    {a.customer.name}
                  </Link>
                  <p className="text-xs text-muted-foreground">{a.customer.customerNumber}</p>
                </Td>
                <Td className="font-mono text-xs">{a.accountNumber}</Td>
                <Td className="font-semibold">{compactKES(a.arrears)}</Td>
                <Td>
                  <StatusPill tone={toneForDpd(a.dpd)}>{a.dpd} days</StatusPill>
                </Td>
                <Td>
                  <StatusPill tone={toneForStage(a.stage)}>{a.stage}</StatusPill>
                </Td>
                <Td className="text-xs text-muted-foreground">{a.assignedAgent}</Td>
                <Td>
                  <Link
                    to="/workspace"
                    search={{ account: a.id }}
                    className="text-xs font-semibold text-primary hover:underline"
                  >
                    Work
                  </Link>
                </Td>
              </Row>
            ))}
          </DataGrid>
        </Panel>

        <div className="space-y-5">
          <Panel title="PTP performance" description="Promises due this week">
            <ul className="space-y-2">
              {ptps.map((p) => (
                <li
                  key={p.id}
                  className="flex items-center justify-between gap-3 rounded-lg border border-border px-3 py-2"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{p.customer}</p>
                    <p className="text-xs text-muted-foreground">
                      {compactKES(p.amount)} · {p.dueDate}
                    </p>
                  </div>
                  <StatusPill tone={p.status === "Broken" ? "critical" : p.status === "Kept" ? "success" : "info"}>
                    {p.status}
                  </StatusPill>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title="Agent productivity" description="Today · team Alpha" bodyClassName="p-0">
            <DataGrid columns={["Agent", "Contacts", "PTP", "KES m", "SLA"]}>
              {agentProductivity.map((a) => (
                <Row key={a.agent}>
                  <Td className="text-sm font-medium">{a.agent}</Td>
                  <Td>{a.contacts}</Td>
                  <Td>{a.ptp}</Td>
                  <Td>{a.collected}</Td>
                  <Td>
                    <StatusPill tone={a.sla > 90 ? "success" : a.sla > 85 ? "warning" : "critical"}>{a.sla}%</StatusPill>
                  </Td>
                </Row>
              ))}
            </DataGrid>
          </Panel>

          <Panel title="Recovery forecast" description="Next 30 days, model-assisted">
            <div className="flex items-center gap-4">
              <span className="grid size-12 place-items-center rounded-xl bg-brand-green-soft text-brand-green">
                <TrendingUp className="size-6" />
              </span>
              <div>
                <p className="text-2xl font-bold">KES 318M</p>
                <p className="text-xs text-muted-foreground">
                  ±7.4% confidence · driven by 1,204 open promises
                </p>
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </>
  );
}
