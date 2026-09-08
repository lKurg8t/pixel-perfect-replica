import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, Field, DataGrid, Row, Cell as Td, StatusPill } from "@/components/dms/kit";
import { Button } from "@/components/ui/button";
import { User, Plus, Search, Send, Bot } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_app/module/self-service")({
  head: () => ({
    meta: [
      { title: "Customer Self-Service · NewTech CRS" },
      { name: "description", content: "Customer self-service portal: account view, payment options, PTP requests, document upload, communication preferences and dispute resolution." },
    ],
  }),
  component: SelfService,
});

function SelfService() {
  const [showChatbot, setShowChatbot] = useState(false);
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hi Jane – you have a payment of KES 15,000 due on 20 Sep. Want to set a reminder or talk about a payment plan?" },
  ]);
  const [inputText, setInputText] = useState("");

  const quickActions = [
    { label: "Set up a payment plan", action: "plan" },
    { label: "Make a payment now", action: "payment" },
    { label: "Talk to an agent", action: "agent" },
    { label: "Report hardship", action: "hardship" },
  ];

  const handleSend = () => {
    if (!inputText.trim()) return;
    setMessages([...messages, { role: "user", text: inputText }]);
    setInputText("");
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "ai", text: "I can help you with that. Let me check your account details..." }]);
    }, 1000);
  };

  const handleQuickAction = (action: string) => {
    setMessages([...messages, { role: "user", text: quickActions.find(a => a.action === action)?.label || "" }]);
    setTimeout(() => {
      if (action === "plan") {
        setMessages((prev) => [...prev, { role: "ai", text: "Sure – I can set up a 2-installment plan of KES 7,500 each. Shall I go ahead?" }]);
      } else if (action === "payment") {
        setMessages((prev) => [...prev, { role: "ai", text: "I'll redirect you to the payment page. You can pay via M-Pesa, card, or bank transfer." }]);
      } else if (action === "agent") {
        setMessages((prev) => [...prev, { role: "ai", text: "Connecting you to an agent now. Current wait time is approximately 2 minutes." }]);
      } else if (action === "hardship") {
        setMessages((prev) => [...prev, { role: "ai", text: "I understand. You can upload hardship documents through the portal. Would you like me to guide you through the process?" }]);
      }
    }, 1000);
  };

  if (showChatbot) {
    return (
      <>
        <PageHeader
          title="AI Chat Assistant"
          subtitle="Customer support chatbot"
          breadcrumbs={[{ label: "Home", to: "/dashboard" }, { label: "Self-Service" }, { label: "Chatbot" }]}
          actions={
            <Button variant="outline" size="sm" onClick={() => setShowChatbot(false)}>
              Back to portal
            </Button>
          }
        />

        <div className="grid gap-5 md:grid-cols-3">
          <div className="md:col-span-2">
            <Panel title="MyBank Assistant" description="AI-powered customer support" className="h-[500px] flex flex-col">
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      msg.role === "ai" ? "bg-brand-green text-white" : "bg-secondary"
                    }`}>
                      {msg.role === "ai" ? <Bot className="size-4" /> : <User className="size-4" />}
                    </div>
                    <div className={`max-w-[70%] p-3 rounded-lg ${
                      msg.role === "ai" ? "bg-secondary" : "bg-brand-green text-white"
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-border">
                <div className="flex gap-2 mb-3 flex-wrap">
                  {quickActions.map((qa) => (
                    <Button
                      key={qa.action}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickAction(qa.action)}
                    >
                      {qa.label}
                    </Button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Type a message…"
                    className="flex-1 px-3 py-2 border border-border rounded-lg"
                  />
                  <Button className="gradient-brand" onClick={handleSend}>
                    <Send className="size-4" />
                  </Button>
                </div>
              </div>
            </Panel>
          </div>
          <div>
            <Panel title="Your Accounts" description="Account summary">
              <div className="space-y-3">
                <div className="p-3 border border-border rounded-lg">
                  <div className="font-medium">AC-10234 – Personal Loan</div>
                  <div className="text-sm text-muted-foreground">KES 84,500 outstanding</div>
                </div>
                <div className="p-3 border border-border rounded-lg">
                  <div className="font-medium">AC-30044 – Overdraft</div>
                  <div className="text-sm text-muted-foreground">KES 12,000 outstanding</div>
                </div>
                <div className="p-3 border border-border rounded-lg bg-brand-green/5">
                  <div className="font-semibold">Total due: KES 96,500</div>
                </div>
              </div>
            </Panel>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="Customer Self-Service"
        subtitle="Customer portal configuration"
        breadcrumbs={[{ label: "Home", to: "/dashboard" }, { label: "Self-Service" }]}
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-2">
              <Search className="size-4" /> Search
            </Button>
            <Button variant="outline" size="sm" className="gap-2" onClick={() => setShowChatbot(true)}>
              <Bot className="size-4" /> Open Chatbot
            </Button>
            <Button size="sm" className="gradient-brand gap-2">
              <Plus className="size-4" /> Configure
            </Button>
          </>
        }
      />

      <div className="grid gap-5 md:grid-cols-4 mb-5">
        <Panel bodyClassName="p-4">
          <Field label="Active users" value="1,234" />
        </Panel>
        <Panel bodyClassName="p-4">
          <Field label="Payments via portal" value="456" />
        </Panel>
        <Panel bodyClassName="p-4">
          <Field label="PTP requests" value="89" />
        </Panel>
        <Panel bodyClassName="p-4">
          <Field label="Satisfaction" value="4.6 / 5" />
        </Panel>
      </div>

      <Panel title="Portal features" description="Available self-service options" bodyClassName="p-0">
        <DataGrid columns={["Feature", "Status", "Usage", ""]}>
          <Row>
            <Td className="font-medium">Account balance view</Td>
            <Td><StatusPill tone="success">Enabled</StatusPill></Td>
            <Td>2,345 views today</Td>
            <Td><Button variant="ghost" size="sm">Configure</Button></Td>
          </Row>
          <Row>
            <Td className="font-medium">Online payment</Td>
            <Td><StatusPill tone="success">Enabled</StatusPill></Td>
            <Td>456 payments today</Td>
            <Td><Button variant="ghost" size="sm">Configure</Button></Td>
          </Row>
          <Row>
            <Td className="font-medium">PTP request</Td>
            <Td><StatusPill tone="success">Enabled</StatusPill></Td>
            <Td>89 requests today</Td>
            <Td><Button variant="ghost" size="sm">Configure</Button></Td>
          </Row>
          <Row>
            <Td className="font-medium">Document upload</Td>
            <Td><StatusPill tone="success">Enabled</StatusPill></Td>
            <Td>23 uploads today</Td>
            <Td><Button variant="ghost" size="sm">Configure</Button></Td>
          </Row>
          <Row>
            <Td className="font-medium">Dispute resolution</Td>
            <Td><StatusPill tone="warning">Requires approval</StatusPill></Td>
            <Td>12 disputes pending</Td>
            <Td><Button variant="ghost" size="sm">Configure</Button></Td>
          </Row>
        </DataGrid>
      </Panel>

      <Panel title="Communication preferences" description="Customer consent management" className="mt-5">
        <div className="grid gap-3 md:grid-cols-2">
          <div className="p-4 border border-border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">SMS consent</span>
              <StatusPill tone="success">92% opted in</StatusPill>
            </div>
            <p className="text-sm text-muted-foreground">1,134 customers consent to SMS</p>
          </div>
          <div className="p-4 border border-border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Email consent</span>
              <StatusPill tone="success">88% opted in</StatusPill>
            </div>
            <p className="text-sm text-muted-foreground">1,086 customers consent to email</p>
          </div>
        </div>
      </Panel>
    </>
  );
}
