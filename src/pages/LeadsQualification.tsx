import React from 'react';
import { useAppStore } from '../store/useAppStore';
import { ClassificationType, LeadStatus, LeadRecord } from '../types';
import {
  Search,
  Flame,
  ThermometerSun,
  Snowflake,
  X,
  CheckCircle2,
  AlertCircle,
  Phone,
  Mail,
  Building2,
  Calendar,
  Tag,
  Clock,
  ArrowRight,
} from 'lucide-react';

export const LeadsQualification: React.FC = () => {
  const {
    workspaces,
    activeWorkspaceId,
    leads,
    searchQuery,
    setSearchQuery,
    classificationFilter,
    setClassificationFilter,
    selectedLeadId,
    setSelectedLeadId,
    isLeadModalOpen,
    setIsLeadModalOpen,
    updateLeadStatus,
    markLeadReviewed,
  } = useAppStore();

  const currentWorkspace = workspaces.find((w) => w.id === activeWorkspaceId) || workspaces[0];

  // Filter leads for current workspace
  const workspaceLeads = leads.filter((l) => l.workspaceId === activeWorkspaceId);

  // Apply search query and classification filter
  const filteredLeads = workspaceLeads.filter((lead) => {
    const matchesSearch =
      searchQuery === '' ||
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.leadType.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesClassification =
      classificationFilter === 'ALL' || lead.classification === classificationFilter;

    return matchesSearch && matchesClassification;
  });

  const selectedLead = workspaceLeads.find((l) => l.id === selectedLeadId) || filteredLeads[0];

  const getClassificationBadge = (classification: ClassificationType) => {
    switch (classification) {
      case 'HOT':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
            <Flame className="w-3.5 h-3.5 text-rose-600" />
            HOT LEAD
          </span>
        );
      case 'WARM':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <ThermometerSun className="w-3.5 h-3.5 text-amber-600" />
            WARM LEAD
          </span>
        );
      case 'COLD':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-sky-50 text-sky-700 border border-sky-200">
            <Snowflake className="w-3.5 h-3.5 text-sky-600" />
            COLD LEAD
          </span>
        );
    }
  };

  const getStatusBadge = (status: LeadStatus) => {
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
      case 'Closed':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-900 text-white">
            Closed
          </span>
        );
      case 'Disqualified':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
            Disqualified
          </span>
        );
    }
  };

  const openLeadDetail = (lead: LeadRecord) => {
    setSelectedLeadId(lead.id);
    setIsLeadModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Lead Management & AI Qualification</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Review and manage leads qualified for <span className="font-semibold text-slate-800">{currentWorkspace.name}</span>.
            </p>
          </div>

          {/* HOT / WARM / COLD Filter Tabs */}
          <div className="flex items-center p-1 rounded-lg bg-slate-100 border border-slate-200 self-start sm:self-auto">
            <button
              onClick={() => setClassificationFilter('ALL')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                classificationFilter === 'ALL'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All ({workspaceLeads.length})
            </button>
            <button
              onClick={() => setClassificationFilter('HOT')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors flex items-center gap-1 ${
                classificationFilter === 'HOT'
                  ? 'bg-rose-500 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-rose-700'
              }`}
            >
              <Flame className="w-3 h-3" />
              HOT ({workspaceLeads.filter((l) => l.classification === 'HOT').length})
            </button>
            <button
              onClick={() => setClassificationFilter('WARM')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors flex items-center gap-1 ${
                classificationFilter === 'WARM'
                  ? 'bg-amber-500 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-amber-700'
              }`}
            >
              <ThermometerSun className="w-3 h-3" />
              WARM ({workspaceLeads.filter((l) => l.classification === 'WARM').length})
            </button>
            <button
              onClick={() => setClassificationFilter('COLD')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors flex items-center gap-1 ${
                classificationFilter === 'COLD'
                  ? 'bg-sky-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-sky-700'
              }`}
            >
              <Snowflake className="w-3 h-3" />
              COLD ({workspaceLeads.filter((l) => l.classification === 'COLD').length})
            </button>
          </div>
        </div>

        {/* Search input */}
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by name, company, email, or lead type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Main Leads Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4">Lead Name</th>
                <th className="py-3.5 px-4">Company</th>
                <th className="py-3.5 px-4">Lead Type</th>
                <th className="py-3.5 px-4 text-center">AI Score</th>
                <th className="py-3.5 px-4">Classification</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              {filteredLeads.map((lead) => (
                <tr
                  key={lead.id}
                  onClick={() => openLeadDetail(lead)}
                  className="hover:bg-slate-50 transition-colors cursor-pointer group"
                >
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    <div>{lead.name}</div>
                    <div className="text-[11px] text-slate-400 font-normal">{lead.email}</div>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-800">
                    {lead.company}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 font-medium">
                    {lead.leadType}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`font-mono font-bold px-2 py-0.5 rounded border text-xs ${
                        lead.score >= 85
                          ? 'bg-rose-50 text-rose-700 border-rose-200'
                          : lead.score >= 60
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-sky-50 text-sky-700 border-sky-200'
                      }`}
                    >
                      {lead.score} / 100
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
                        openLeadDetail(lead);
                      }}
                      className="px-3 py-1 rounded-md bg-slate-100 hover:bg-cyan-600 hover:text-white border border-slate-200 font-semibold text-xs transition-colors cursor-pointer"
                    >
                      View AI Score
                    </button>
                  </td>
                </tr>
              ))}

              {filteredLeads.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400 text-xs">
                    No leads found matching your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide-over Modal for Lead Qualification Details */}
      {isLeadModalOpen && selectedLead && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-2xl bg-white h-full shadow-2xl overflow-y-auto flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-200">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-slate-900">{selectedLead.name}</h3>
                  {getClassificationBadge(selectedLead.classification)}
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  {selectedLead.company} &bull; {selectedLead.leadType}
                </p>
              </div>

              <button
                onClick={() => setIsLeadModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content Body */}
            <div className="p-6 space-y-6 flex-1">
              {/* AI Score Banner Card */}
              <div className="bg-slate-900 text-white rounded-xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
                <div>
                  <div className="text-xs font-mono text-cyan-400 font-semibold tracking-wider uppercase">
                    AURA QUALIFICATION SCORE
                  </div>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-4xl font-extrabold font-mono text-white">
                      {selectedLead.score}
                    </span>
                    <span className="text-slate-400 font-mono text-lg">/ 100</span>
                  </div>
                  <div className="text-xs text-slate-300 mt-1 font-medium">
                    Classification: <span className="font-bold text-white">{selectedLead.classification} LEAD</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  {!selectedLead.reviewed && (
                    <button
                      onClick={() => markLeadReviewed(selectedLead.id)}
                      className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-2xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Mark as Reviewed
                    </button>
                  )}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400 font-medium">Status:</span>
                    <select
                      value={selectedLead.status}
                      onChange={(e) => updateLeadStatus(selectedLead.id, e.target.value as LeadStatus)}
                      className="bg-slate-800 border border-slate-700 text-white text-xs font-semibold rounded px-2.5 py-1 focus:outline-none focus:ring-2 focus:ring-cyan-500 cursor-pointer"
                    >
                      <option value="New">New</option>
                      <option value="Reviewed">Reviewed</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Closed">Closed</option>
                      <option value="Disqualified">Disqualified</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Qualification Reasons ("Why Aura assigned this score") */}
              <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-600" />
                  Why Aura Assigned This Score:
                </h4>
                <ul className="space-y-2">
                  {selectedLead.qualificationReasons.map((reason, idx) => (
                    <li
                      key={idx}
                      className="text-xs font-medium text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100 flex items-start gap-2"
                    >
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Signals Detected */}
              <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Tag className="w-4 h-4 text-cyan-600" />
                  Signals Detected:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedLead.signalsDetected.map((signal, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold"
                    >
                      {signal}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recommended Next Action */}
              <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-5 space-y-2">
                <h4 className="text-xs font-bold text-cyan-900 uppercase tracking-wider flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-cyan-700" />
                  Recommended Next Action:
                </h4>
                <p className="text-xs font-bold text-cyan-950">
                  {selectedLead.recommendedAction}
                </p>
              </div>

              {/* Lead Contact Info */}
              <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Lead Information
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 font-medium">Email Address:</span>
                    <div className="font-semibold text-slate-900 mt-0.5 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      {selectedLead.email}
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium">Phone Number:</span>
                    <div className="font-semibold text-slate-900 mt-0.5 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      {selectedLead.phone}
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium">Company Name:</span>
                    <div className="font-semibold text-slate-900 mt-0.5 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      {selectedLead.company}
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium">Date Received:</span>
                    <div className="font-semibold text-slate-900 mt-0.5 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {selectedLead.date}
                    </div>
                  </div>
                </div>

                {selectedLead.submittedData && (
                  <div className="pt-3 border-t border-slate-100">
                    <span className="text-slate-400 font-medium text-xs">Form Submission Payload:</span>
                    <div className="mt-2 bg-slate-50 rounded-lg p-3 border border-slate-200 text-xs space-y-1">
                      {Object.entries(selectedLead.submittedData).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-slate-500 font-medium">{key}:</span>
                          <span className="font-semibold text-slate-900">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                Lead ID: {selectedLead.id}
              </span>
              <button
                onClick={() => setIsLeadModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold text-xs transition-colors cursor-pointer"
              >
                Close Drawer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
