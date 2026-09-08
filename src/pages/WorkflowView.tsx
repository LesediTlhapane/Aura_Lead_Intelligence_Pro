import React, { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { ClassificationType } from '../types';
import {
  FileText,
  Webhook,
  Sparkles,
  Award,
  Flame,
  Bell,
  LayoutDashboard,
  Play,
  CheckCircle2,
  ArrowDown,
  Layers,
} from 'lucide-react';

export const WorkflowView: React.FC = () => {
  const { workspaces, activeWorkspaceId, addLead, setActiveModule } = useAppStore();

  const currentWorkspace = workspaces.find((w) => w.id === activeWorkspaceId) || workspaces[0];

  // Test Webhook Submission Simulator Form State
  const [testLeadName, setTestLeadName] = useState('David Hendricks');
  const [testCompany, setTestCompany] = useState('Cape Logistics Facility');
  const [testEmail, setTestEmail] = useState('d.hendricks@capelogistics.co.za');
  const [testPhone, setTestPhone] = useState('+27 82 888 1234');
  const [testLeadType, setTestLeadType] = useState('Commercial Solar');
  const [testRoofArea, setTestRoofArea] = useState('5,200 m²');
  const [testBudget, setTestBudget] = useState('R2,200,000');
  const [testTimeline, setTestTimeline] = useState('Immediate (< 30 days)');

  const [isSimulating, setIsSimulating] = useState(false);
  const [simulatedResult, setSimulatedResult] = useState<{
    score: number;
    classification: ClassificationType;
  } | null>(null);

  const handleSimulateWebhook = () => {
    setIsSimulating(true);
    setSimulatedResult(null);

    setTimeout(() => {
      // Logic to score mock lead based on inputs
      const isCommercial = testLeadType.includes('Commercial') || testLeadType.includes('Industrial');
      const isLargeRoof = parseInt(testRoofArea.replace(/[^0-9]/g, '')) > 2000;
      const isImmediate = testTimeline.includes('Immediate');

      let score = 55;
      if (isCommercial) score += 20;
      if (isLargeRoof) score += 15;
      if (isImmediate) score += 10;
      score = Math.min(score, 96);

      const classification: ClassificationType =
        score >= 85 ? 'HOT' : score >= 60 ? 'WARM' : 'COLD';

      addLead({
        name: testLeadName,
        company: testCompany,
        email: testEmail,
        phone: testPhone,
        leadType: testLeadType,
        score,
        classification,
        status: 'New',
        reviewed: false,
        qualificationReasons: [
          '✓ Commercial facility footprint verified',
          `✓ Roof area meets threshold (${testRoofArea})`,
          `✓ Pre-approved budget specified (${testBudget})`,
          `✓ Deployment timeline: ${testTimeline}`,
        ],
        signalsDetected: [
          'Commercial Project',
          'Immediate Deployment',
          'High Roof Footprint',
          'Budget Verified',
        ],
        recommendedAction:
          classification === 'HOT'
            ? 'Contact within 2 hours & assign Senior Technical Auditor.'
            : 'Follow up within 24 hours with Feasibility Proposal.',
        submittedData: {
          'Project Type': testLeadType,
          'Roof Area': testRoofArea,
          'Estimated Budget': testBudget,
          'Timeline': testTimeline,
        },
      });

      setIsSimulating(false);
      setSimulatedResult({ score, classification });
    }, 1200);
  };

  const workflowSteps = [
    {
      step: 1,
      title: 'Website Lead Form',
      subtitle: 'Customer submits form on your website',
      icon: <FileText className="w-5 h-5 text-cyan-600" />,
      tag: 'Trigger',
    },
    {
      step: 2,
      title: 'n8n Webhook',
      subtitle: `POST ${currentWorkspace.n8nWebhookUrl}`,
      icon: <Webhook className="w-5 h-5 text-purple-600" />,
      tag: 'API Integration',
    },
    {
      step: 3,
      title: 'AI Qualification',
      subtitle: `Evaluated against ${currentWorkspace.name} Rules`,
      icon: <Sparkles className="w-5 h-5 text-amber-600" />,
      tag: 'AI Intelligence',
    },
    {
      step: 4,
      title: 'Score Lead',
      subtitle: 'Algorithmic Intent & ICP fit scoring (0 - 100)',
      icon: <Award className="w-5 h-5 text-emerald-600" />,
      tag: 'Scoring Engine',
    },
    {
      step: 5,
      title: 'HOT / WARM / COLD',
      subtitle: 'Threshold classification & routing',
      icon: <Flame className="w-5 h-5 text-rose-600" />,
      tag: 'Classification',
    },
    {
      step: 6,
      title: 'Notify Business',
      subtitle: `Instant alert via Email (${currentWorkspace.notificationEmail}) & Slack`,
      icon: <Bell className="w-5 h-5 text-sky-600" />,
      tag: 'Alerts',
    },
    {
      step: 7,
      title: 'Aura Dashboard',
      subtitle: 'Populated in real-time for Human Review',
      icon: <LayoutDashboard className="w-5 h-5 text-slate-800" />,
      tag: 'Dashboard',
    },
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs">
        <h2 className="text-xl font-bold text-slate-900">Automation Workflow Representation</h2>
        <p className="text-xs text-slate-500 mt-1">
          End-to-end B2B lead qualification pipeline operating between your website, n8n webhook, AI engine, and Aura Lead Intelligence.
        </p>
      </div>

      {/* Clean Visual Automation Diagram */}
      <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-2xs space-y-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6 text-center">
          Automation Diagram &bull; Workspace: {currentWorkspace.name}
        </h3>

        <div className="space-y-4 max-w-xl mx-auto">
          {workflowSteps.map((s, idx) => (
            <React.Fragment key={s.step}>
              <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-cyan-300 hover:bg-white transition-all shadow-2xs">
                <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-2xs">
                  {s.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-slate-900">{s.title}</h4>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-200/70 text-slate-700">
                      {s.tag}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{s.subtitle}</p>
                </div>
                <span className="font-mono text-xs font-bold text-slate-400">0{s.step}</span>
              </div>

              {idx < workflowSteps.length - 1 && (
                <div className="flex justify-center my-1">
                  <ArrowDown className="w-4 h-4 text-cyan-600" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Interactive Webhook Test Simulator */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Play className="w-4 h-4 text-cyan-600" />
              Live n8n Webhook Test Simulator
            </h3>
            <p className="text-xs text-slate-500">
              Submit a sample lead payload to trigger the qualification pipeline in real time.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Contact Name:</label>
            <input
              type="text"
              value={testLeadName}
              onChange={(e) => setTestLeadName(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Company Name:</label>
            <input
              type="text"
              value={testCompany}
              onChange={(e) => setTestCompany(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Email:</label>
            <input
              type="email"
              value={testEmail}
              onChange={(e) => setTestEmail(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Phone:</label>
            <input
              type="text"
              value={testPhone}
              onChange={(e) => setTestPhone(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Lead Requirement:</label>
            <select
              value={testLeadType}
              onChange={(e) => setTestLeadType(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white"
            >
              <option value="Commercial Solar">Commercial Solar</option>
              <option value="Industrial Solar">Industrial Solar</option>
              <option value="Environmental Solutions">Environmental Solutions</option>
              <option value="Residential Solar">Residential Solar</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Roof Footprint / Area:</label>
            <input
              type="text"
              value={testRoofArea}
              onChange={(e) => setTestRoofArea(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-200">
          <span className="text-[11px] text-slate-400 font-mono">
            Payload target: {currentWorkspace.n8nWebhookUrl}
          </span>
          <button
            onClick={handleSimulateWebhook}
            disabled={isSimulating}
            className="px-5 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs shadow-2xs transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSimulating ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin" />
                Processing AI Qualification...
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Simulate Webhook Lead Submission
              </>
            )}
          </button>
        </div>

        {simulatedResult && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                Lead Successfully Qualified &amp; Ingested!
              </div>
              <p className="text-xs text-emerald-800 mt-1">
                {testLeadName} ({testCompany}) was assigned an AI Score of{' '}
                <span className="font-bold font-mono text-emerald-950">{simulatedResult.score}/100</span> [{simulatedResult.classification}].
              </p>
            </div>
            <button
              onClick={() => setActiveModule('leads')}
              className="px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              View in Leads Table &rarr;
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
