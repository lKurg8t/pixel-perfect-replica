import type { Role } from "./dms-data";

export type NavItem = {
  label: string;
  to: string;
  slug?: string;
  badge?: string;
  roles?: Role[];
  children?: { label: string; to: string }[];
};

export type NavGroup = { group: string; items: NavItem[] };

// `to` values point either at a purpose-built route or the generic module route.
export const navGroups: NavGroup[] = [
  {
    group: "Operations",
    items: [
      { label: "Dashboard", to: "/dashboard" },
      { label: "Agent Workspace", to: "/workspace", badge: "12" },
      { label: "Accounts & Customers", to: "/accounts" },
      { label: "Work Allocation", to: "/module/work-allocation" },
      { label: "Queues", to: "/queues", badge: "7" },
      { label: "Cases & Tasks", to: "/module/cases", badge: "4" },
    ],
  },
  {
    group: "Recovery",
    items: [
      { label: "Legal / Litigation", to: "/legal", badge: "2" },
      { label: "Collateral", to: "/module/collateral" },
      { label: "Vendors / Partners", to: "/module/vendors" },
      { label: "Payments", to: "/payments" },
      { label: "Payment Plans", to: "/module/payment-plans" },
    ],
  },
  {
    group: "Intelligence",
    items: [
      { label: "Segmentation & Scoring", to: "/module/segmentation" },
      { label: "Strategy Engine", to: "/module/strategy" },
      { label: "Workflow Engine", to: "/module/workflow" },
      { label: "Early Warning", to: "/module/early-warning", badge: "18" },
      { label: "AI / ML Centre", to: "/module/ai" },
      { label: "Analytics & Reporting", to: "/module/analytics" },
    ],
  },
  {
    group: "Engagement",
    items: [
      { label: "Communications", to: "/module/communications" },
      { label: "Self-Service Portal", to: "/module/self-service" },
      { label: "Notifications", to: "/module/notifications", badge: "3" },
      { label: "Internal Messaging", to: "/module/messaging" },
    ],
  },
  {
    group: "Governance",
    items: [
      { label: "Compliance & Audit", to: "/module/compliance" },
      { label: "Integrations", to: "/module/integrations", badge: "1" },
      { label: "User Management", to: "/module/users" },
      { label: "Admin / Configuration", to: "/module/admin" },
    ],
  },
];

export const roleVisibility: Record<string, string[]> = {
  "Collections Agent": [
    "/dashboard",
    "/workspace",
    "/accounts",
    "/queues",
    "/module/cases",
    "/payments",
    "/module/payment-plans",
    "/module/communications",
    "/module/notifications",
    "/module/messaging",
  ],
  "Legal Officer": [
    "/dashboard",
    "/accounts",
    "/legal",
    "/module/collateral",
    "/module/cases",
    "/module/compliance",
    "/module/notifications",
    "/module/messaging",
  ],
  "Compliance Officer": [
    "/dashboard",
    "/accounts",
    "/module/compliance",
    "/module/communications",
    "/module/analytics",
    "/module/notifications",
  ],
  "External Agent / Agency": ["/dashboard", "/workspace", "/accounts", "/queues", "/payments"],
  "Vendor Manager": ["/dashboard", "/module/vendors", "/module/analytics", "/payments", "/queues"],
  "Customer / Borrower": ["/module/self-service"],
};

export function visibleGroups(role: string): NavGroup[] {
  const allow = roleVisibility[role];
  if (!allow) return navGroups;
  return navGroups
    .map((g) => ({ ...g, items: g.items.filter((i) => allow.includes(i.to)) }))
    .filter((g) => g.items.length > 0);
}
