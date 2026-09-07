import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Calendar,
  ChevronDown,
  ChevronUp,
  CreditCard,
  Download,
  Filter,
  HandCoins,
  MoreHorizontal,
  Plus,
  RefreshCw,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Cell as Td,
  DataGrid,
  Field,
  PageHeader,
  Panel,
  Row,
  StatusPill,
} from "@/components/dms/kit";
import { compactKES, formatKES, payments } from "@/lib/dms-data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Route = createFileRoute("/_app/payments")({
  head: () => ({
    meta: [
      { title: "Payments · NewTech CRS" },
      {
        name: "description",
        content:
          "Payment management: payment history, record payment, payment gateway status, M-Pesa, card, bank account, payment plans and settlement options.",
      },
      { property: "og:title", content: "Payments · NewTech CRS" },
      {
        property: "og:description",
        content: "View payment history, record new payments, manage payment plans, and track settlement options.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Payments,
});

function Payments() {
  const [expandedPayment, setExpandedPayment] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPayments = payments.filter(
    (p) =>
      !searchQuery ||
      p.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.account.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.customer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paymentStats = {
    total: payments.length,
    totalAmount: payments.reduce((sum, p) => sum + p.amount, 0),
    posted: payments.filter((p) => p.status === "Posted").length,
    failed: payments.filter((p) => p.status === "Failed").length,
    mPesa: payments.filter((p) => p.method === "M-Pesa").length,
    card: payments.filter((p) => p.method === "Card").length,
  };

  return (
    <>
      <PageHeader
        title="Payments"
        subtitle="Payment history and transaction management"
        breadcrumbs={[{ label: "Home", to: "/dashboard" }, { label: "Payments" }]}
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-2">
              <RefreshCw className="size-4" /> Refresh
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="size-4" /> Filters
            </Button>
            <Button size="sm" className="gradient-brand gap-2">
              <Download className="size-4" /> Export
            </Button>
            <Button size="sm" className="gradient-brand gap-2">
              <Plus className="size-4" /> Record payment
            </Button>
          </>
        }
      />

      {/* Payment stats */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-5 mb-5">
        <Panel bodyClassName="p-4">
          <Field label="Total payments" value={paymentStats.total} />
        </Panel>
        <Panel bodyClassName="p-4">
          <Field label="Total amount" value={compactKES(paymentStats.totalAmount)} />
        </Panel>
        <Panel bodyClassName="p-4">
          <Field label="Posted" value={paymentStats.posted} tone="success" />
        </Panel>
        <Panel bodyClassName="p-4">
          <Field label="Failed" value={paymentStats.failed} tone="critical" />
        </Panel>
        <Panel bodyClassName="p-4">
          <Field label="M-Pesa" value={paymentStats.mPesa} />
        </Panel>
      </div>

      {/* Search */}
      <Panel className="mb-5" bodyClassName="p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-[300px] flex-1">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by reference, account, customer or method..."
              className="h-10 w-full rounded-lg border border-input bg-card pr-3 pl-9 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/25"
            />
          </div>
          <select className="h-10 rounded-lg border border-input bg-card px-3 text-sm">
            <option>All statuses</option>
            <option>Posted</option>
            <option>Failed</option>
            <option>Pending</option>
          </select>
          <select className="h-10 rounded-lg border border-input bg-card px-3 text-sm">
            <option>All methods</option>
            <option>M-Pesa</option>
            <option>Card</option>
            <option>Bank transfer</option>
          </select>
          <input
            type="date"
            className="h-10 rounded-lg border border-input bg-card px-3 text-sm"
          />
        </div>
      </Panel>

      {/* Payment list */}
      <Panel title="Payment history" description="Click a payment to view details" bodyClassName="p-0">
        <DataGrid columns={["Date", "Reference", "Account", "Customer", "Amount", "Method", "Status", ""]}>
          {filteredPayments.map((p) => {
            const expanded = expandedPayment === p.id;
            return (
              <>
                <Row key={p.id}>
                  <Td>
                    <button
                      onClick={() => setExpandedPayment(expanded ? null : p.id)}
                      className="flex items-center gap-2 text-left"
                    >
                      {expanded ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
                      <span>{p.date}</span>
                    </button>
                  </Td>
                  <Td className="font-mono text-xs">{p.reference}</Td>
                  <Td className="font-mono text-xs">{p.account}</Td>
                  <Td>{p.customer}</Td>
                  <Td className="font-semibold">{formatKES(p.amount)}</Td>
                  <Td>
                    <StatusPill tone={p.method === "M-Pesa" ? "success" : p.method === "Card" ? "info" : "neutral"}>
                      {p.method}
                    </StatusPill>
                  </Td>
                  <Td>
                    <StatusPill tone={p.status === "Posted" ? "success" : "critical"}>{p.status}</StatusPill>
                  </Td>
                  <Td>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View details</DropdownMenuItem>
                        <DropdownMenuItem>View receipt</DropdownMenuItem>
                        {p.status === "Failed" && (
                          <>
                            <DropdownMenuItem>Retry payment</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Investigate failure</DropdownMenuItem>
                          </>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Reverse payment</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </Td>
                </Row>
                {expanded && (
                  <Row key={p.id + "-x"} className="bg-secondary/40">
                    <Td colSpan={8} className="px-6 py-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <h4 className="text-sm font-semibold mb-2">Payment details</h4>
                          <dl className="space-y-2">
                            <Field label="Reference" value={p.reference} />
                            <Field label="Payment date" value={p.date} />
                            <Field label="Payment method" value={p.method} />
                            <Field label="Status" value={p.status} />
                          </dl>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold mb-2">Account information</h4>
                          <dl className="space-y-2">
                            <Field label="Account number" value={p.account} />
                            <Field label="Customer" value={p.customer} />
                            <Field label="Amount" value={formatKES(p.amount)} />
                          </dl>
                        </div>
                      </div>
                      {p.status === "Failed" && (
                        <div className="mt-4 rounded-lg border border-critical/30 bg-critical/5 p-3">
                          <p className="text-sm font-semibold text-critical">Payment failed</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Reason: Insufficient funds or invalid transaction details
                          </p>
                          <div className="mt-2 flex gap-2">
                            <Button size="sm" variant="outline" className="gap-1">
                              <RefreshCw className="size-3" /> Retry
                            </Button>
                            <Button size="sm" variant="outline" className="gap-1">
                              View error details
                            </Button>
                          </div>
                        </div>
                      )}
                    </Td>
                  </Row>
                )}
              </>
            );
          })}
        </DataGrid>
      </Panel>

      {/* Quick actions */}
      <div className="mt-5 grid gap-5 md:grid-cols-3">
        <Panel title="Record payment" description="Manually record a payment">
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Account number"
              className="w-full h-10 rounded-lg border border-input bg-card px-3 text-sm"
            />
            <input
              type="number"
              placeholder="Amount"
              className="w-full h-10 rounded-lg border border-input bg-card px-3 text-sm"
            />
            <select className="w-full h-10 rounded-lg border border-input bg-card px-3 text-sm">
              <option>Select payment method</option>
              <option>M-Pesa</option>
              <option>Card</option>
              <option>Bank transfer</option>
              <option>Cash</option>
            </select>
            <Button size="sm" className="w-full gradient-brand gap-2">
              <HandCoins className="size-4" /> Record payment
            </Button>
          </div>
        </Panel>

        <Panel title="Payment methods" description="Gateway status">
          <ul className="space-y-2">
            <li className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <HandCoins className="size-4 text-success" />
                <span>M-Pesa (Daraja)</span>
              </div>
              <StatusPill tone="success">Connected</StatusPill>
            </li>
            <li className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <CreditCard className="size-4 text-success" />
                <span>Card Processor</span>
              </div>
              <StatusPill tone="success">Connected</StatusPill>
            </li>
            <li className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="size-4 text-warning" />
                <span>Bank Integration</span>
              </div>
              <StatusPill tone="warning">Degraded</StatusPill>
            </li>
          </ul>
        </Panel>

        <Panel title="Failed payments" description="Require attention">
          <ul className="space-y-2">
            {payments.filter((p) => p.status === "Failed").map((p) => (
              <li key={p.id} className="flex items-center justify-between rounded-lg border border-critical/30 bg-critical/5 px-3 py-2">
                <div>
                  <p className="text-sm font-medium">{p.reference}</p>
                  <p className="text-xs text-muted-foreground">{formatKES(p.amount)} · {p.method}</p>
                </div>
                <Button size="sm" variant="outline" className="gap-1">
                  <RefreshCw className="size-3" /> Retry
                </Button>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </>
  );
}
