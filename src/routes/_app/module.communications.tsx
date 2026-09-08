import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, Field, DataGrid, Row, Cell as Td, StatusPill } from "@/components/dms/kit";
import { Button } from "@/components/ui/button";
import { MessageSquare, Plus, Search, Send, FileText, Phone, Mail, MessageCircle, Mic, Pause, PhoneOff, User } from "lucide-react";
import { communications } from "@/lib/dms-data";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/_app/module/communications")({
  head: () => ({
    meta: [
      { title: "Communications · NewTech CRS" },
      { name: "description", content: "Omnichannel communications: templates, campaigns, SMS, WhatsApp, email, IVR, letter generation, consent management and delivery tracking." },
    ],
  }),
  component: Communications,
});

function Communications() {
  const [callState, setCallState] = useState<"idle" | "active" | "wrapup">("idle");
  const [callSeconds, setCallSeconds] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isOnHold, setIsOnHold] = useState(false);
  const [disposition, setDisposition] = useState("");

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (callState === "active") {
      interval = setInterval(() => {
        setCallSeconds((s) => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [callState]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const startCall = () => setCallState("active");
  const endCall = () => setCallState("wrapup");
  const saveDisposition = () => {
    setCallState("idle");
    setCallSeconds(0);
    setDisposition("");
  };

  const channels = [
    { name: "SMS", icon: MessageSquare, count: communications.filter(c => c.channel === "SMS").length, color: "text-info" },
    { name: "WhatsApp", icon: MessageCircle, count: communications.filter(c => c.channel === "WhatsApp").length, color: "text-success" },
    { name: "Email", icon: Mail, count: communications.filter(c => c.channel === "Email").length, color: "text-brand-blue" },
    { name: "Call", icon: Phone, count: communications.filter(c => c.channel === "Call").length, color: "text-brand-green" },
    { name: "Letter", icon: FileText, count: communications.filter(c => c.channel === "Letter").length, color: "text-warning" },
  ];

  const templates = [
    { id: "EW-REM-01", name: "SMS Reminder - DPD 1-7", channel: "SMS", status: "Active", uses: 1234 },
    { id: "EW-REM-02", name: "SMS Reminder - DPD 8-14", channel: "SMS", status: "Active", uses: 856 },
    { id: "ARR-REM-02", name: "Arrears Reminder", channel: "SMS", status: "Active", uses: 2341 },
    { id: "WA-PTP-01", name: "WhatsApp PTP Follow-up", channel: "WhatsApp", status: "Active", uses: 567 },
    { id: "WA-REM-02", name: "WhatsApp Reminder", channel: "WhatsApp", status: "Active", uses: 445 },
    { id: "EM-STMT-04", name: "Email Statement", channel: "Email", status: "Active", uses: 856 },
    { id: "EM-PTP-03", name: "Email PTP Confirmation", channel: "Email", status: "Active", uses: 312 },
    { id: "LTR-DEM-01", name: "Demand Letter", channel: "Letter", status: "Active", uses: 89 },
    { id: "LTR-NOT-02", name: "Notice Letter", channel: "Letter", status: "Active", uses: 45 },
  ];

  const campaigns = [
    { id: "CMP-001", name: "September Collection Drive", status: "Active", sent: 4567, delivered: 4321, opened: 2890 },
    { id: "CMP-002", name: "Early Warning Outreach", status: "Active", sent: 2341, delivered: 2289, opened: 1567 },
    { id: "CMP-003", name: "Legal Notice Campaign", status: "Scheduled", sent: 0, delivered: 0, opened: 0 },
  ];

  return (
    <>
      <PageHeader
        title="Communications"
        subtitle="Omnichannel communication management"
        breadcrumbs={[{ label: "Home", to: "/dashboard" }, { label: "Communications" }]}
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-2">
              <Search className="size-4" /> Search
            </Button>
            <Button size="sm" className="gradient-brand gap-2">
              <Plus className="size-4" /> New campaign
            </Button>
          </>
        }
      />

      <div className="grid gap-5 md:grid-cols-5 mb-5">
        <Panel bodyClassName="p-4">
          <Field label="Total communications" value={communications.length} />
        </Panel>
        {channels.map((ch) => (
          <Panel key={ch.name} bodyClassName="p-4">
            <div className="flex items-center gap-2">
              <ch.icon className={`size-4 ${ch.color}`} />
              <Field label={ch.name} value={ch.count} />
            </div>
          </Panel>
        ))}
      </div>

      <Panel title="Click-to-Call (Soft Phone)" description="CTI-integrated dialer for outbound calls" className="mb-5">
        {callState === "idle" && (
          <div className="flex items-center gap-4 p-4 border border-border rounded-lg bg-secondary/30">
            <div className="w-12 h-12 rounded-full bg-brand-green/10 flex items-center justify-center">
              <User className="size-6 text-brand-green" />
            </div>
            <div className="flex-1">
              <div className="font-medium">Mary Wanjiru</div>
              <div className="text-sm text-muted-foreground">+254 712 345 678 · Account AC-10234</div>
              <StatusPill tone="success" className="mt-1 inline-flex">Connected: Dialer System (CTI)</StatusPill>
            </div>
            <Button className="gradient-brand gap-2" onClick={startCall}>
              <Phone className="size-4" /> Call Mary Wanjiru
            </Button>
          </div>
        )}

        {callState === "active" && (
          <div className="flex items-center gap-4 p-4 border-2 border-brand-green rounded-lg bg-brand-green/5">
            <div className="w-12 h-12 rounded-full bg-brand-green flex items-center justify-center animate-pulse">
              <Phone className="size-6 text-white" />
            </div>
            <div className="flex-1">
              <div className="font-medium">Mary Wanjiru</div>
              <div className="text-sm text-muted-foreground">+254 712 345 678 · Account AC-10234</div>
              <StatusPill tone="success" className="mt-1 inline-flex">● In call — {formatTime(callSeconds)}</StatusPill>
            </div>
            <div className="flex gap-2">
              <Button variant={isMuted ? "default" : "outline"} size="sm" onClick={() => setIsMuted(!isMuted)}>
                <Mic className="size-4" />
              </Button>
              <Button variant={isOnHold ? "default" : "outline"} size="sm" onClick={() => setIsOnHold(!isOnHold)}>
                <Pause className="size-4" />
              </Button>
              <Button variant="outline" size="sm">Transfer</Button>
              <Button variant="destructive" size="sm" onClick={endCall}>
                <PhoneOff className="size-4" /> End
              </Button>
            </div>
          </div>
        )}

        {callState === "wrapup" && (
          <div className="flex items-center gap-4 p-4 border border-border rounded-lg bg-secondary/30">
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
              <PhoneOff className="size-6 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <div className="font-medium">Call ended — duration {formatTime(callSeconds)}</div>
              <div className="text-sm text-muted-foreground">Select an outcome to log this call to the timeline</div>
            </div>
            <select
              value={disposition}
              onChange={(e) => setDisposition(e.target.value)}
              className="px-3 py-2 border border-border rounded-lg min-w-[200px]"
            >
              <option value="">Call disposition…</option>
              <option value="ptp">Promise to Pay</option>
              <option value="no-answer">No Answer</option>
              <option value="wrong-number">Wrong Number</option>
              <option value="callback">Call Back Later</option>
              <option value="dispute">Dispute Raised</option>
            </select>
            <Button className="gradient-brand" onClick={saveDisposition} disabled={!disposition}>
              Save
            </Button>
          </div>
        )}
      </Panel>

      <Panel title="Communication history" description="Recent communications across all channels" bodyClassName="p-0">
        <DataGrid columns={["Date", "Party", "Channel", "Direction", "Template", "Status", "Outcome", "Duration/Cost", ""]}>
          {communications.map((c) => (
            <Row key={c.id}>
              <Td className="text-xs">{c.date}</Td>
              <Td className="font-mono text-xs">{c.party}</Td>
              <Td>
                <StatusPill tone={c.channel === "SMS" ? "info" : c.channel === "Email" ? "success" : c.channel === "WhatsApp" ? "success" : c.channel === "Call" ? "brand" : "neutral"}>
                  {c.channel}
                </StatusPill>
              </Td>
              <Td>{c.direction}</Td>
              <Td className="text-xs">{c.template}</Td>
              <Td>
                <StatusPill tone={c.status === "Delivered" || c.status === "Answered" || c.status === "Opened" || c.status === "Read" ? "success" : c.status === "Failed" ? "critical" : "warning"}>
                  {c.status}
                </StatusPill>
              </Td>
              <Td className="text-xs">{c.outcome}</Td>
              <Td className="text-xs">{c.duration || c.cost || "—"}</Td>
              <Td>
                <Button variant="ghost" size="sm">View</Button>
              </Td>
            </Row>
          ))}
        </DataGrid>
      </Panel>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <Panel title="Active campaigns" description="Running communication campaigns">
          <div className="space-y-3">
            {campaigns.map((cmp) => (
              <div key={cmp.id} className="p-4 border border-border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{cmp.name}</span>
                  <StatusPill tone={cmp.status === "Active" ? "success" : "warning"}>{cmp.status}</StatusPill>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <p className="text-muted-foreground">Sent</p>
                    <p className="font-semibold">{cmp.sent.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Delivered</p>
                    <p className="font-semibold">{cmp.delivered.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Opened</p>
                    <p className="font-semibold">{cmp.opened.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Channel performance" description="Delivery rates by channel">
          <div className="space-y-3">
            {channels.map((ch) => {
              const channelComms = communications.filter(c => c.channel === ch.name);
              const delivered = channelComms.filter(c => c.status === "Delivered" || c.status === "Answered" || c.status === "Opened" || c.status === "Read").length;
              const rate = channelComms.length > 0 ? Math.round((delivered / channelComms.length) * 100) : 0;
              return (
                <div key={ch.name} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <ch.icon className={`size-4 ${ch.color}`} />
                    <span className="font-medium">{ch.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">{rate}%</p>
                    <p className="text-xs text-muted-foreground">{delivered}/{channelComms.length} delivered</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Panel>
      </div>

      <Panel title="Templates library" description="Communication templates by channel" className="mt-5" bodyClassName="p-0">
        <DataGrid columns={["ID", "Name", "Channel", "Status", "Uses this month", ""]}>
          {templates.map((t) => (
            <Row key={t.id}>
              <Td className="font-mono text-xs">{t.id}</Td>
              <Td className="font-medium">{t.name}</Td>
              <Td>
                <StatusPill tone={t.channel === "SMS" ? "info" : t.channel === "Email" ? "success" : t.channel === "WhatsApp" ? "success" : "neutral"}>
                  {t.channel}
                </StatusPill>
              </Td>
              <Td>
                <StatusPill tone="success">{t.status}</StatusPill>
              </Td>
              <Td>{t.uses.toLocaleString()}</Td>
              <Td>
                <Button variant="ghost" size="sm">Edit</Button>
              </Td>
            </Row>
          ))}
        </DataGrid>
      </Panel>

      <Panel title="Consent management" description="Customer communication consent status" className="mt-5">
        <div className="grid gap-3 md:grid-cols-4">
          <div className="p-4 border border-border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">SMS consent</span>
              <StatusPill tone="success">92%</StatusPill>
            </div>
            <p className="text-sm text-muted-foreground">1,134 customers consent to SMS</p>
          </div>
          <div className="p-4 border border-border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Email consent</span>
              <StatusPill tone="success">88%</StatusPill>
            </div>
            <p className="text-sm text-muted-foreground">1,086 customers consent to email</p>
          </div>
          <div className="p-4 border border-border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">WhatsApp consent</span>
              <StatusPill tone="success">76%</StatusPill>
            </div>
            <p className="text-sm text-muted-foreground">938 customers consent to WhatsApp</p>
          </div>
          <div className="p-4 border border-border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Call consent</span>
              <StatusPill tone="success">95%</StatusPill>
            </div>
            <p className="text-sm text-muted-foreground">1,171 customers consent to calls</p>
          </div>
        </div>
      </Panel>
    </>
  );
}
