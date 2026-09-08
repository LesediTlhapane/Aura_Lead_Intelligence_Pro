import { create } from 'zustand';
import {
  ModuleId,
  WorkspaceProfile,
  LeadRecord,
  LeadStatus,
  ClassificationType,
  SystemNotification,
  ActivityLog,
} from '../types';

interface AppStoreState {
  activeModule: ModuleId;
  activeWorkspaceId: string;
  workspaces: WorkspaceProfile[];
  leads: LeadRecord[];
  notifications: SystemNotification[];
  activities: ActivityLog[];
  selectedLeadId: string | null;
  isLeadModalOpen: boolean;
  searchQuery: string;
  classificationFilter: 'ALL' | ClassificationType;
  isAdvancedNavExpanded: boolean;

  // Actions
  setActiveModule: (module: ModuleId) => void;
  setActiveWorkspace: (workspaceId: string) => void;
  updateWorkspaceRules: (workspaceId: string, updatedFields: Partial<WorkspaceProfile>) => void;
  setSelectedLeadId: (leadId: string | null) => void;
  setIsLeadModalOpen: (open: boolean) => void;
  setSearchQuery: (query: string) => void;
  setClassificationFilter: (filter: 'ALL' | ClassificationType) => void;
  updateLeadStatus: (leadId: string, status: LeadStatus) => void;
  markLeadReviewed: (leadId: string) => void;
  addLead: (lead: Omit<LeadRecord, 'id' | 'workspaceId' | 'date'>) => void;
  toggleAdvancedNav: () => void;
  markNotificationRead: (id: string) => void;
}

const defaultWorkspaces: WorkspaceProfile[] = [
  {
    id: 'msr-solutions',
    name: 'MSR-SOLUTIONS',
    subtitle: 'Environmental & Energy Solutions',
    industry: 'Renewable Energy & CleanTech',
    products: ['Residential Solar', 'Commercial Solar', 'Industrial Solar', 'Environmental Solutions'],
    targetCustomers: ['Commercial Manufacturers', 'Industrial Warehouses', 'Agricultural Enterprises', 'Property Developers'],
    importantSignals: [
      'Commercial project requirement',
      'Industrial facility footprint',
      'High monthly energy consumption (> R50k/mo)',
      'Urgent installation timeline (< 60 days)',
      'Pre-approved capital budget',
      'Decision-maker identified (Facilities/Operations Director)'
    ],
    highValueCriteria: [
      'Commercial or Industrial solar system (> 100kW)',
      'Budget exceeds $100,000 / R1,500,000',
      'Multi-site rollout potential'
    ],
    urgencyCriteria: [
      'Immediate deployment window required',
      'Active grid outage / load-shedding mitigation need'
    ],
    budgetCriteria: 'R250,000 - R5,000,000+ per project',
    notificationEmail: 'leads@msr-solutions.co.za',
    slackWebhook: 'https://hooks.slack.com/services/MSR/LEADS/HOT_ALERTS',
    n8nWebhookUrl: 'https://n8n.msr-solutions.co.za/webhook/aura-lead-submission',
    apiKey: 'aura_live_msr_89f0a21d98e74a',
  },
  {
    id: 'apex-industrial',
    name: 'APEX INDUSTRIAL',
    subtitle: 'Robotics & Automation Systems',
    industry: 'Industrial Automation',
    products: ['Robotic Arms', 'Automated Conveyors', 'Vision Inspection', 'PLC Control Systems'],
    targetCustomers: ['Automotive OEMs', 'Pharmaceutical Packaging', 'Food Processing Plants'],
    importantSignals: ['Factory Automation', 'Warehouse Expansion', 'Line Throughput Bottleneck'],
    highValueCriteria: ['Full Plant Automation (> $500k)', 'Multi-Plant Standardization'],
    urgencyCriteria: ['Q4 Budget Cycle Spend', 'Line Failure Replacement'],
    budgetCriteria: '$100,000 - $2,000,000',
    notificationEmail: 'sales@apexindustrial.com',
    slackWebhook: 'https://hooks.slack.com/services/APEX/LEADS/HOT',
    n8nWebhookUrl: 'https://n8n.apexindustrial.com/webhook/aura-lead',
    apiKey: 'aura_live_apex_33b11c90a12e',
  },
];

const initialLeads: LeadRecord[] = [
  {
    id: 'lead-101',
    workspaceId: 'msr-solutions',
    name: 'John Smith',
    company: 'ABC Manufacturing',
    email: 'j.smith@abcmfg.co.za',
    phone: '+27 82 451 9023',
    leadType: 'Commercial Solar',
    score: 91,
    classification: 'HOT',
    date: 'Today, 08:45 AM',
    status: 'New',
    reviewed: false,
    qualificationReasons: [
      '✓ Commercial project requirement verified',
      '✓ High energy load (> 150kW grid requirement)',
      '✓ Immediate deployment timeline (< 30 days)',
      '✓ Complete decision-maker contact details provided'
    ],
    signalsDetected: [
      'Commercial Facility',
      'High Energy Consumption',
      'Decision-Maker Identified',
      'Immediate Deployment'
    ],
    recommendedAction: 'Contact within 24 hours. Assign Senior Energy Specialist for site evaluation.',
    submittedData: {
      'Project Type': 'Commercial Solar Installation',
      'Estimated Roof Area': '4,500 m²',
      'Monthly Electricity Bill': 'R125,000',
      'Timeline': 'Within 1 Month',
      'Decision Maker': 'Yes (Operations Director)'
    }
  },
  {
    id: 'lead-102',
    workspaceId: 'msr-solutions',
    name: 'Sarah Jenkins',
    company: 'Apex Logistics Hub',
    email: 's.jenkins@apexlogistics.co.za',
    phone: '+27 83 912 4001',
    leadType: 'Industrial Solar',
    score: 88,
    classification: 'HOT',
    date: 'Today, 07:15 AM',
    status: 'New',
    reviewed: false,
    qualificationReasons: [
      '✓ Industrial warehouse complex (6,000m² roof)',
      '✓ Capital budget pre-approved (> R1.5M)',
      '✓ Facilities Director decision-maker',
      '✓ Urgent installation requested for grid resilience'
    ],
    signalsDetected: [
      'Industrial Project',
      'Urgent Installation',
      'Budget > R1.5M',
      'Roof Area > 5000m²'
    ],
    recommendedAction: 'Schedule technical site audit within 12 hours.',
    submittedData: {
      'Project Type': 'Industrial Microgrid & Solar',
      'Facility Size': '6,000 m²',
      'Current Power Backup': 'Diesel Generators (High Cost)',
      'Timeline': 'Urgent'
    }
  },
  {
    id: 'lead-103',
    workspaceId: 'msr-solutions',
    name: 'Amanda Reyes',
    company: 'Horizon Cold Storage',
    email: 'areyes@horizoncold.co.za',
    phone: '+27 71 502 1198',
    leadType: 'Industrial Solar',
    score: 95,
    classification: 'HOT',
    date: 'Today, 06:30 AM',
    status: 'New',
    reviewed: false,
    qualificationReasons: [
      '✓ Continuous high-load refrigeration demand',
      '✓ Capital budget pre-approved (> R3.0M)',
      '✓ VP Operations decision maker',
      '✓ RFQ documentation attached'
    ],
    signalsDetected: [
      'Refrigeration High Load',
      'Pre-Approved Budget',
      'High ROI Potential',
      'Decision-Maker Verified'
    ],
    recommendedAction: 'Assign VP Engineering & call within 2 hours.',
    submittedData: {
      'Facility Type': 'Cold Storage Logistics',
      'Estimated Budget': 'R3,500,000',
      'Grid Dependability Need': 'Critical 24/7 Uptime'
    }
  },
  {
    id: 'lead-104',
    workspaceId: 'msr-solutions',
    name: 'David Miller',
    company: 'Green Valley Foods',
    email: 'dmiller@greenvalley.co.za',
    phone: '+27 82 109 4832',
    leadType: 'Environmental Solutions',
    score: 74,
    classification: 'WARM',
    date: 'Yesterday',
    status: 'Reviewed',
    reviewed: true,
    qualificationReasons: [
      '✓ Environmental compliance & wastewater audit initiative',
      '✓ Budget specified (R500,000 - R1,000,000)',
      '⚠ Extended decision timeframe (3-6 months)'
    ],
    signalsDetected: [
      'Compliance Driven',
      'Mid-Market Food Producer',
      'Flexible Timeline'
    ],
    recommendedAction: 'Send Environmental Solutions case studies & book discovery call next week.',
    submittedData: {
      'Initiative': 'Wastewater Treatment & Solar Hybrid',
      'Budget': 'R750,000',
      'Target Date': 'Q1 Next Year'
    }
  },
  {
    id: 'lead-105',
    workspaceId: 'msr-solutions',
    name: 'Elena Rostova',
    company: 'BlueWave Fisheries',
    email: 'e.rostova@bluewave.co.za',
    phone: '+27 84 330 9182',
    leadType: 'Commercial Solar',
    score: 68,
    classification: 'WARM',
    date: 'Yesterday',
    status: 'Contacted',
    reviewed: true,
    qualificationReasons: [
      '✓ Commercial processing plant',
      '⚠ Preliminary feasibility research phase',
      '⚠ Pending board approval in November'
    ],
    signalsDetected: [
      'Commercial Processing',
      'Early Stage Research',
      'Multi-Location Potential'
    ],
    recommendedAction: 'Nurture via case study email drip campaign.',
    submittedData: {
      'Facility': 'Seafood Processing Facility',
      'Status': 'Gathering Proposals for Board Review'
    }
  },
  {
    id: 'lead-106',
    workspaceId: 'msr-solutions',
    name: 'Michael Vance',
    company: 'Vance Residential Contracting',
    email: 'mvance@vancebuild.co.za',
    phone: '+27 83 001 9283',
    leadType: 'Residential Solar',
    score: 42,
    classification: 'COLD',
    date: '2 days ago',
    status: 'Disqualified',
    reviewed: true,
    qualificationReasons: [
      '✕ Single-family residential inquiry (Below B2B ICP threshold)',
      '✕ No commercial entity or company energy load',
      '✕ Low system capacity requirement (< 10kW)'
    ],
    signalsDetected: [
      'Residential Only',
      'Sub-Threshold System Size',
      'Low B2B Fit'
    ],
    recommendedAction: 'Route to automated residential installer partner network.',
    submittedData: {
      'Property Type': 'Residential Home (3 Bedroom)',
      'System Needed': '5kW Inverter + 1 Battery'
    }
  },
];

const initialNotifications: SystemNotification[] = [
  {
    id: 'notif-1',
    title: '🔥 New HOT Lead Qualified',
    message: 'John Smith (ABC Manufacturing) scored 91/100 for Commercial Solar.',
    timestamp: '10 mins ago',
    type: 'hot_lead',
    read: false,
    leadId: 'lead-101',
  },
  {
    id: 'notif-2',
    title: '⚡ High Value Industrial Opportunity',
    message: 'Amanda Reyes (Horizon Cold Storage) scored 95/100 (Budget > R3.0M).',
    timestamp: '2 hours ago',
    type: 'hot_lead',
    read: false,
    leadId: 'lead-103',
  },
  {
    id: 'notif-3',
    title: '⚙️ Qualification Rules Updated',
    message: 'Qualification rules for MSR-SOLUTIONS updated successfully.',
    timestamp: '1 day ago',
    type: 'rule_update',
    read: true,
  },
];

const initialActivities: ActivityLog[] = [
  {
    id: 'act-1',
    timestamp: 'Just now',
    actor: 'Aura AI Engine',
    action: 'Qualified Lead: Amanda Reyes (Horizon Cold Storage)',
    target: 'Score: 95/100 (HOT)',
    type: 'qualification',
    status: 'success',
  },
  {
    id: 'act-2',
    timestamp: '15 mins ago',
    actor: 'n8n Webhook',
    action: 'Received submission from Website Commercial Solar Form',
    target: 'ABC Manufacturing',
    type: 'webhook',
    status: 'success',
  },
  {
    id: 'act-3',
    timestamp: '1 hour ago',
    actor: 'Lead Manager',
    action: 'Marked Lead #lead-104 as Reviewed',
    target: 'David Miller (Green Valley Foods)',
    type: 'lead_status',
    status: 'success',
  },
];

export const useAppStore = create<AppStoreState>((set) => ({
  activeModule: 'overview',
  activeWorkspaceId: 'msr-solutions',
  workspaces: defaultWorkspaces,
  leads: initialLeads,
  notifications: initialNotifications,
  activities: initialActivities,
  selectedLeadId: null,
  isLeadModalOpen: false,
  searchQuery: '',
  classificationFilter: 'ALL',
  isAdvancedNavExpanded: false,

  setActiveModule: (module: ModuleId) => set({ activeModule: module }),
  
  setActiveWorkspace: (workspaceId: string) =>
    set((state) => ({
      activeWorkspaceId: workspaceId,
      // Clear lead selection if changing workspace
      selectedLeadId: null,
      isLeadModalOpen: false,
    })),

  updateWorkspaceRules: (workspaceId: string, updatedFields: Partial<WorkspaceProfile>) =>
    set((state) => ({
      workspaces: state.workspaces.map((ws) =>
        ws.id === workspaceId ? { ...ws, ...updatedFields } : ws
      ),
      activities: [
        {
          id: `act-${Date.now()}`,
          timestamp: 'Just now',
          actor: 'Workspace Admin',
          action: `Updated Qualification Rules for ${state.workspaces.find(w => w.id === workspaceId)?.name || 'Workspace'}`,
          target: 'Rules Configuration',
          type: 'rule_change',
          status: 'success',
        },
        ...state.activities,
      ],
    })),

  setSelectedLeadId: (leadId: string | null) => set({ selectedLeadId: leadId }),
  setIsLeadModalOpen: (open: boolean) => set({ isLeadModalOpen: open }),
  setSearchQuery: (query: string) => set({ searchQuery: query }),
  setClassificationFilter: (filter: 'ALL' | ClassificationType) => set({ classificationFilter: filter }),

  updateLeadStatus: (leadId: string, status: LeadStatus) =>
    set((state) => ({
      leads: state.leads.map((l) =>
        l.id === leadId ? { ...l, status } : l
      ),
    })),

  markLeadReviewed: (leadId: string) =>
    set((state) => ({
      leads: state.leads.map((l) =>
        l.id === leadId ? { ...l, reviewed: true, status: l.status === 'New' ? 'Reviewed' : l.status } : l
      ),
    })),

  addLead: (newLeadData) =>
    set((state) => {
      const newLead: LeadRecord = {
        ...newLeadData,
        id: `lead-${Date.now()}`,
        workspaceId: state.activeWorkspaceId,
        date: 'Just now',
      };
      
      const newNotification: SystemNotification = {
        id: `notif-${Date.now()}`,
        title: `${newLead.classification === 'HOT' ? '🔥' : '⚡'} New Lead Submitted`,
        message: `${newLead.name} (${newLead.company}) scored ${newLead.score}/100 [${newLead.classification}]`,
        timestamp: 'Just now',
        type: 'hot_lead',
        read: false,
        leadId: newLead.id,
      };

      return {
        leads: [newLead, ...state.leads],
        notifications: [newNotification, ...state.notifications],
        activities: [
          {
            id: `act-${Date.now()}`,
            timestamp: 'Just now',
            actor: 'n8n Webhook / AI Engine',
            action: `Qualified Lead: ${newLead.name} (${newLead.company})`,
            target: `Score: ${newLead.score}/100 (${newLead.classification})`,
            type: 'qualification',
            status: 'success',
          },
          ...state.activities,
        ],
      };
    }),

  toggleAdvancedNav: () => set((state) => ({ isAdvancedNavExpanded: !state.isAdvancedNavExpanded })),

  markNotificationRead: (id: string) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),
}));
