export type ModuleId = 
  | 'overview'
  | 'leads'
  | 'rules'
  | 'workflow'
  | 'settings'
  | 'advanced';

export type ClassificationType = 'HOT' | 'WARM' | 'COLD';

export type LeadStatus = 'New' | 'Reviewed' | 'Contacted' | 'Closed' | 'Disqualified';

export interface NavItem {
  id: ModuleId;
  label: string;
  iconName: string;
  badgeCount?: number;
  description: string;
  isAdvanced?: boolean;
}

export interface WorkspaceProfile {
  id: string;
  name: string;
  subtitle: string;
  industry: string;
  products: string[];
  targetCustomers: string[];
  importantSignals: string[];
  highValueCriteria: string[];
  urgencyCriteria: string[];
  budgetCriteria: string;
  notificationEmail: string;
  slackWebhook: string;
  n8nWebhookUrl: string;
  apiKey: string;
}

export interface LeadRecord {
  id: string;
  workspaceId: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  leadType: string;
  score: number; // 0-100
  classification: ClassificationType;
  date: string;
  status: LeadStatus;
  reviewed: boolean;
  qualificationReasons: string[];
  signalsDetected: string[];
  recommendedAction: string;
  notes?: string;
  submittedData?: Record<string, string>;
}

export interface WorkflowStage {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'configured' | 'pending';
  icon: string;
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  target: string;
  type: 'qualification' | 'rule_change' | 'lead_status' | 'notification' | 'webhook';
  status: 'success' | 'pending' | 'flagged';
}

export interface SystemNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'hot_lead' | 'rule_update' | 'system_alert' | 'webhook';
  read: boolean;
  leadId?: string;
}
