import React from 'react';
import { useAppStore } from '../store/useAppStore';
import { ClassificationType } from '../types';
import {
  Users,
  Flame,
  ThermometerSun,
  Snowflake,
  ArrowUpRight,
  Filter,
  CheckCircle2,
  Building2,
  Calendar,
  Sparkles,
} from 'lucide-react';

export const DashboardOverview: React.FC = () => {
  const {
    workspaces,
    activeWorkspaceId,
    leads,
    setActiveModule,
    setSelectedLeadId,
    setIsLeadModalOpen,
  } = useAppStore();

  const currentWorkspace = workspaces.find((w) => w.id === activeWorkspaceId) || workspaces[0];
  const workspaceLeads = leads.filter((l) => l.workspaceId === activeWorkspaceId);

  const totalLeads = workspaceLeads.length;
  const hotLeads = workspaceLeads.filter((l) => l.classification === 'HOT').length;
  const warmLeads = workspaceLeads.filter((l) => l.classification === 'WARM').length;
  const coldLeads = workspaceLeads.filter((l) => l.classification === 'COLD').length;

  const recentLeads = workspaceLeads.slice(0, 6);

  const getClassificationBadge = (classification: ClassificationType) => {
    switch (classification) {
      case 'HOT':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
            <Flame className="w-3 h-3 text-rose-600" />
            HOT
          </span>
        );
      case 'WARM':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <ThermometerSun className="w-3 h-3 text-amber-600" />
            WARM
          </span>
        );
      case 'COLD':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-sky-50 text-sky-700 border border-sky-200">
            <Snowflake className="w-3 h-3 text-sky-600" />
            COLD
          </span>
        );
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'New':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            New
          </span>
        );
      case 'Reviewed':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            Reviewed
          </span>
        );
      case 'Contacted':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-purple-50 text-purple-700 border border-purple-200">
            Contacted
          </span>
        );
      case 'Disqualified':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
            Disqualified
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
            {status}
          </span>
        );
    }
  };

  const openLeadDetail = (leadId: string) => {
    setSelectedLeadId(leadId);
    setIsLeadModalOpen(true);
    setActiveModule('leads');
  };

  return (
    <div className="space-y-6">
      {/* Dashboard Workspace Banner Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900">Aura Lead Intelligence</h2>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-semibold">
              Workspace: {currentWorkspace.name}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time lead qualification engine for {currentWorkspace.subtitle}.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveModule('workflow')}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-100 border border-slate-200 hover:bg-slate-200/80 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-cyan-600" />
            View Workflow Diagram
          </button>
          <button
            onClick={() => setActiveModule('rules')}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
          >
            Configure Rules
          </button>
        </div>
      </div>

      {/* Main Key Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Leads */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
              Total Leads
            </span>
            <div className="text-2xl font-bold text-slate-900 mt-1">{totalLeads}</div>
            <span className="text-[11px] text-slate-500 mt-0.5 inline-block">
              Qualified by Aura AI
            </span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600">
            <Users className="w-5 h-5" />
          </div>
        </div>

        {/* Hot Leads */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
              Hot Leads
            </span>
            <div className="text-2xl font-bold text-rose-600 mt-1">{hotLeads}</div>
            <span className="text-[11px] font-medium text-rose-700 mt-0.5 inline-block">
              High buying intent (&gt;85 score)
            </span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
            <Flame className="w-5 h-5" />
          </div>
        </div>

        {/* Warm Leads */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
              Warm Leads
            </span>
            <div className="text-2xl font-bold text-amber-600 mt-1">{warmLeads}</div>
            <span className="text-[11px] font-medium text-amber-700 mt-0.5 inline-block">
              Nurture phase (60-84 score)
            </span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
            <ThermometerSun className="w-5 h-5" />
          </div>
        </div>

        {/* Cold Leads */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
              Cold Leads
            </span>
            <div className="text-2xl font-bold text-sky-600 mt-1">{coldLeads}</div>
            <span className="text-[11px] font-medium text-sky-700 mt-0.5 inline-block">
              Low priority (&lt;60 score)
            </span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600">
            <Snowflake className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main Section: Recent Leads Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Recent Leads</h3>
            <p className="text-xs text-slate-500">
              Latest incoming website lead submissions analyzed by Aura.
            </p>
          </div>
          <button
            onClick={() => setActiveModule('leads')}
            className="flex items-center gap-1.5 text-xs font-bold text-cyan-700 hover:text-cyan-800 transition-colors cursor-pointer"
          >
            View All Leads ({totalLeads})
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Lead Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Company</th>
                <th className="py-3 px-4">Lead Type</th>
                <th className="py-3 px-4 text-center">Score</th>
                <th className="py-3 px-4">Classification</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              {recentLeads.map((lead) => (
                <tr
                  key={lead.id}
                  onClick={() => openLeadDetail(lead.id)}
                  className="hover:bg-slate-50 transition-colors cursor-pointer group"
                >
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    {lead.name}
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-800">
                    {lead.company}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">
                    {lead.leadType}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      {lead.score}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    {getClassificationBadge(lead.classification)}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 text-[11px]">
                    {lead.date}
                  </td>
                  <td className="py-3.5 px-4">
                    {getStatusBadge(lead.status)}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openLeadDetail(lead.id);
                      }}
                      className="px-2.5 py-1 rounded bg-slate-100 hover:bg-cyan-50 text-slate-700 hover:text-cyan-800 border border-slate-200 hover:border-cyan-200 font-semibold text-[11px] transition-colors"
                    >
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
