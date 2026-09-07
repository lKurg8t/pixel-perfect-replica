// Comprehensive demonstration data for the NewTech Collections & Recovery System
// Based on FCD requirements - expanded dataset for realistic demo
// Frontend-only: nothing here talks to a backend

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

export type Segment =
  | "Self-Cure"
  | "Responsive"
  | "Hard-to-Reach"
  | "High Value"
  | "Hardship"
  | "Broken PTP"
  | "Repeat Delinquent"
  | "Digital Preferred"
  | "Field Contact Required"
  | "Legal Candidate";

export type Product =
  | "Asset Finance"
  | "Personal Unsecured Loan"
  | "SME Term Loan"
  | "Mortgage"
  | "Agri Equipment Finance"
  | "Salary Advance"
  | "PSV Asset Finance"
  | "Business Overdraft"
  | "Logistics Finance"
  | "Construction Loan";

export type PaymentMethod = "M-Pesa" | "Card" | "Bank Transfer" | "Direct Debit" | "Cash" | "Cheque";
export type PaymentStatus = "Successful" | "Pending" | "Failed" | "Reversed";
export type PTPStatus = "Pending" | "Due" | "Kept" | "Broken" | "Rescheduled" | "Cancelled";
export type CommunicationChannel = "Call" | "SMS" | "Email" | "WhatsApp" | "Letter" | "Portal" | "Field Visit";
export type CommunicationDirection = "Inbound" | "Outbound";
export type CommunicationStatus = "Sent" | "Delivered" | "Read" | "Failed" | "Bounced" | "Replied" | "Answered" | "Dispatched" | "Opened";
export type CaseStage = "Pre-Litigation" | "Demand Notice" | "Filed" | "Hearing Scheduled" | "Judgment" | "Execution" | "Closed";
export type CaseStatus = "Active" | "Pending" | "Escalated" | "Closed" | "Awaiting Execution";
export type CollateralType = "Motor Vehicle" | "Land & Building" | "Equipment" | "Inventory" | "Receivables";
export type UserRole =
  | "Collections Agent"
  | "Senior Agent"
  | "Team Lead"
  | "Collections Manager"
  | "Legal Officer"
  | "Compliance Officer"
  | "External Agent"
  | "Vendor Manager"
  | "System Administrator";

export type AccountRecord = {
  id: string;
  accountNumber: string;
  customer: CustomerRecord;
  product: Product;
  outstanding: number;
  arrears: number;
  principal: number;
  interest: number;
  fees: number;
  penalties: number;
  dpd: number;
  originalAmount: number;
  disbursementDate: string;
  maturityDate: string;
  installmentAmount: number;
  dueDate: string;
  lastPayment: { date: string; amount: number };
  lastContact: string;
  assignedAgent: string;
  queue: string;
  stage: Stage;
  segment: Segment;
  score: number;
  scoreCategory: "Low" | "Medium" | "High";
  likelihoodToPay: number;
  selfCureProbability: number;
  contactabilityScore: number;
  recommendedChannel: CommunicationChannel;
  recommendedContactTime: string;
  status: "Active" | "Restricted" | "Litigation" | "Closed";
  restricted?: boolean;
  legalStatus?: string;
  collateralStatus?: string;
  recoveryStatus?: string;
};

export type CustomerRecord = {
  id: string;
  customerNumber: string;
  name: string;
  phone: string;
  altPhone: string;
  email: string;
  residentialAddress: string;
  businessAddress?: string;
  region: string;
  branch: string;
  nationalId: string;
  dateOfBirth?: string;
  customerType: "Individual" | "SME" | "Corporate";
  risk: "Low" | "Medium" | "High" | "Critical";
  segment: Segment;
  stage: Stage;
  preferredChannel: CommunicationChannel;
  preferredLanguage: "English" | "Swahili";
  contactability: "Right party" | "Wrong party" | "Unreachable";
  consentStatus: "Granted" | "Revoked" | "Pending";
  optOutStatus: boolean;
  restricted: boolean;
  totalExposure: number;
  numberOfAccounts: number;
  lastContact: string;
  nextAction: string;
  assignedRelationshipManager?: string;
  relatedParties: { name: string; relationship: string; phone: string }[];
  accounts: AccountRecord[];
};

export type UserRecord = {
  id: string;
  username: string;
  name: string;
  role: UserRole;
  department: string;
  branch: string;
  region: string;
  status: "Active" | "Inactive" | "OOTO";
  availability: "Available" | "Busy" | "OOTO";
  lastLogin: string;
  mfaEnabled: boolean;
  ssoEnabled: boolean;
  skills: string[];
  capacity: number;
  currentWorkload: number;
  assignedAccounts: number;
  performance: { contacts: number; ptp: number; collected: number; sla: number };
};

export type QueueRecord = {
  id: string;
  name: string;
  description: string;
  stage: Stage;
  segment?: Segment;
  amountBand?: string;
  priority: "Low" | "Medium" | "High" | "Critical";
  channel?: CommunicationChannel;
  sla: string;
  assignedTeam: string;
  assignedAgents: string[];
  accountCount: number;
  capacity: number;
  currentWorkload: number;
  slaBreaches: number;
  type: "Team" | "Pool" | "Legal" | "External";
};

export type PTPRecord = {
  id: string;
  account: string;
  accountNumber: string;
  customer: string;
  customerName: string;
  amount: number;
  promiseDate: string;
  createdDate: string;
  status: PTPStatus;
  channel: CommunicationChannel;
  agent: string;
  reason: string;
  paymentReceived?: number;
  remainingAmount?: number;
  reminderStatus: string;
  brokenPromiseReason?: string;
};

export type PaymentRecord = {
  id: string;
  date: string;
  account: string;
  accountNumber: string;
  customer: string;
  customerName: string;
  amount: number;
  method: PaymentMethod;
  gateway: string;
  reference: string;
  postingStatus: string;
  coreBankingStatus: string;
  reconciliationStatus: string;
  status: PaymentStatus;
  isPartial: boolean;
  isSettlement: boolean;
};

export type CommunicationRecord = {
  id: string;
  date: string;
  account: string;
  accountNumber: string;
  customer: string;
  customerName: string;
  channel: CommunicationChannel;
  direction: CommunicationDirection;
  template: string;
  party: string;
  status: CommunicationStatus;
  outcome: string;
  consent: string;
  messageSummary: string;
};

export type CaseRecord = {
  id: string;
  account: string;
  accountNumber: string;
  customer: string;
  customerName: string;
  caseType: string;
  stage: CaseStage;
  status: CaseStatus;
  legalOfficer: string;
  advocate: string;
  opposingAdvocate: string;
  court: string;
  filingDate: string;
  hearingDate: string;
  nextDeadline: string;
  amount: number;
  legalCosts: number;
  documents: string[];
  tasks: string[];
  notes: string[];
  sla: string;
  escalationStatus: string;
};

export type CollateralRecord = {
  id: string;
  account: string;
  accountNumber: string;
  type: CollateralType;
  description: string;
  estimatedValue: number;
  outstandingSecuredAmount: number;
  location: string;
  ownership: string;
  valuationDate: string;
  valuator: string;
  status: string;
  recoveryStatus: string;
  legalStatus: string;
  documents: string[];
  geoLocation?: string;
};

export type VendorRecord = {
  id: string;
  name: string;
  vendorId: string;
  contact: string;
  contractStatus: string;
  startDate: string;
  endDate: string;
  assignedAccounts: number;
  placementValue: number;
  recoveryAmount: number;
  recoveryRate: number;
  commission: number;
  sla: number;
  slaCompliance: string;
  performance: string;
  status: string;
  type: string;
};

export type StrategyRecord = {
  id: string;
  name: string;
  version: string;
  status: string;
  effectiveDate: string;
  stage: Stage;
  segment?: Segment;
  conditions: string[];
  actions: string[];
  priority: string;
  owner: string;
  lastUpdated: string;
  simulationResult?: string;
};

export type WorkflowRecord = {
  id: string;
  name: string;
  version: string;
  status: string;
  stages: number;
  sla: string;
  description: string;
  trigger: string;
  conditions: string[];
  tasks: string[];
  humanApproval: boolean;
  escalation: string;
  branching: boolean;
  rework: boolean;
};

export type EarlyWarningRecord = {
  id: string;
  account: string;
  accountNumber: string;
  customer: string;
  customerName: string;
  riskLevel: string;
  trigger: string;
  date: string;
  recommendedAction: string;
  status: string;
  assignedQueue: string;
};

export type AIRecommendationRecord = {
  id: string;
  account: string;
  accountNumber: string;
  customer: string;
  customerName: string;
  recommendedAction: string;
  recommendedChannel: CommunicationChannel;
  reason: string;
  confidence: number;
  expectedOutcome: string;
  priority: string;
  supportingFactors: string[];
  generatedTimestamp: string;
};

export type AuditRecord = {
  id: string;
  when: string;
  who: string;
  role: string;
  action: string;
  entity: string;
  entityId: string;
  before: string;
  after: string;
  channel: string;
  ip: string;
  outcome: string;
};

export type DocumentRecord = {
  id: string;
  account: string;
  accountNumber: string;
  customer: string;
  customerName: string;
  documentType: string;
  fileName: string;
  uploadedDate: string;
  uploadedBy: string;
  fileSize: string;
  status: string;
};

export type TaskRecord = {
  id: string;
  title: string;
  account: string;
  accountNumber: string;
  customer: string;
  customerName: string;
  due: string;
  priority: string;
  status: string;
  assignedTo: string;
  taskType: string;
};

export type NotificationRecord = {
  id: string;
  type: string;
  title: string;
  detail: string;
  time: string;
  priority: string;
  unread: boolean;
  read?: boolean;
  date?: string;
};

export type ReportRecord = {
  id: string;
  name: string;
  owner: string;
  frequency: string;
  lastGenerated: string;
  nextScheduled: string;
  format: string;
  filters: string[];
  status: string;
};

// Helper functions
const money = (n: number) => n;
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomFloat = (min: number, max: number) => Math.random() * (max - min) + min;
const randomItem = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];
const randomDate = (start: Date, end: Date) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString().split('T')[0];
};

// Kenyan names for realistic data
const firstNames = [
  "Brian", "James", "Peter", "John", "David", "Michael", "Robert", "William", "Richard", "Joseph",
  "Mary", "Patricia", "Jennifer", "Linda", "Barbara", "Elizabeth", "Susan", "Jessica", "Sarah", "Karen",
  "Kamau", "Njoroge", "Ochieng", "Otieno", "Wanjiku", "Wanjiru", "Njeri", "Muthoni", "Nyambura", "Wairimu",
  "Fatuma", "Aisha", "Halima", "Zainab", "Khadija", "Amina", "Salma", "Nasra", "Ibrahim", "Abdullah",
  "Kipchoge", "Kipkorir", "Kiplagat", "Kipruto", "Kipkemoi", "Chebet", "Cherono", "Jepchumba", "Jeptoo", "Kiptoo"
];

const lastNames = [
  "Mwangi", "Kamau", "Njoroge", "Kariuki", "Wanjiku", "Njuguna", "Maina", "Kinyanjui", "Muthui", "Ndirangu",
  "Otieno", "Ochieng", "Omondi", "Oduor", "Akinyi", "Achieng", "Nyong'o", "Ouma", "Okello", "Okeyo",
  "Wanjala", "Barasa", "Simiyu", "Wafula", "Wekesa", "Namasaka", "Makokha", "Namulanda", "Khasiani", "Lukorito",
  "Hussein", "Abdi", "Mohamed", "Ali", "Ahmed", "Ibrahim", "Yusuf", "Hassan", "Omar", "Abdullahi",
  "Kiptanui", "Lagat", "Kipruto", "Kipchumba", "Cheruiyot", "Koech", "Kigen", "Kirui", "Bett", "Rono"
];

const regions = ["Nairobi Metro", "Central", "Coast", "Western", "Rift Valley", "Eastern", "Nyanza", "North Eastern"];
const branches = ["Nairobi HQ", "Mombasa Branch", "Kisumu Branch", "Eldoret Branch", "Nakuru Branch", "Machakos Branch", "Meru Branch", "Garissa Branch"];
const employers = [
  "Safaricom PLC", "Equity Bank", "KCB Group", "Cooperative Bank", "Telkom Kenya", "Kenya Power",
  "Kenya Airways", "University of Nairobi", "Ministry of Health", "County Government of Nairobi",
  "Sunrise Hardware Ltd", "Westlink Agro Ltd", "Highlands Dairy Co Ltd", "Matatu Sacco Ltd", "DukaTech Ltd",
  "Mailworks Co Ltd", "Zawadi Care Org", "Riverbank Court Apartments", "Njoroge Holdings", "Ridge Recoveries Ltd"
];

const kenyanPhone = () => `+254 ${randomInt(700, 799)} ${randomInt(100, 999)} ${randomInt(100, 999)}`;
const kenyanId = () => `${randomInt(10, 40)} ${randomInt(100000, 999999)}`;

const safeRandomItem = <T,>(arr: T[]): T => {
  if (arr.length === 0) throw new Error("Array is empty");
  return arr[Math.floor(Math.random() * arr.length)];
};

const safeRandomDate = (start: Date, end: Date): string => {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().split('T')[0];
};

// Generate comprehensive dataset

// USERS (30 users across all FCD roles)
export const users: UserRecord[] = [
  { id: "USR-001", username: "lkurgat", name: "Lee Kurgat", role: "Collections Agent", department: "Collections", branch: "Nairobi HQ", region: "Nairobi Metro", status: "Active", availability: "Available", lastLogin: "2026-09-07 08:15", mfaEnabled: true, ssoEnabled: true, skills: ["Call", "Negotiation", "SMS"], capacity: 50, currentWorkload: 42, assignedAccounts: 214, performance: { contacts: 168, ptp: 62, collected: 4.8, sla: 96 } },
  { id: "USR-002", username: "gmutiso", name: "Grace Mutiso", role: "Collections Agent", department: "Collections", branch: "Nairobi HQ", region: "Nairobi Metro", status: "Active", availability: "Available", lastLogin: "2026-09-07 08:30", mfaEnabled: true, ssoEnabled: true, skills: ["Call", "Email", "WhatsApp"], capacity: 50, currentWorkload: 38, assignedAccounts: 198, performance: { contacts: 151, ptp: 55, collected: 4.1, sla: 92 } },
  { id: "USR-003", username: "dchieng", name: "Dennis Ochieng", role: "Senior Agent", department: "Recovery", branch: "Kisumu Branch", region: "Nyanza", status: "Active", availability: "Busy", lastLogin: "2026-09-07 07:45", mfaEnabled: true, ssoEnabled: true, skills: ["Negotiation", "Field Visit", "Settlement"], capacity: 40, currentWorkload: 35, assignedAccounts: 233, performance: { contacts: 141, ptp: 48, collected: 3.6, sla: 88 } },
  { id: "USR-004", username: "hyusuf", name: "Halima Yusuf", role: "Collections Agent", department: "Collections", branch: "Mombasa Branch", region: "Coast", status: "Active", availability: "Available", lastLogin: "2026-09-07 08:00", mfaEnabled: true, ssoEnabled: true, skills: ["Call", "Swahili", "SMS"], capacity: 50, currentWorkload: 44, assignedAccounts: 176, performance: { contacts: 139, ptp: 51, collected: 3.9, sla: 94 } },
  { id: "USR-005", username: "bndegwa", name: "Brian Ndegwa", role: "Collections Agent", department: "Collections", branch: "Nairobi HQ", region: "Nairobi Metro", status: "Active", availability: "Available", lastLogin: "2026-09-07 08:20", mfaEnabled: true, ssoEnabled: true, skills: ["Call", "Email"], capacity: 50, currentWorkload: 41, assignedAccounts: 205, performance: { contacts: 122, ptp: 39, collected: 2.8, sla: 81 } },
  { id: "USR-006", username: "rwanyama", name: "Rose Wanyama", role: "Team Lead", department: "Collections", branch: "Nairobi HQ", region: "Nairobi Metro", status: "Active", availability: "Available", lastLogin: "2026-09-07 07:30", mfaEnabled: true, ssoEnabled: true, skills: ["Supervision", "Approval", "Escalation"], capacity: 30, currentWorkload: 25, assignedAccounts: 0, performance: { contacts: 45, ptp: 15, collected: 0, sla: 98 } },
  { id: "USR-007", username: "pkamau", name: "Peter Kamau", role: "Collections Manager", department: "Collections", branch: "Nairobi HQ", region: "Nairobi Metro", status: "Active", availability: "Available", lastLogin: "2026-09-07 07:00", mfaEnabled: true, ssoEnabled: true, skills: ["Management", "Reporting", "Strategy"], capacity: 20, currentWorkload: 18, assignedAccounts: 0, performance: { contacts: 20, ptp: 5, collected: 0, sla: 99 } },
  { id: "USR-008", username: "mwachira", name: "Mary Wachira", role: "Legal Officer", department: "Legal", branch: "Nairobi HQ", region: "Nairobi Metro", status: "Active", availability: "Available", lastLogin: "2026-09-07 08:10", mfaEnabled: true, ssoEnabled: true, skills: ["Legal", "Court", "Documentation"], capacity: 25, currentWorkload: 22, assignedAccounts: 118, performance: { contacts: 35, ptp: 10, collected: 0, sla: 95 } },
  { id: "USR-009", username: "jotieno", name: "James Otieno", role: "Compliance Officer", department: "Compliance", branch: "Nairobi HQ", region: "Nairobi Metro", status: "Active", availability: "Available", lastLogin: "2026-09-07 08:05", mfaEnabled: true, ssoEnabled: true, skills: ["Compliance", "Audit", "Risk"], capacity: 20, currentWorkload: 15, assignedAccounts: 0, performance: { contacts: 10, ptp: 0, collected: 0, sla: 100 } },
  { id: "USR-010", username: "sabdi", name: "Salim Abdi", role: "Vendor Manager", department: "Vendor Management", branch: "Nairobi HQ", region: "Nairobi Metro", status: "Active", availability: "Available", lastLogin: "2026-09-07 08:25", mfaEnabled: true, ssoEnabled: true, skills: ["Vendor Management", "Contract", "Performance"], capacity: 15, currentWorkload: 12, assignedAccounts: 0, performance: { contacts: 25, ptp: 8, collected: 0, sla: 97 } },
  { id: "USR-011", username: "akipkoech", name: "Alice Kipkoech", role: "Collections Agent", department: "Collections", branch: "Eldoret Branch", region: "Rift Valley", status: "Active", availability: "Available", lastLogin: "2026-09-07 08:35", mfaEnabled: true, ssoEnabled: true, skills: ["Call", "WhatsApp"], capacity: 50, currentWorkload: 39, assignedAccounts: 187, performance: { contacts: 145, ptp: 52, collected: 4.2, sla: 90 } },
  { id: "USR-012", username: "njeri", name: "Nancy Njeri", role: "Collections Agent", department: "Collections", branch: "Nakuru Branch", region: "Rift Valley", status: "Active", availability: "Busy", lastLogin: "2026-09-07 07:50", mfaEnabled: true, ssoEnabled: true, skills: ["Call", "SMS", "Email"], capacity: 50, currentWorkload: 46, assignedAccounts: 201, performance: { contacts: 158, ptp: 58, collected: 4.5, sla: 93 } },
  { id: "USR-013", username: "momondi", name: "Omondi Omondi", role: "Senior Agent", department: "Recovery", branch: "Kisumu Branch", region: "Nyanza", status: "Active", availability: "Available", lastLogin: "2026-09-07 08:40", mfaEnabled: true, ssoEnabled: true, skills: ["Negotiation", "Field Visit"], capacity: 40, currentWorkload: 32, assignedAccounts: 189, performance: { contacts: 132, ptp: 45, collected: 3.8, sla: 86 } },
  { id: "USR-014", username: "cchebet", name: "Catherine Chebet", role: "Collections Agent", department: "Collections", branch: "Eldoret Branch", region: "Rift Valley", status: "Active", availability: "Available", lastLogin: "2026-09-07 08:15", mfaEnabled: true, ssoEnabled: true, skills: ["Call", "Swahili"], capacity: 50, currentWorkload: 43, assignedAccounts: 194, performance: { contacts: 147, ptp: 53, collected: 4.0, sla: 91 } },
  { id: "USR-015", username: "kmaina", name: "Kevin Maina", role: "Team Lead", department: "Collections", branch: "Nairobi HQ", region: "Nairobi Metro", status: "OOTO", availability: "OOTO", lastLogin: "2026-09-06 17:30", mfaEnabled: true, ssoEnabled: true, skills: ["Supervision", "Approval"], capacity: 30, currentWorkload: 28, assignedAccounts: 0, performance: { contacts: 40, ptp: 12, collected: 0, sla: 97 } },
  { id: "USR-016", username: "mwambui", name: "Mercy Wambui", role: "Collections Agent", department: "Collections", branch: "Machakos Branch", region: "Eastern", status: "Active", availability: "Available", lastLogin: "2026-09-07 08:45", mfaEnabled: true, ssoEnabled: true, skills: ["Call", "WhatsApp", "SMS"], capacity: 50, currentWorkload: 37, assignedAccounts: 178, performance: { contacts: 136, ptp: 49, collected: 3.7, sla: 89 } },
  { id: "USR-017", username: "jbarasa", name: "John Barasa", role: "Senior Agent", department: "Recovery", branch: "Kisumu Branch", region: "Nyanza", status: "Active", availability: "Busy", lastLogin: "2026-09-07 07:55", mfaEnabled: true, ssoEnabled: true, skills: ["Negotiation", "Settlement"], capacity: 40, currentWorkload: 38, assignedAccounts: 221, performance: { contacts: 128, ptp: 44, collected: 3.5, sla: 84 } },
  { id: "USR-018", username: "fnyamweya", name: "Faith Nyamweya", role: "Collections Agent", department: "Collections", branch: "Meru Branch", region: "Eastern", status: "Active", availability: "Available", lastLogin: "2026-09-07 08:50", mfaEnabled: true, ssoEnabled: true, skills: ["Call", "Email"], capacity: 50, currentWorkload: 40, assignedAccounts: 183, performance: { contacts: 142, ptp: 51, collected: 4.1, sla: 92 } },
  { id: "USR-019", username: "akiprono", name: "Andrew Kiprono", role: "Collections Agent", department: "Collections", branch: "Eldoret Branch", region: "Rift Valley", status: "Active", availability: "Available", lastLogin: "2026-09-07 08:00", mfaEnabled: true, ssoEnabled: true, skills: ["Call", "WhatsApp"], capacity: 50, currentWorkload: 42, assignedAccounts: 192, performance: { contacts: 150, ptp: 54, collected: 4.3, sla: 94 } },
  { id: "USR-020", username: "snyambura", name: "Susan Nyambura", role: "Legal Officer", department: "Legal", branch: "Nairobi HQ", region: "Nairobi Metro", status: "Active", availability: "Busy", lastLogin: "2026-09-07 07:40", mfaEnabled: true, ssoEnabled: true, skills: ["Legal", "Court"], capacity: 25, currentWorkload: 24, assignedAccounts: 95, performance: { contacts: 32, ptp: 9, collected: 0, sla: 93 } },
  { id: "USR-021", username: "mmohamed", name: "Mohamed Ali", role: "Compliance Officer", department: "Compliance", branch: "Mombasa Branch", region: "Coast", status: "Active", availability: "Available", lastLogin: "2026-09-07 08:55", mfaEnabled: true, ssoEnabled: true, skills: ["Compliance", "Audit"], capacity: 20, currentWorkload: 14, assignedAccounts: 0, performance: { contacts: 8, ptp: 0, collected: 0, sla: 99 } },
  { id: "USR-022", username: "lwanjiku", name: "Lucy Wanjiku", role: "System Administrator", department: "IT", branch: "Nairobi HQ", region: "Nairobi Metro", status: "Active", availability: "Available", lastLogin: "2026-09-07 07:00", mfaEnabled: true, ssoEnabled: true, skills: ["System Admin", "Security", "Configuration"], capacity: 10, currentWorkload: 5, assignedAccounts: 0, performance: { contacts: 5, ptp: 0, collected: 0, sla: 100 } },
  { id: "USR-023", username: "ekipchumba", name: "Emily Kipchumba", role: "Collections Agent", department: "Collections", branch: "Eldoret Branch", region: "Rift Valley", status: "Active", availability: "Available", lastLogin: "2026-09-07 08:25", mfaEnabled: true, ssoEnabled: true, skills: ["Call", "Swahili", "SMS"], capacity: 50, currentWorkload: 41, assignedAccounts: 186, performance: { contacts: 144, ptp: 52, collected: 4.0, sla: 90 } },
  { id: "USR-024", username: "rkorir", name: "Robert Korir", role: "Senior Agent", department: "Recovery", branch: "Nakuru Branch", region: "Rift Valley", status: "Active", availability: "Available", lastLogin: "2026-09-07 08:10", mfaEnabled: true, ssoEnabled: true, skills: ["Negotiation", "Field Visit", "Settlement"], capacity: 40, currentWorkload: 36, assignedAccounts: 205, performance: { contacts: 138, ptp: 47, collected: 3.9, sla: 87 } },
  { id: "USR-025", username: "jwanjiru", name: "Jane Wanjiru", role: "Team Lead", department: "Collections", branch: "Nairobi HQ", region: "Nairobi Metro", status: "Active", availability: "Available", lastLogin: "2026-09-07 07:20", mfaEnabled: true, ssoEnabled: true, skills: ["Supervision", "Approval", "Escalation"], capacity: 30, currentWorkload: 26, assignedAccounts: 0, performance: { contacts: 42, ptp: 14, collected: 0, sla: 98 } },
  { id: "USR-026", username: "tmutua", name: "Thomas Mutua", role: "Collections Agent", department: "Collections", branch: "Machakos Branch", region: "Eastern", status: "Active", availability: "Busy", lastLogin: "2026-09-07 08:30", mfaEnabled: true, ssoEnabled: true, skills: ["Call", "WhatsApp"], capacity: 50, currentWorkload: 45, assignedAccounts: 199, performance: { contacts: 155, ptp: 56, collected: 4.4, sla: 95 } },
  { id: "USR-027", username: "aakinyi", name: "Agnes Akinyi", role: "Collections Agent", department: "Collections", branch: "Kisumu Branch", region: "Nyanza", status: "Active", availability: "Available", lastLogin: "2026-09-07 08:40", mfaEnabled: true, ssoEnabled: true, skills: ["Call", "Dholuo", "SMS"], capacity: 50, currentWorkload: 38, assignedAccounts: 175, performance: { contacts: 134, ptp: 48, collected: 3.8, sla: 88 } },
  { id: "USR-028", username: "nkiplagat", name: "Nicholas Kiplagat", role: "Senior Agent", department: "Recovery", branch: "Eldoret Branch", region: "Rift Valley", status: "Active", availability: "Available", lastLogin: "2026-09-07 07:35", mfaEnabled: true, ssoEnabled: true, skills: ["Negotiation", "Settlement"], capacity: 40, currentWorkload: 34, assignedAccounts: 217, performance: { contacts: 130, ptp: 43, collected: 3.6, sla: 85 } },
  { id: "USR-029", username: "mcherono", name: "Mercy Cherono", role: "Collections Agent", department: "Collections", branch: "Nairobi HQ", region: "Nairobi Metro", status: "Active", availability: "Available", lastLogin: "2026-09-07 08:50", mfaEnabled: true, ssoEnabled: true, skills: ["Call", "Email", "WhatsApp"], capacity: 50, currentWorkload: 43, assignedAccounts: 203, performance: { contacts: 152, ptp: 55, collected: 4.2, sla: 93 } },
  { id: "USR-030", username: "ekipruto", name: "Elijah Kipruto", role: "External Agent", department: "External", branch: "Ridge Recoveries", region: "Nairobi Metro", status: "Active", availability: "Available", lastLogin: "2026-09-07 08:00", mfaEnabled: false, ssoEnabled: false, skills: ["Call", "Field Visit"], capacity: 60, currentWorkload: 52, assignedAccounts: 356, performance: { contacts: 198, ptp: 72, collected: 5.2, sla: 82 } },
];

// QUEUES (15 queues)
export const queues: QueueRecord[] = [
  { id: "QUE-001", name: "Early Warning Digital", description: "Early stage accounts for digital outreach", stage: "Early Warning", segment: "Digital Preferred", priority: "Medium", channel: "SMS", sla: "1d", assignedTeam: "Team Alpha", assignedAgents: ["USR-001", "USR-002"], accountCount: 302, capacity: 400, currentWorkload: 302, slaBreaches: 2, type: "Team" },
  { id: "QUE-002", name: "Active Collections Standard", description: "Standard active collections queue", stage: "Active Collections", segment: "Responsive", priority: "Medium", channel: "Call", sla: "4h", assignedTeam: "Team Beta", assignedAgents: ["USR-004", "USR-005"], accountCount: 688, capacity: 800, currentWorkload: 688, slaBreaches: 11, type: "Team" },
  { id: "QUE-003", name: "High Value Accounts", description: "High value accounts requiring senior attention", stage: "Active Collections", segment: "High Value", priority: "High", channel: "Call", sla: "2h", assignedTeam: "Recovery Unit", assignedAgents: ["USR-003"], accountCount: 156, capacity: 200, currentWorkload: 156, slaBreaches: 6, type: "Team" },
  { id: "QUE-004", name: "High Risk Accounts", description: "High risk accounts requiring escalation", stage: "Active Collections", segment: "Hard-to-Reach", priority: "High", channel: "Field Visit", sla: "1d", assignedTeam: "Recovery Unit", assignedAgents: ["USR-003", "USR-013"], accountCount: 234, capacity: 300, currentWorkload: 234, slaBreaches: 9, type: "Team" },
  { id: "QUE-005", name: "Broken PTP Queue", description: "Accounts with broken promises to pay", stage: "Active Collections", segment: "Broken PTP", priority: "Critical", channel: "Call", sla: "2h", assignedTeam: "Team Alpha", assignedAgents: ["USR-001"], accountCount: 97, capacity: 150, currentWorkload: 97, slaBreaches: 8, type: "Team" },
  { id: "QUE-006", name: "Recovery Priority", description: "High DPD recovery accounts", stage: "Recovery", segment: "Hardship", priority: "High", channel: "Call", sla: "1d", assignedTeam: "Recovery Unit", assignedAgents: ["USR-003", "USR-017", "USR-024"], accountCount: 244, capacity: 350, currentWorkload: 244, slaBreaches: 9, type: "Team" },
  { id: "QUE-007", name: "Legal Escalation", description: "Accounts ready for legal escalation", stage: "Legal", segment: "Legal Candidate", priority: "Critical", channel: "Letter", sla: "3d", assignedTeam: "Legal", assignedAgents: ["USR-008", "USR-020"], accountCount: 118, capacity: 200, currentWorkload: 118, slaBreaches: 4, type: "Legal" },
  { id: "QUE-008", name: "Field Visit Queue", description: "Accounts requiring field visits", stage: "Active Collections", segment: "Field Contact Required", priority: "High", channel: "Field Visit", sla: "2d", assignedTeam: "Field Team", assignedAgents: ["USR-003"], accountCount: 145, capacity: 200, currentWorkload: 145, slaBreaches: 7, type: "Team" },
  { id: "QUE-009", name: "External Agency Placement", description: "Accounts placed with external agencies", stage: "Recovery", segment: "Hard-to-Reach", priority: "Medium", channel: "Call", sla: "5d", assignedTeam: "Vendor Management", assignedAgents: ["USR-010"], accountCount: 356, capacity: 500, currentWorkload: 356, slaBreaches: 11, type: "External" },
  { id: "QUE-010", name: "Supervisor Review", description: "Accounts requiring supervisor review", stage: "Active Collections", segment: "High Value", priority: "High", channel: "Call", sla: "1d", assignedTeam: "Management", assignedAgents: ["USR-006", "USR-025"], accountCount: 67, capacity: 100, currentWorkload: 67, slaBreaches: 3, type: "Pool" },
  { id: "QUE-011", name: "Settlement Approval", description: "Settlement proposals awaiting approval", stage: "Active Collections", segment: "High Value", priority: "High", channel: "Email", sla: "2d", assignedTeam: "Management", assignedAgents: ["USR-007"], accountCount: 34, capacity: 50, currentWorkload: 34, slaBreaches: 2, type: "Pool" },
  { id: "QUE-012", name: "Pre-Delinquency Watch", description: "Accounts in pre-delinquency stage", stage: "Pre-Delinquency", segment: "Self-Cure", priority: "Low", channel: "SMS", sla: "1d", assignedTeam: "Pool", assignedAgents: [], accountCount: 512, capacity: 600, currentWorkload: 512, slaBreaches: 1, type: "Pool" },
  { id: "QUE-013", name: "Mortgage Early Warning", description: "Mortgage accounts in early warning", stage: "Early Warning", segment: "Responsive", priority: "Medium", channel: "Email", sla: "1d", assignedTeam: "Team Beta", assignedAgents: ["USR-002"], accountCount: 198, capacity: 250, currentWorkload: 198, slaBreaches: 2, type: "Team" },
  { id: "QUE-014", name: "SME Collections", description: "SME term loan collections", stage: "Active Collections", segment: "High Value", priority: "High", channel: "Call", sla: "4h", assignedTeam: "Recovery Unit", assignedAgents: ["USR-003"], accountCount: 167, capacity: 250, currentWorkload: 167, slaBreaches: 5, type: "Team" },
  { id: "QUE-015", name: "Litigation Pipeline", description: "Accounts in litigation process", stage: "Legal", segment: "Legal Candidate", priority: "Critical", channel: "Letter", sla: "3d", assignedTeam: "Legal", assignedAgents: ["USR-008"], accountCount: 118, capacity: 200, currentWorkload: 118, slaBreaches: 4, type: "Legal" },
];

// Generate customers with accounts
const generateCustomers = (count: number): CustomerRecord[] => {
  const customers: CustomerRecord[] = [];
  const products: Product[] = ["Asset Finance", "Personal Unsecured Loan", "SME Term Loan", "Mortgage", "Agri Equipment Finance", "Salary Advance", "PSV Asset Finance", "Business Overdraft", "Logistics Finance", "Construction Loan"];
  const stages: Stage[] = ["Pre-Delinquency", "Early Warning", "Active Collections", "Recovery", "Legal", "Write-off"];
  const segments: Segment[] = ["Self-Cure", "Responsive", "Hard-to-Reach", "High Value", "Hardship", "Broken PTP", "Repeat Delinquent", "Digital Preferred", "Field Contact Required", "Legal Candidate"];
  const risks: ("Low" | "Medium" | "High" | "Critical")[] = ["Low", "Medium", "High", "Critical"];
  const channels: CommunicationChannel[] = ["Call", "SMS", "Email", "WhatsApp"];
  const contactability: ("Right party" | "Wrong party" | "Unreachable")[] = ["Right party", "Wrong party", "Unreachable"];

  for (let i = 0; i < count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const fullName = `${firstName} ${lastName}`;
    const customerId = `CUS-${100000 + i}`;
    const customerType = Math.random() > 0.7 ? "SME" : "Individual";
    const stage = stages[Math.floor(Math.random() * stages.length)];
    const segment = segments[Math.floor(Math.random() * segments.length)];
    const risk = risks[Math.floor(Math.random() * risks.length)];
    const numAccounts = randomInt(1, 3);
    
    const customer: CustomerRecord = {
      id: customerId,
      customerNumber: customerId,
      name: fullName,
      phone: kenyanPhone(),
      altPhone: kenyanPhone(),
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${["gmail.com", "yahoo.com", "outlook.com", employers[Math.floor(Math.random() * employers.length)].toLowerCase().replace(/\s+/g, "") + ".co.ke"][Math.floor(Math.random() * 4)]}`,
      residentialAddress: `${["Plot", "House", "Apartment"][Math.floor(Math.random() * 3)]} ${randomInt(1, 500)}, ${["Kilimani", "Westlands", "Lavington", "Karen", "Eastleigh", "South B", "South C", "Buruburu", "Umoja", "Donholm"][Math.floor(Math.random() * 10)]}, ${regions[Math.floor(Math.random() * regions.length)]}`,
      businessAddress: customerType === "SME" ? `${["Industrial Area", "Westlands", "Upper Hill", "CBD"][Math.floor(Math.random() * 4)]}, ${regions[Math.floor(Math.random() * regions.length)]}` : undefined,
      region: regions[Math.floor(Math.random() * regions.length)],
      branch: branches[Math.floor(Math.random() * branches.length)],
      nationalId: kenyanId(),
      dateOfBirth: customerType === "Individual" ? randomDate(new Date(1960, 0, 1), new Date(1995, 0, 1)) : undefined,
      customerType,
      risk,
      segment,
      stage,
      preferredChannel: channels[Math.floor(Math.random() * channels.length)],
      preferredLanguage: ["English", "Swahili"][Math.floor(Math.random() * 2)],
      contactability: contactability[Math.floor(Math.random() * contactability.length)],
      consentStatus: ["Granted", "Revoked", "Pending"][Math.floor(Math.random() * 3)],
      optOutStatus: Math.random() > 0.9,
      restricted: stage === "Legal" || stage === "Write-off",
      totalExposure: 0,
      numberOfAccounts: numAccounts,
      lastContact: randomDate(new Date(2026, 7, 1), new Date(2026, 8, 7)),
      nextAction: ["Call customer", "Send WhatsApp reminder", "Send payment link", "Negotiate PTP", "Follow up broken promise", "Request supervisor approval", "Schedule field visit", "Escalate to legal", "Review collateral", "Offer restructuring"][Math.floor(Math.random() * 10)],
      assignedRelationshipManager: Math.random() > 0.5 ? users[Math.floor(Math.random() * users.length)].name : undefined,
      relatedParties: Math.random() > 0.6 ? [{
        name: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
        relationship: ["Spouse / Guarantor", "Co-borrower", "Employer", "Next of Kin"][Math.floor(Math.random() * 4)],
        phone: kenyanPhone()
      }] : [],
      accounts: [],
    };

    // Generate accounts for this customer
    for (let j = 0; j < numAccounts; j++) {
      const product = products[Math.floor(Math.random() * products.length)];
      const originalAmount = randomInt(100000, 5000000);
      const dpd = stage === "Pre-Delinquency" ? 0 : 
                   stage === "Early Warning" ? randomInt(1, 30) :
                   stage === "Active Collections" ? randomInt(31, 90) :
                   stage === "Recovery" ? randomInt(91, 180) :
                   stage === "Legal" ? randomInt(181, 360) : randomInt(361, 720);
      const outstanding = originalAmount * (1 - (dpd / 1000));
      const arrears = originalAmount * (dpd / 500);
      
      const account: AccountRecord = {
        id: `ACC-${1000000 + i * 10 + j}`,
        accountNumber: `${randomInt(1000, 9999)}-${randomInt(100, 999)}-${randomInt(1, 99)}`,
        customer,
        product,
        outstanding: money(outstanding),
        arrears: money(arrears),
        principal: money(outstanding * 0.85),
        interest: money(outstanding * 0.12),
        fees: money(outstanding * 0.03),
        penalties: money(outstanding * 0.05),
        dpd,
        originalAmount: money(originalAmount),
        disbursementDate: randomDate(new Date(2022, 0, 1), new Date(2025, 0, 1)),
        maturityDate: randomDate(new Date(2025, 0, 1), new Date(2028, 0, 1)),
        installmentAmount: money(originalAmount / randomInt(12, 48)),
        dueDate: randomDate(new Date(2026, 7, 1), new Date(2026, 9, 1)),
        lastPayment: { date: randomDate(new Date(2026, 6, 1), new Date(2026, 8, 1)), amount: randomInt(10000, 100000) },
        lastContact: randomDate(new Date(2026, 7, 15), new Date(2026, 8, 7)),
        assignedAgent: users.filter(u => u.role === "Collections Agent" || u.role === "Senior Agent")[Math.floor(Math.random() * users.filter(u => u.role === "Collections Agent" || u.role === "Senior Agent").length)].name,
        queue: queues[Math.floor(Math.random() * queues.length)].name,
        stage,
        segment,
        score: randomInt(200, 900),
        scoreCategory: risk === "Low" ? "Low" : risk === "Medium" ? "Medium" : "High",
        likelihoodToPay: randomInt(20, 95),
        selfCureProbability: randomInt(10, 80),
        contactabilityScore: randomInt(30, 90),
        recommendedChannel: channels[Math.floor(Math.random() * channels.length)],
        recommendedContactTime: ["08:00-10:00", "10:00-12:00", "12:00-14:00", "14:00-16:00", "16:00-18:00", "18:00-20:00"][Math.floor(Math.random() * 6)],
        status: stage === "Legal" ? "Litigation" : stage === "Write-off" ? "Restricted" : "Active",
        restricted: stage === "Legal" || stage === "Write-off",
        legalStatus: stage === "Legal" ? "In Litigation" : undefined,
        collateralStatus: product === "Asset Finance" || product === "Mortgage" ? "Secured" : "Unsecured",
        recoveryStatus: stage === "Recovery" ? "In Recovery" : undefined,
      };
      
      customer.accounts.push(account);
      customer.totalExposure += outstanding;
    }

    customers.push(customer);
  }

  return customers;
};

// Generate 80 customers with accounts
export const customers: CustomerRecord[] = generateCustomers(80);

// Flatten accounts for easy access
export const allAccounts = customers.flatMap((c) =>
  c.accounts.map((a) => ({ ...a, customer: c })),
);

// Helper functions
export function findCustomer(id: string) {
  return customers.find((c) => c.id === id || c.customerNumber.toLowerCase() === id.toLowerCase());
}

export function findAccount(id: string) {
  return allAccounts.find((a) => a.id === id || a.accountNumber === id);
}
