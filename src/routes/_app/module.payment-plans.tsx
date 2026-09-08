import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, Field, DataGrid, Row, Cell as Td, StatusPill } from "@/components/dms/kit";
import { Button } from "@/components/ui/button";
import { CalendarClock, Plus, Search, ArrowLeft, ArrowRight, Check } from "lucide-react";
import { ptps, formatKES } from "@/lib/dms-data";
import { useState } from "react";

export const Route = createFileRoute("/_app/module/payment-plans")({
  head: () => ({
    meta: [
      { title: "Payment Plans · NewTech CRS" },
      { name: "description", content: "Payment plan management: instalments, lump-sum settlement, settlement options, future-dated payments, auto-payment and affordability-based recommendations." },
    ],
  }),
  component: PaymentPlans,
});

function PaymentPlans() {
  const [showWizard, setShowWizard] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const [planType, setPlanType] = useState<"lump" | "installment" | "restructure">("installment");
  const [installments, setInstallments] = useState(6);
  const [frequency, setFrequency] = useState<"weekly" | "biweekly" | "monthly">("monthly");
  const [startDate, setStartDate] = useState("2026-09-15");

  const steps = ["Select Plan Type", "Configure Installments", "Review & Confirm"];

  const generatedSchedule = Array.from({ length: installments }, (_, i) => {
    const date = new Date(startDate);
    date.setMonth(date.getMonth() + i);
    return {
      number: i + 1,
      date: date.toISOString().split("T")[0],
      amount: Math.round(203900 / installments),
    };
  });

  if (showWizard) {
    return (
      <>
        <PageHeader
          title="Payment Plan Setup"
          subtitle="Create a new payment arrangement"
          breadcrumbs={[{ label: "Home", to: "/dashboard" }, { label: "Payment Plans" }, { label: "New Plan" }]}
          actions={
            <Button variant="outline" size="sm" onClick={() => setShowWizard(false)}>
              <ArrowLeft className="size-4 mr-2" /> Cancel
            </Button>
          }
        />

        <div className="max-w-3xl mx-auto mb-6">
          <div className="flex items-center justify-between">
            {steps.map((step, i) => (
              <div key={i} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      i + 1 <= wizardStep
                        ? "bg-brand-green text-white"
                        : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {i + 1 < wizardStep ? <Check className="size-4" /> : i + 1}
                  </div>
                  <span className="text-xs mt-2 text-center">{step}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-2 ${i + 1 < wizardStep ? "bg-brand-green" : "bg-border"}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {wizardStep === 1 && (
          <Panel title="Plan Type" description="Select the type of payment arrangement" className="max-w-3xl mx-auto">
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer hover:border-brand-green/50">
                <input
                  type="radio"
                  name="planType"
                  value="lump"
                  checked={planType === "lump"}
                  onChange={() => setPlanType("lump")}
                  className="w-4 h-4"
                />
                <div>
                  <div className="font-medium">Lump Sum</div>
                  <div className="text-sm text-muted-foreground">Single payment settlement</div>
                </div>
              </label>
              <label className="flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer hover:border-brand-green/50 border-brand-green bg-brand-green/5">
                <input
                  type="radio"
                  name="planType"
                  value="installment"
                  checked={planType === "installment"}
                  onChange={() => setPlanType("installment")}
                  className="w-4 h-4"
                />
                <div>
                  <div className="font-medium">Installment Plan</div>
                  <div className="text-sm text-muted-foreground">Multiple scheduled payments</div>
                </div>
              </label>
              <label className="flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer hover:border-brand-green/50">
                <input
                  type="radio"
                  name="planType"
                  value="restructure"
                  checked={planType === "restructure"}
                  onChange={() => setPlanType("restructure")}
                  className="w-4 h-4"
                />
                <div>
                  <div className="font-medium">Restructure / Hardship</div>
                  <div className="text-sm text-muted-foreground">Extended term with reduced payments</div>
                </div>
              </label>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setShowWizard(false)}>Cancel</Button>
              <Button className="gradient-brand" onClick={() => setWizardStep(2)}>
                Next <ArrowRight className="size-4 ml-2" />
              </Button>
            </div>
          </Panel>
        )}

        {wizardStep === 2 && (
          <Panel title="Installment Configuration" description="Configure payment schedule" className="max-w-3xl mx-auto">
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label className="text-sm font-medium mb-2 block">Number of Installments</label>
                <select
                  value={installments}
                  onChange={(e) => setInstallments(Number(e.target.value))}
                  className="w-full p-2 border border-border rounded-lg"
                >
                  <option value={3}>3</option>
                  <option value={6}>6</option>
                  <option value={12}>12</option>
                  <option value={24}>24</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Frequency</label>
                <select
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value as any)}
                  className="w-full p-2 border border-border rounded-lg"
                >
                  <option value="weekly">Weekly</option>
                  <option value="biweekly">Bi-weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full p-2 border border-border rounded-lg"
                />
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-medium mb-3">Generated Schedule</h3>
              <DataGrid columns={["Installment #", "Due Date", "Amount"]}>
                {generatedSchedule.map((item) => (
                  <Row key={item.number}>
                    <Td>{item.number}</Td>
                    <Td>{item.date}</Td>
                    <Td className="font-semibold">{formatKES(item.amount)}</Td>
                  </Row>
                ))}
              </DataGrid>
            </div>

            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={() => setWizardStep(1)}>
                <ArrowLeft className="size-4 mr-2" /> Back
              </Button>
              <Button className="gradient-brand" onClick={() => setWizardStep(3)}>
                Next <ArrowRight className="size-4 ml-2" />
              </Button>
            </div>
          </Panel>
        )}

        {wizardStep === 3 && (
          <Panel title="Review & Confirm" description="Review payment plan before activation" className="max-w-3xl mx-auto">
            <div className="grid gap-4 md:grid-cols-2">
              <Panel bodyClassName="p-4">
                <h3 className="font-medium mb-4">Plan Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Outstanding</span>
                    <span className="font-semibold">KES 201,900</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Restructure Fee</span>
                    <span className="font-semibold">KES 2,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">New Total</span>
                    <span className="font-semibold">KES 203,900</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Installment Amount</span>
                    <span className="font-semibold">{formatKES(Math.round(203900 / installments))}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">First Payment Date</span>
                    <span className="font-semibold">{startDate}</span>
                  </div>
                </div>
              </Panel>
              <Panel bodyClassName="p-4">
                <h3 className="font-medium mb-4">Account Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Account</span>
                    <span className="font-semibold">AC-20871</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Customer</span>
                    <span className="font-semibold">Mary Wanjiru</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Product</span>
                    <span className="font-semibold">Asset Finance</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Current DPD</span>
                    <span className="font-semibold">76</span>
                  </div>
                </div>
              </Panel>
            </div>

            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={() => setWizardStep(2)}>
                <ArrowLeft className="size-4 mr-2" /> Back
              </Button>
              <div className="flex gap-2">
                <Button variant="outline">Save as Draft</Button>
                <Button className="gradient-brand" onClick={() => setShowWizard(false)}>
                  <Check className="size-4 mr-2" /> Confirm Plan
                </Button>
              </div>
            </div>
          </Panel>
        )}
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="Payment Plans"
        subtitle="Payment plan and settlement management"
        breadcrumbs={[{ label: "Home", to: "/dashboard" }, { label: "Payment Plans" }]}
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-2">
              <Search className="size-4" /> Search
            </Button>
            <Button size="sm" className="gradient-brand gap-2" onClick={() => setShowWizard(true)}>
              <Plus className="size-4" /> New payment plan
            </Button>
          </>
        }
      />

      <div className="grid gap-5 md:grid-cols-4 mb-5">
        <Panel bodyClassName="p-4">
          <Field label="Active plans" value={ptps.filter(p => p.status === "Open").length} />
        </Panel>
        <Panel bodyClassName="p-4">
          <Field label="Kept promises" value={ptps.filter(p => p.status === "Kept").length} />
        </Panel>
        <Panel bodyClassName="p-4">
          <Field label="Broken promises" value={ptps.filter(p => p.status === "Broken").length} />
        </Panel>
        <Panel bodyClassName="p-4">
          <Field label="Total promised" value={formatKES(ptps.reduce((s, p) => s + p.amount, 0))} />
        </Panel>
      </div>

      <Panel title="Promises to pay" description="All PTPs and payment plans" bodyClassName="p-0">
        <DataGrid columns={["Account", "Customer", "Amount", "Due", "Channel", "Agent", "Status", ""]}>
          {ptps.map((p) => (
            <Row key={p.id}>
              <Td className="font-mono text-xs">{p.account}</Td>
              <Td>{p.customer}</Td>
              <Td className="font-semibold">{formatKES(p.amount)}</Td>
              <Td>{p.dueDate}</Td>
              <Td>{p.channel}</Td>
              <Td>{p.agent}</Td>
              <Td>
                <StatusPill tone={p.status === "Broken" ? "critical" : p.status === "Kept" ? "success" : "info"}>
                  {p.status}
                </StatusPill>
              </Td>
              <Td>
                <Button variant="ghost" size="sm">View</Button>
              </Td>
            </Row>
          ))}
        </DataGrid>
      </Panel>

      <Panel title="Settlement options" description="Pre-approved settlement offers" className="mt-5">
        <div className="grid gap-3 md:grid-cols-2">
          <div className="p-4 border border-border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Full & Final Settlement</span>
              <StatusPill tone="success">Available</StatusPill>
            </div>
            <p className="text-sm text-muted-foreground mb-3">Pay 85% of outstanding balance to close account</p>
            <Button size="sm" variant="outline" className="w-full">Offer to customer</Button>
          </div>
          <div className="p-4 border border-border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Restructure</span>
              <StatusPill tone="warning">Requires approval</StatusPill>
            </div>
            <p className="text-sm text-muted-foreground mb-3">Extend term with reduced instalments</p>
            <Button size="sm" variant="outline" className="w-full">Request approval</Button>
          </div>
        </div>
      </Panel>
    </>
  );
}
