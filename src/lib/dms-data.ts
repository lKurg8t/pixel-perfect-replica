// Static demonstration data for the NewTech Collections & Recovery wireframe.
// Frontend-only: nothing here talks to a backend.

export type Stage =
  | "Pre-Delinquency"
  | "Early Warning"
  | "Active Collections"
  | "Recovery"
  | "Legal"
  | "Write-off";

export const STAGES: Stage[] = [
  "Pre-Delinquency",
  "Early Warning",
  "Active Collections",
  "Recovery",
  "Legal",
  "Write-off",
];

export type Segment = "Self-Cure" | "Responsive" | "Hard-to-Reach" | "High Value" | "Hardship";

export type AccountRecord = {
  id: string;
  accountNumber: string;
  product: string;
  outstanding: number;
  arrears: number;
  principal: number;
  interest: number;
  fees: number;
  dpd: number;
  originalAmount: number;
  dueDate: string;
  lastPayment: { date: string; amount: number };
  lastContact: string;
  assignedAgent: string;
  queue: string;
  stage: Stage;
  segment: Segment;
  score: number;
  scoreCategory: "Low" | "Medium" | "High";
  status: "Active" | "Restricted" | "Litigation" | "Closed";
  restricted?: boolean;
};

export type CustomerRecord = {
  id: string;
  customerNumber: string;
  name: string;
  phone: string;
  altPhone: string;
  email: string;
  address: string;
  region: string;
  nationalId: string;
  risk: "Low" | "Medium" | "High" | "Critical";
  segment: Segment;
  stage: Stage;
  preferredChannel: "Call" | "SMS" | "Email" | "WhatsApp";
  contactability: "Right party" | "Wrong party" | "Unreachable";
  restricted: boolean;
  relatedParties: { name: string; relationship: string; phone: string }[];
  accounts: AccountRecord[];
};

const money = (n: number) => n;

export const customers: CustomerRecord[] = [
  {
    id: "cus-100294",
    customerNumber: "CUS-100294",
    name: "Achieng' Wanjala Otieno",
    phone: "+254 722 481 903",
    altPhone: "+254 733 118 240",
    email: "a.otieno@mailworks.co.ke",
    address: "Riverbank Court, Apt 14B, Kilimani, Nairobi",
    region: "Nairobi Metro",
    nationalId: "23 884 117",
    risk: "High",
    segment: "High Value",
    stage: "Active Collections",
    preferredChannel: "Call",
    contactability: "Right party",
    restricted: false,
    relatedParties: [
      { name: "Brenda Otieno", relationship: "Spouse / Guarantor", phone: "+254 720 553 118" },
      { name: "Sunrise Hardware Ltd", relationship: "Employer", phone: "+254 20 221 4408" },
    ],
    accounts: [
      {
        id: "acc-88120441",
        accountNumber: "8812-0441-09",
        product: "Asset Finance — Toyota Hiace",
        outstanding: money(2418500),
        arrears: money(486200),
        principal: money(2114300),
        interest: money(248900),
        fees: money(55300),
        dpd: 74,
        originalAmount: money(4200000),
        dueDate: "2026-06-25",
        lastPayment: { date: "2026-08-14", amount: 65000 },
        lastContact: "2026-09-04",
        assignedAgent: "Lee Kurgat",
        queue: "AF Arrears 60-90",
        stage: "Active Collections",
        segment: "High Value",
        score: 612,
        scoreCategory: "Medium",
        status: "Active",
      },
      {
        id: "acc-51200877",
        accountNumber: "5120-0877-02",
        product: "Personal Unsecured Loan",
        outstanding: money(318400),
        arrears: money(94100),
        principal: money(281200),
        interest: money(31100),
        fees: money(6100),
        dpd: 41,
        originalAmount: money(600000),
        dueDate: "2026-07-28",
        lastPayment: { date: "2026-08-29", amount: 20000 },
        lastContact: "2026-09-01",
        assignedAgent: "Lee Kurgat",
        queue: "Unsecured 30-60",
        stage: "Active Collections",
        segment: "Responsive",
        score: 688,
        scoreCategory: "Medium",
        status: "Active",
      },
    ],
  },
  {
    id: "cus-100871",
    customerNumber: "CUS-100871",
    name: "Mwangi Njoroge Kamau",
    phone: "+254 711 209 664",
    altPhone: "+254 745 880 213",
    email: "mwangi.kamau@dukatech.co.ke",
    address: "Plot 221, Kiambu Road, Ruaka",
    region: "Central",
    nationalId: "19 552 903",
    risk: "Critical",
    segment: "Hard-to-Reach",
    stage: "Legal",
    preferredChannel: "WhatsApp",
    contactability: "Unreachable",
    restricted: true,
    relatedParties: [{ name: "Njoroge Holdings", relationship: "Co-borrower", phone: "+254 20 445 9021" }],
    accounts: [
      {
        id: "acc-77410032",
        accountNumber: "7741-0032-11",
        product: "SME Term Loan",
        outstanding: money(6842300),
        arrears: money(2140800),
        principal: money(6011000),
        interest: money(701400),
        fees: money(129900),
        dpd: 214,
        originalAmount: money(9500000),
        dueDate: "2026-02-10",
        lastPayment: { date: "2026-04-02", amount: 150000 },
        lastContact: "2026-08-19",
        assignedAgent: "Legal — Wachira & Co. Advocates",
        queue: "Litigation Pipeline",
        stage: "Legal",
        segment: "Hard-to-Reach",
        score: 388,
        scoreCategory: "High",
        status: "Litigation",
        restricted: true,
      },
    ],
  },
  {
    id: "cus-101433",
    customerNumber: "CUS-101433",
    name: "Fatuma Hussein Abdi",
    phone: "+254 799 664 210",
    altPhone: "+254 726 004 771",
    email: "fatuma.abdi@zawadicare.org",
    address: "Nyali Ridge, House 7, Mombasa",
    region: "Coast",
    nationalId: "31 220 448",
    risk: "Medium",
    segment: "Responsive",
    stage: "Early Warning",
    preferredChannel: "SMS",
    contactability: "Right party",
    restricted: false,
    relatedParties: [],
    accounts: [
      {
        id: "acc-33900218",
        accountNumber: "3390-0218-07",
        product: "Mortgage — Residential",
        outstanding: money(9120000),
        arrears: money(184500),
        principal: money(8890000),
        interest: money(203400),
        fees: money(26600),
        dpd: 12,
        originalAmount: money(12000000),
        dueDate: "2026-08-30",
        lastPayment: { date: "2026-08-30", amount: 92000 },
        lastContact: "2026-09-05",
        assignedAgent: "Grace Mutiso",
        queue: "Mortgage Early Warning",
        stage: "Early Warning",
        segment: "Responsive",
        score: 741,
        scoreCategory: "Low",
        status: "Active",
      },
    ],
  },
  {
    id: "cus-101905",
    customerNumber: "CUS-101905",
    name: "Peter Barasa Simiyu",
    phone: "+254 718 330 552",
    altPhone: "+254 701 224 889",
    email: "p.simiyu@westlinkagro.co.ke",
    address: "Kanduyi Business Park, Bungoma",
    region: "Western",
    nationalId: "27 991 034",
    risk: "High",
    segment: "Hardship",
    stage: "Recovery",
    preferredChannel: "Call",
    contactability: "Right party",
    restricted: false,
    relatedParties: [{ name: "Westlink Agro Ltd", relationship: "Employer", phone: "+254 55 300 118" }],
    accounts: [
      {
        id: "acc-64200913",
        accountNumber: "6420-0913-04",
        product: "Agri Equipment Finance",
        outstanding: money(1780400),
        arrears: money(742000),
        principal: money(1502000),
        interest: money(238100),
        fees: money(40300),
        dpd: 156,
        originalAmount: money(3100000),
        dueDate: "2026-04-15",
        lastPayment: { date: "2026-07-11", amount: 35000 },
        lastContact: "2026-09-02",
        assignedAgent: "Dennis Ochieng",
        queue: "Recovery 150+",
        stage: "Recovery",
        segment: "Hardship",
        score: 452,
        scoreCategory: "High",
        status: "Active",
      },
    ],
  },
  {
    id: "cus-102244",
    customerNumber: "CUS-102244",
    name: "Salome Cheptoo Rono",
    phone: "+254 733 812 004",
    altPhone: "+254 715 660 231",
    email: "salome.rono@highlandsdairy.co.ke",
    address: "Milimani Estate, Eldoret",
    region: "Rift Valley",
    nationalId: "34 118 620",
    risk: "Low",
    segment: "Self-Cure",
    stage: "Pre-Delinquency",
    preferredChannel: "Email",
    contactability: "Right party",
    restricted: false,
    relatedParties: [],
    accounts: [
      {
        id: "acc-29100554",
        accountNumber: "2910-0554-08",
        product: "Salary Advance",
        outstanding: money(148200),
        arrears: money(0),
        principal: money(142000),
        interest: money(5100),
        fees: money(1100),
        dpd: 0,
        originalAmount: money(300000),
        dueDate: "2026-09-28",
        lastPayment: { date: "2026-08-28", amount: 26000 },
        lastContact: "2026-08-20",
        assignedAgent: "Unassigned — Pool",
        queue: "Pre-Delinquency Watch",
        stage: "Pre-Delinquency",
        segment: "Self-Cure",
        score: 812,
        scoreCategory: "Low",
        status: "Active",
      },
    ],
  },
  {
    id: "cus-102890",
    customerNumber: "CUS-102890",
    name: "Ibrahim Kiptanui Lagat",
    phone: "+254 702 447 118",
    altPhone: "+254 738 220 905",
    email: "i.lagat@matatusacco.co.ke",
    address: "Kapsoya, Uasin Gishu",
    region: "Rift Valley",
    nationalId: "22 470 913",
    risk: "Critical",
    segment: "Hard-to-Reach",
    stage: "Write-off",
    preferredChannel: "Call",
    contactability: "Wrong party",
    restricted: true,
    relatedParties: [],
    accounts: [
      {
        id: "acc-90100177",
        accountNumber: "9010-0177-03",
        product: "PSV Asset Finance",
        outstanding: money(3410000),
        arrears: money(3410000),
        principal: money(2980000),
        interest: money(361000),
        fees: money(69000),
        dpd: 468,
        originalAmount: money(5400000),
        dueDate: "2025-05-20",
        lastPayment: { date: "2025-11-04", amount: 40000 },
        lastContact: "2026-06-30",
        assignedAgent: "Ridge Recoveries Ltd (Vendor)",
        queue: "Vendor Placement — Ridge",
        stage: "Write-off",
        segment: "Hard-to-Reach",
        score: 291,
        scoreCategory: "High",
        status: "Restricted",
        restricted: true,
      },
    ],
  },
];

export const allAccounts = customers.flatMap((c) =>
  c.accounts.map((a) => ({ ...a, customer: c })),
);

export function findCustomer(id: string) {
  return customers.find((c) => c.id === id || c.customerNumber.toLowerCase() === id.toLowerCase());
}

export function findAccount(id: string) {
  return allAccounts.find((a) => a.id === id || a.accountNumber === id);
}

export const totals = {
  portfolio: 41_820_000_000,
  arrears: 3_142_800_000,
  accounts: 18_442,
  customers: 14_907,
};

export const kpis = [
  { key: "portfolio", label: "Total Portfolio", value: "KES 41.8B", delta: "+2.1%", tone: "info", hint: "18,442 accounts" },
  { key: "arrears", label: "Total Arrears", value: "KES 3.14B", delta: "-1.4%", tone: "critical", hint: "7.5% of book" },
  { key: "recovery", label: "Recovery Rate", value: "38.6%", delta: "+3.2pp", tone: "success", hint: "Rolling 90 days" },
  { key: "cure", label: "Cure Rate", value: "62.4%", delta: "+1.8pp", tone: "success", hint: "Bucket 1-30" },
  { key: "cost", label: "Cost-to-Collect", value: "4.9%", delta: "-0.3pp", tone: "info", hint: "Of amount recovered" },
  { key: "ptp", label: "Kept-Promise Rate", value: "71.2%", delta: "+4.1pp", tone: "success", hint: "1,204 PTPs due" },
  { key: "rpc", label: "Right-Party Contact", value: "54.8%", delta: "-2.2pp", tone: "warning", hint: "All channels" },
  { key: "roll", label: "Roll-Forward Rate", value: "9.3%", delta: "+0.6pp", tone: "critical", hint: "Bucket migration" },
  { key: "selfservice", label: "Self-Service Adoption", value: "27.5%", delta: "+6.4pp", tone: "success", hint: "Portal & chatbot" },
  { key: "npl", label: "NPL Movement", value: "+KES 118M", delta: "+0.9%", tone: "warning", hint: "Month on month" },
  { key: "contact", label: "Contact Rate", value: "68.1%", delta: "+1.1pp", tone: "info", hint: "Attempted vs reached" },
  { key: "sla", label: "SLA Breaches", value: "43", delta: "+7", tone: "critical", hint: "Open exceptions" },
] as const;

export const funnel = [
  { stage: "Pre-Delinquency", accounts: 6120, value: 12.4 },
  { stage: "Early Warning", accounts: 4288, value: 8.9 },
  { stage: "Active Collections", accounts: 5011, value: 11.2 },
  { stage: "Recovery", accounts: 1904, value: 5.1 },
  { stage: "Legal", accounts: 802, value: 3.2 },
  { stage: "Write-off", accounts: 317, value: 1.0 },
];

export const dpdBuckets = [
  { bucket: "0", accounts: 6120 },
  { bucket: "1-30", accounts: 3880 },
  { bucket: "31-60", accounts: 2412 },
  { bucket: "61-90", accounts: 1904 },
  { bucket: "91-180", accounts: 2210 },
  { bucket: "181-360", accounts: 1204 },
  { bucket: "360+", accounts: 712 },
];

export const recoveryTrend = [
  { month: "Mar", recovered: 212, promised: 268, target: 240 },
  { month: "Apr", recovered: 246, promised: 291, target: 245 },
  { month: "May", recovered: 238, promised: 302, target: 250 },
  { month: "Jun", recovered: 271, promised: 318, target: 255 },
  { month: "Jul", recovered: 284, promised: 330, target: 265 },
  { month: "Aug", recovered: 312, promised: 344, target: 275 },
  { month: "Sep", recovered: 196, promised: 305, target: 280 },
];

export const channelEffectiveness = [
  { channel: "Call", contact: 61, ptp: 34 },
  { channel: "SMS", contact: 44, ptp: 18 },
  { channel: "WhatsApp", contact: 57, ptp: 26 },
  { channel: "Email", contact: 29, ptp: 11 },
  { channel: "Field Visit", contact: 74, ptp: 41 },
  { channel: "Portal", contact: 38, ptp: 22 },
];

export const agentProductivity = [
  { agent: "Lee Kurgat", accounts: 214, contacts: 168, ptp: 62, collected: 4.8, sla: 96 },
  { agent: "Grace Mutiso", accounts: 198, contacts: 151, ptp: 55, collected: 4.1, sla: 92 },
  { agent: "Dennis Ochieng", accounts: 233, contacts: 141, ptp: 48, collected: 3.6, sla: 88 },
  { agent: "Halima Yusuf", accounts: 176, contacts: 139, ptp: 51, collected: 3.9, sla: 94 },
  { agent: "Brian Ndegwa", accounts: 205, contacts: 122, ptp: 39, collected: 2.8, sla: 81 },
];

export const queues = [
  { id: "q-1", name: "AF Arrears 60-90", owner: "Team Alpha", accounts: 412, value: "KES 512M", sla: "2h", breaches: 6, type: "Team" },
  { id: "q-2", name: "Unsecured 30-60", owner: "Team Beta", accounts: 688, value: "KES 214M", sla: "4h", breaches: 11, type: "Team" },
  { id: "q-3", name: "Mortgage Early Warning", owner: "Pool", accounts: 302, value: "KES 1.9B", sla: "1d", breaches: 2, type: "Pool" },
  { id: "q-4", name: "Recovery 150+", owner: "Recovery Unit", accounts: 244, value: "KES 402M", sla: "1d", breaches: 9, type: "Team" },
  { id: "q-5", name: "Litigation Pipeline", owner: "Legal", accounts: 118, value: "KES 880M", sla: "3d", breaches: 4, type: "Legal" },
  { id: "q-6", name: "Vendor Placement — Ridge", owner: "Ridge Recoveries Ltd", accounts: 356, value: "KES 296M", sla: "5d", breaches: 11, type: "External" },
  { id: "q-7", name: "Broken PTP — Today", owner: "Pool", accounts: 97, value: "KES 61M", sla: "2h", breaches: 8, type: "Pool" },
];

export const notifications = [
  { id: "n1", type: "Broken PTP", title: "PTP broken — Achieng' Otieno", detail: "KES 120,000 due 05 Sep not received", time: "12 min ago", priority: "High", unread: true },
  { id: "n2", type: "SLA breach", title: "Queue SLA breached — Unsecured 30-60", detail: "11 accounts past first-contact SLA", time: "38 min ago", priority: "High", unread: true },
  { id: "n3", type: "Legal deadline", title: "Hearing in 3 days — CASE-2026-0184", detail: "Milimani Commercial Court, 10:00", time: "2 h ago", priority: "Critical", unread: true },
  { id: "n4", type: "Payment received", title: "M-Pesa payment posted", detail: "KES 26,000 on 2910-0554-08", time: "4 h ago", priority: "Low", unread: false },
  { id: "n5", type: "Approval", title: "Maker-checker approval pending", detail: "Settlement discount 18% — 6420-0913-04", time: "Yesterday", priority: "Medium", unread: false },
];

export const tasks = [
  { id: "t1", title: "Call — confirm PTP arrangement", account: "8812-0441-09", due: "Today 14:00", priority: "High", status: "Open" },
  { id: "t2", title: "Verify employer details", account: "5120-0877-02", due: "Today 16:30", priority: "Medium", status: "Open" },
  { id: "t3", title: "Field visit report upload", account: "6420-0913-04", due: "Tomorrow 09:00", priority: "Medium", status: "In progress" },
  { id: "t4", title: "Prepare demand letter pack", account: "7741-0032-11", due: "10 Sep", priority: "High", status: "Awaiting approval" },
];

export const ptps = [
  { id: "p1", account: "8812-0441-09", customer: "Achieng' Wanjala Otieno", amount: 120000, dueDate: "2026-09-05", status: "Broken", channel: "Call", agent: "Lee Kurgat" },
  { id: "p2", account: "5120-0877-02", customer: "Achieng' Wanjala Otieno", amount: 45000, dueDate: "2026-09-12", status: "Open", channel: "WhatsApp", agent: "Lee Kurgat" },
  { id: "p3", account: "6420-0913-04", customer: "Peter Barasa Simiyu", amount: 60000, dueDate: "2026-09-09", status: "Open", channel: "Call", agent: "Dennis Ochieng" },
  { id: "p4", account: "3390-0218-07", customer: "Fatuma Hussein Abdi", amount: 92000, dueDate: "2026-08-30", status: "Kept", channel: "SMS", agent: "Grace Mutiso" },
];

export const payments = [
  { id: "pay-1", date: "2026-08-30", account: "3390-0218-07", customer: "Fatuma Hussein Abdi", amount: 92000, method: "M-Pesa", status: "Posted", reference: "SJ48KD22L1" },
  { id: "pay-2", date: "2026-08-29", account: "5120-0877-02", customer: "Achieng' Wanjala Otieno", amount: 20000, method: "M-Pesa", status: "Posted", reference: "SJ39PP08Q7" },
  { id: "pay-3", date: "2026-08-28", account: "2910-0554-08", customer: "Salome Cheptoo Rono", amount: 26000, method: "Bank transfer", status: "Posted", reference: "BT-902114" },
  { id: "pay-4", date: "2026-08-14", account: "8812-0441-09", customer: "Achieng' Wanjala Otieno", amount: 65000, method: "Card", status: "Posted", reference: "CD-771208" },
  { id: "pay-5", date: "2026-08-12", account: "6420-0913-04", customer: "Peter Barasa Simiyu", amount: 15000, method: "M-Pesa", status: "Failed", reference: "SJ11XR44M0" },
];

export const legalCases = [
  {
    id: "CASE-2026-0184",
    account: "7741-0032-11",
    customer: "Mwangi Njoroge Kamau",
    handling: "External",
    advocate: "Wachira & Co. Advocates",
    opposing: "Otieno Mbeche LLP",
    court: "Milimani Commercial Court",
    stage: "Hearing",
    status: "Active",
    filed: "2026-05-12",
    nextHearing: "2026-09-10",
    claim: 6842300,
    costs: 412000,
    recovered: 0,
  },
  {
    id: "CASE-2026-0142",
    account: "9010-0177-03",
    customer: "Ibrahim Kiptanui Lagat",
    handling: "Internal",
    advocate: "In-house Legal",
    opposing: "—",
    court: "Eldoret Magistrate Court",
    stage: "Judgment",
    status: "Awaiting execution",
    filed: "2025-11-20",
    nextHearing: "2026-09-24",
    claim: 3410000,
    costs: 188000,
    recovered: 240000,
  },
];

export const collateral = [
  { id: "COL-4471", account: "8812-0441-09", type: "Motor Vehicle", description: "Toyota Hiace KDN 442X", owner: "Achieng' W. Otieno", location: "Nairobi", value: 2850000, valued: "2026-03-18", status: "Held", realisation: "Not started" },
  { id: "COL-5120", account: "7741-0032-11", type: "Land & Building", description: "L.R. 209/1148 Ruaka, 0.25 acre", owner: "Njoroge Holdings", location: "Kiambu", value: 11400000, valued: "2026-01-09", status: "Charged", realisation: "Auction scheduled" },
  { id: "COL-6633", account: "6420-0913-04", type: "Equipment", description: "New Holland TT75 Tractor", owner: "Westlink Agro Ltd", location: "Bungoma", value: 1650000, valued: "2025-12-02", status: "Held", realisation: "Repossession pending" },
];

export const vendors = [
  { id: "v1", name: "Ridge Recoveries Ltd", type: "Debt Collection Agency", placed: 356, value: 296_000_000, recovered: 41_200_000, rate: 13.9, commission: 12, sla: 88, status: "Active" },
  { id: "v2", name: "Wachira & Co. Advocates", type: "Law Firm", placed: 118, value: 880_000_000, recovered: 96_400_000, rate: 11.0, commission: 9, sla: 92, status: "Active" },
  { id: "v3", name: "Sentinel Field Services", type: "Field / Trace", placed: 214, value: 118_000_000, recovered: 9_800_000, rate: 8.3, commission: 15, sla: 74, status: "Under review" },
];

export const integrations = [
  { name: "Core Banking (T24)", status: "Connected", lastSync: "3 min ago", records: "18,442", failed: 0, health: 99 },
  { name: "Loan Management System", status: "Connected", lastSync: "8 min ago", records: "18,442", failed: 2, health: 98 },
  { name: "M-Pesa (Daraja)", status: "Connected", lastSync: "1 min ago", records: "1,204", failed: 6, health: 96 },
  { name: "Card Processor", status: "Connected", lastSync: "22 min ago", records: "318", failed: 1, health: 97 },
  { name: "Credit Bureau (Metropol)", status: "Error", lastSync: "6 h ago", records: "0", failed: 41, health: 42 },
  { name: "CTI / Dialler", status: "Connected", lastSync: "Live", records: "2,881 calls", failed: 12, health: 94 },
  { name: "CRM", status: "Connected", lastSync: "31 min ago", records: "14,907", failed: 0, health: 99 },
  { name: "SMS Gateway", status: "Connected", lastSync: "2 min ago", records: "9,442", failed: 88, health: 91 },
  { name: "WhatsApp Gateway", status: "Disconnected", lastSync: "2 days ago", records: "0", failed: 0, health: 0 },
  { name: "Email Gateway", status: "Connected", lastSync: "5 min ago", records: "4,118", failed: 14, health: 95 },
  { name: "SFTP File Drop", status: "Connected", lastSync: "Nightly 02:00", records: "6 files", failed: 0, health: 100 },
  { name: "Webhooks", status: "Connected", lastSync: "Live", records: "12,004", failed: 3, health: 98 },
];

export const models = [
  { name: "Probability of Default", version: "v3.2", status: "Production", accuracy: 0.87, drift: "Low", bias: "Passed", trained: "2026-07-02", review: "Required for decline" },
  { name: "Likelihood to Pay", version: "v2.8", status: "Production", accuracy: 0.82, drift: "Medium", bias: "Passed", trained: "2026-06-18", review: "Advisory only" },
  { name: "Self-Cure Propensity", version: "v1.9", status: "Production", accuracy: 0.79, drift: "Low", bias: "Passed", trained: "2026-05-30", review: "Advisory only" },
  { name: "Best Channel", version: "v2.1", status: "Production", accuracy: 0.74, drift: "Low", bias: "Passed", trained: "2026-06-04", review: "Advisory only" },
  { name: "Best Contact Time", version: "v1.4", status: "Shadow", accuracy: 0.68, drift: "High", bias: "Review", trained: "2026-04-21", review: "Human review" },
  { name: "Roll-Forward Risk", version: "v2.0", status: "Production", accuracy: 0.81, drift: "Low", bias: "Passed", trained: "2026-07-15", review: "Advisory only" },
  { name: "Strategy Optimisation", version: "v0.9", status: "Champion/Challenger", accuracy: 0.71, drift: "Medium", bias: "Review", trained: "2026-08-01", review: "Human-in-the-loop" },
];

export const auditTrail = [
  { id: "a1", when: "2026-09-07 11:04:22", who: "Lee Kurgat", what: "PTP created", entity: "8812-0441-09", before: "—", after: "KES 120,000 due 05 Sep", channel: "Workspace", ip: "10.42.8.19", outcome: "Success" },
  { id: "a2", when: "2026-09-07 10:51:07", who: "System — Strategy Engine", what: "Stage change", entity: "6420-0913-04", before: "Active Collections", after: "Recovery", channel: "Automation", ip: "—", outcome: "Success" },
  { id: "a3", when: "2026-09-06 17:20:44", who: "Grace Mutiso", what: "Contact attempt", entity: "3390-0218-07", before: "—", after: "SMS reminder sent", channel: "SMS", ip: "10.42.8.44", outcome: "Delivered" },
  { id: "a4", when: "2026-09-06 09:12:03", who: "Compliance Bot", what: "Quiet hours block", entity: "9010-0177-03", before: "Call queued 06:40", after: "Blocked", channel: "Dialler", ip: "—", outcome: "Blocked" },
  { id: "a5", when: "2026-09-05 15:44:58", who: "Rose Wanyama", what: "Settlement approval", entity: "6420-0913-04", before: "Pending", after: "Approved 18% discount", channel: "Maker-checker", ip: "10.42.9.02", outcome: "Approved" },
];

export const communications = [
  { id: "c1", date: "2026-09-05 09:12", channel: "Call", direction: "Outbound", template: "—", party: "+254 722 481 903", status: "Answered", outcome: "PTP obtained", consent: "Granted" },
  { id: "c2", date: "2026-09-04 08:30", channel: "SMS", direction: "Outbound", template: "ARR-REM-02", party: "+254 722 481 903", status: "Delivered", outcome: "No response", consent: "Granted" },
  { id: "c3", date: "2026-09-02 14:05", channel: "WhatsApp", direction: "Outbound", template: "WA-PTP-01", party: "+254 722 481 903", status: "Read", outcome: "Replied", consent: "Granted" },
  { id: "c4", date: "2026-08-30 11:41", channel: "Email", direction: "Outbound", template: "EM-STMT-04", party: "a.otieno@mailworks.co.ke", status: "Opened", outcome: "No response", consent: "Granted" },
  { id: "c5", date: "2026-08-27 16:22", channel: "Letter", direction: "Outbound", template: "LTR-DEM-01", party: "Riverbank Court, Kilimani", status: "Dispatched", outcome: "—", consent: "N/A" },
];

export const activityTimeline = [
  { id: "e1", when: "2026-09-07 11:04", who: "Lee Kurgat", action: "PTP created", outcome: "KES 120,000 due 05 Sep", channel: "Workspace" },
  { id: "e2", when: "2026-09-05 09:12", who: "Lee Kurgat", action: "Outbound call", outcome: "Right party contact — promise obtained", channel: "Dialler" },
  { id: "e3", when: "2026-09-04 08:30", who: "System", action: "SMS reminder", outcome: "Delivered", channel: "SMS" },
  { id: "e4", when: "2026-08-29 10:02", who: "System", action: "Payment received", outcome: "KES 20,000 posted", channel: "M-Pesa" },
  { id: "e5", when: "2026-08-22 12:48", who: "Strategy Engine", action: "Queue assignment", outcome: "Moved to AF Arrears 60-90", channel: "Automation" },
  { id: "e6", when: "2026-08-18 09:15", who: "Grace Mutiso", action: "Note added", outcome: "Customer reports delayed contract payment", channel: "Workspace" },
  { id: "e7", when: "2026-08-05 07:00", who: "System", action: "Stage change", outcome: "Early Warning → Active Collections", channel: "Automation" },
];

export const roles = [
  "Collections Agent",
  "Senior / Recovery Agent",
  "Supervisor / Team Lead",
  "Collections Manager",
  "Legal Officer",
  "Compliance Officer",
  "External Agent / Agency",
  "Vendor Manager",
  "System Administrator",
  "Customer / Borrower",
] as const;

export type Role = (typeof roles)[number];

export const formatKES = (n: number) =>
  "KES " + n.toLocaleString("en-KE", { maximumFractionDigits: 0 });

export const compactKES = (n: number) => {
  if (n >= 1_000_000_000) return `KES ${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `KES ${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `KES ${(n / 1_000).toFixed(0)}K`;
  return `KES ${n}`;
};
