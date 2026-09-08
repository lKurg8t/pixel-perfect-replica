import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, Field, DataGrid, Row, Cell as Td, StatusPill } from "@/components/dms/kit";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Search, TrendingUp } from "lucide-react";
import { customers } from "@/lib/dms-data";

export const Route = createFileRoute("/_app/module/early-warning")({
  head: () => ({
    meta: [
      { title: "Early Warning · NewTech CRS" },
      { name: "description", content: "Early warning system: risk signals, watchlists, pre-delinquency accounts, risk queues, risk scores, automated treatment and self-cure candidates." },
    ],
  }),
  component: EarlyWarning,
});

function EarlyWarning() {
  const earlyWarningAccounts = customers.filter(c => c.stage === "Pre-Delinquency" || c.stage === "Early Warning");

  return (
    <>
      <PageHeader
        title="Early Warning"
        subtitle="Pre-delinquency risk monitoring"
        breadcrumbs={[{ label: "Home", to: "/dashboard" }, { label: "Early Warning" }]}
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-2">
              <Search className="size-4" /> Search
            </Button>
            <Button size="sm" className="gradient-brand gap-2">
              <TrendingUp className="size-4" /> Run analysis
            </Button>
          </>
        }
      />

      <div className="grid gap-5 md:grid-cols-4 mb-5">
        <Panel bodyClassName="p-4">
          <Field label="At-risk accounts" value={earlyWarningAccounts.length} />
        </Panel>
        <Panel bodyClassName="p-4">
          <Field label="Self-cure candidates" value={customers.filter(c => c.segment === "Self-Cure").length} />
        </Panel>
        <Panel bodyClassName="p-4">
          <Field label="Hardship indicators" value={customers.filter(c => c.segment === "Hardship").length} />
        </Panel>
        <Panel bodyClassName="p-4">
          <Field label="Watchlist" value="23" />
        </Panel>
      </div>

      <Panel title="Risk signals" description="Accounts requiring attention" bodyClassName="p-0">
        <DataGrid columns={["Customer", "Account", "Stage", "Segment", "DPD", "Risk Signal", ""]}>
          {earlyWarningAccounts.slice(0, 5).map((c) => {
            const account = c.accounts[0];
            if (!account) return null;
            return (
              <Row key={c.id}>
                <Td className="font-medium">{c.name}</Td>
                <Td className="font-mono text-xs">{account.accountNumber}</Td>
                <Td>
                  <StatusPill tone={c.stage === "Early Warning" ? "warning" : "info"}>{c.stage}</StatusPill>
                </Td>
                <Td>{c.segment}</Td>
                <Td>{account.dpd}</Td>
                <Td>
                  <StatusPill tone="warning">
                    <AlertTriangle className="size-3 inline mr-1" />
                    Payment pattern change
                  </StatusPill>
                </Td>
                <Td>
                  <Button variant="ghost" size="sm">View</Button>
                </Td>
              </Row>
            );
          })}
        </DataGrid>
      </Panel>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <Panel title="Self-cure candidates" description="Accounts likely to self-cure">
          <ul className="space-y-2">
            {customers.filter(c => c.segment === "Self-Cure").map((c) => {
              const account = c.accounts[0];
              if (!account) return null;
              return (
                <li key={c.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div>
                    <p className="font-medium">{c.name}</p>
                    <p className="text-xs text-muted-foreground">{account.accountNumber} · {account.dpd} DPD</p>
                  </div>
                  <StatusPill tone="success">High probability</StatusPill>
                </li>
              );
            })}
          </ul>
        </Panel>

        <Panel title="Automated treatment" description="Pre-configured early warning actions">
          <ul className="space-y-2">
            <li className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div>
                <p className="font-medium">SMS Reminder</p>
                <p className="text-xs text-muted-foreground">DPD 1-7 · Template EW-REM-01</p>
              </div>
              <StatusPill tone="success">Active</StatusPill>
            </li>
            <li className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div>
                <p className="font-medium">Email Statement</p>
                <p className="text-xs text-muted-foreground">DPD 8-14 · Template EW-STMT-02</p>
              </div>
              <StatusPill tone="success">Active</StatusPill>
            </li>
          </ul>
        </Panel>
      </div>
    </>
  );
}
