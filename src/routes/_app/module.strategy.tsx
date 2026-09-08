import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, Field, DataGrid, Row, Cell as Td, StatusPill } from "@/components/dms/kit";
import { Button } from "@/components/ui/button";
import { GitBranch, Plus, Search, Play, Circle, Square, Diamond, Clock, ArrowUp } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_app/module/strategy")({
  head: () => ({
    meta: [
      { title: "Strategy Engine · NewTech CRS" },
      { name: "description", content: "Strategy management: strategy list, creation, rule builder, conditions, actions, stage conditions, routing, escalation and champion/challenger configuration." },
    ],
  }),
  component: Strategy,
});

function Strategy() {
  const [showBuilder, setShowBuilder] = useState(false);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const strategies = [
    { id: "STR-001", name: "Early Warning Treatment", stage: "Early Warning", status: "Active", version: "v2.1" },
    { id: "STR-014", name: "High Value Asset Finance", stage: "Active Collections", status: "Active", version: "v3.0" },
    { id: "STR-028", name: "Recovery Pipeline", stage: "Recovery", status: "Active", version: "v1.8" },
    { id: "STR-035", name: "Legal Escalation", stage: "Legal", status: "Draft", version: "v0.5" },
  ];

  const nodeTypes = [
    { id: "trigger", label: "Trigger", icon: Circle, description: "Entry point for strategy" },
    { id: "condition", label: "Condition", icon: Diamond, description: "Branching logic" },
    { id: "action", label: "Action", icon: Square, description: "Execute operation" },
    { id: "delay", label: "Wait / Delay", icon: Clock, description: "Time-based pause" },
    { id: "escalate", label: "Escalate", icon: ArrowUp, description: "Move to higher stage" },
  ];

  const strategyNodes = [
    { id: "n1", type: "trigger", x: 30, y: 36, label: "Trigger", sublabel: "Account enters 1–30 DPD" },
    { id: "n2", type: "condition", x: 230, y: 36, label: "Segment check", sublabel: "Segment = Early-Stage" },
    { id: "n3", type: "condition", x: 450, y: 36, label: "Score &gt; 700?", sublabel: "", selected: true },
    { id: "n4", type: "action", x: 650, y: 36, label: "Auto SMS + WhatsApp", sublabel: "Template EC-01" },
    { id: "n5", type: "action", x: 600, y: 150, label: "Assign Agent Queue", sublabel: "Priority = Medium" },
    { id: "n6", type: "escalate", x: 400, y: 230, label: "Escalate", sublabel: "3 attempts, no contact → Mid-Range" },
  ];

  if (showBuilder) {
    return (
      <>
        <PageHeader
          title="Strategy Builder"
          subtitle="Early-Stage Treatment Path"
          breadcrumbs={[{ label: "Home", to: "/dashboard" }, { label: "Strategy" }, { label: "Builder" }]}
          actions={
            <Button variant="outline" size="sm" onClick={() => setShowBuilder(false)}>
              Back to list
            </Button>
          }
        />

        <div className="flex gap-2 mb-4">
          <Button variant="outline" size="sm">Save Draft</Button>
          <Button className="gradient-brand" size="sm">Publish</Button>
          <Button variant="outline" size="sm">Version History</Button>
          <Button variant="outline" size="sm">Run Test Simulation</Button>
        </div>

        <div className="flex gap-4">
          <div className="w-40 flex-shrink-0">
            <div className="text-xs font-semibold text-muted-foreground mb-2">NODE PALETTE</div>
            <div className="space-y-2">
              {nodeTypes.map((nt) => (
                <Button
                  key={nt.id}
                  variant="outline"
                  size="sm"
                  className="w-full justify-start gap-2"
                >
                  <nt.icon className="size-4" />
                  {nt.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex-1 border border-border rounded-lg bg-secondary/10 min-h-[400px] relative p-4">
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
                </marker>
              </defs>
              <line x1="120" y1="60" x2="230" y2="60" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead)" />
              <line x1="360" y1="60" x2="450" y2="60" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead)" />
              <line x1="560" y1="70" x2="650" y2="70" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead)" />
              <line x1="530" y1="105" x2="600" y2="160" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead)" />
            </svg>

            {strategyNodes.map((node) => (
              <div
                key={node.id}
                onClick={() => setSelectedNode(node.id)}
                className={`absolute cursor-pointer transition-all ${
                  node.selected ? "border-2 border-brand-green bg-brand-green/10" : "border border-border bg-background"
                }`}
                style={{ left: `${node.x}px`, top: `${node.y}px`, width: node.type === "condition" ? "100px" : "140px" }}
              >
                <div className="p-3 text-center">
                  <div className="font-medium text-sm">{node.label}</div>
                  {node.sublabel && <div className="text-xs text-muted-foreground mt-1">{node.sublabel}</div>}
                </div>
              </div>
            ))}

            <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-muted-foreground italic">
              (canvas: pan / zoom / drag to connect nodes)
            </div>
          </div>

          <div className="w-56 flex-shrink-0">
            <div className="text-xs font-semibold text-muted-foreground mb-2">NODE PROPERTIES — "Score &gt; 700?"</div>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-muted-foreground block mb-1">Condition Field</label>
                <select className="w-full p-2 border border-border rounded-lg text-sm">
                  <option>Behaviour Score</option>
                  <option>DPD</option>
                  <option>Outstanding Balance</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-muted-foreground block mb-1">Operator</label>
                <select className="w-full p-2 border border-border rounded-lg text-sm">
                  <option>Greater than</option>
                  <option>Less than</option>
                  <option>Equal to</option>
                  <option>Not equal to</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-muted-foreground block mb-1">Threshold Value</label>
                <input type="number" defaultValue="700" className="w-full p-2 border border-border rounded-lg text-sm" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground block mb-1">Reconfigurable per portfolio?</label>
                <select className="w-full p-2 border border-border rounded-lg text-sm">
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="Strategy Engine"
        subtitle="Collections strategy and rule configuration"
        breadcrumbs={[{ label: "Home", to: "/dashboard" }, { label: "Strategy" }]}
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-2">
              <Search className="size-4" /> Search
            </Button>
            <Button size="sm" className="gradient-brand gap-2" onClick={() => setShowBuilder(true)}>
              <Plus className="size-4" /> New strategy
            </Button>
          </>
        }
      />

      <div className="grid gap-5 md:grid-cols-4 mb-5">
        <Panel bodyClassName="p-4">
          <Field label="Total strategies" value={strategies.length} />
        </Panel>
        <Panel bodyClassName="p-4">
          <Field label="Active" value={strategies.filter(s => s.status === "Active").length} />
        </Panel>
        <Panel bodyClassName="p-4">
          <Field label="Draft" value={strategies.filter(s => s.status === "Draft").length} />
        </Panel>
        <Panel bodyClassName="p-4">
          <Field label="Champion/Challenger" value="2" />
        </Panel>
      </div>

      <Panel title="Strategy library" description="All collection strategies" bodyClassName="p-0">
        <DataGrid columns={["ID", "Name", "Stage", "Version", "Status", ""]}>
          {strategies.map((s) => (
            <Row key={s.id}>
              <Td className="font-mono text-xs">{s.id}</Td>
              <Td className="font-medium">{s.name}</Td>
              <Td>{s.stage}</Td>
              <Td>{s.version}</Td>
              <Td>
                <StatusPill tone={s.status === "Active" ? "success" : "warning"}>{s.status}</StatusPill>
              </Td>
              <Td>
                <Button variant="ghost" size="sm">Edit</Button>
              </Td>
            </Row>
          ))}
        </DataGrid>
      </Panel>

      <Panel title="Rule builder" description="Create and edit strategy rules" className="mt-5">
        <div className="p-4 border border-border rounded-lg bg-secondary/30">
          <div className="flex items-center gap-2 mb-4">
            <GitBranch className="size-4 text-primary" />
            <span className="font-medium">IF DPD ≥ 31 AND Segment = "High Value"</span>
          </div>
          <div className="flex items-center gap-2 mb-4 ml-6">
            <GitBranch className="size-4 text-muted-foreground" />
            <span className="text-muted-foreground">THEN Assign to "AF Arrears 60-90" queue</span>
          </div>
          <div className="flex items-center gap-2 ml-6">
            <GitBranch className="size-4 text-muted-foreground" />
            <span className="text-muted-foreground">AND Set next action = "Contact customer"</span>
          </div>
          <div className="mt-4 flex gap-2">
            <Button size="sm" variant="outline" className="gap-2">
              <Play className="size-4" /> Simulate
            </Button>
            <Button size="sm" className="gradient-brand">Save rule</Button>
          </div>
        </div>
      </Panel>
    </>
  );
}
