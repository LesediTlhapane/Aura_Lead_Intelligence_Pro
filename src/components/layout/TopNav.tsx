import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import {
  Building2,
  ChevronDown,
  Bell,
  Check,
  Search,
  Plus,
} from 'lucide-react';

export const TopNav: React.FC = () => {
  const {
    activeModule,
    workspaces,
    activeWorkspaceId,
    setActiveWorkspace,
    notifications,
    searchQuery,
    setSearchQuery,
  } = useAppStore();

  const [isWorkspaceDropdownOpen, setIsWorkspaceDropdownOpen] = useState(false);

  const activeWorkspace = workspaces.find((w) => w.id === activeWorkspaceId) || workspaces[0];
  const unreadNotifications = notifications.filter((n) => !n.read).length;

  const moduleTitles: Record<string, string> = {
    overview: 'Dashboard',
    leads: 'Lead Management',
    rules: 'Qualification Rules',
    workflow: 'Automation Workflow',
    settings: 'Settings & Integrations',
    advanced: 'Advanced Intelligence',
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between gap-4">
      {/* Left: Product Title & Workspace Selector */}
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-base font-bold text-slate-900 leading-tight">
            Aura Lead Intelligence
          </h1>
          <div className="text-xs text-slate-500 font-medium">
            {moduleTitles[activeModule] || 'Dashboard'}
          </div>
        </div>

        <div className="h-6 w-[1px] bg-slate-200" />

        {/* Workspace Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsWorkspaceDropdownOpen(!isWorkspaceDropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 hover:bg-slate-200/80 transition-colors text-xs font-semibold text-slate-800 cursor-pointer"
          >
            <Building2 className="w-4 h-4 text-cyan-600" />
            <span>Workspace:</span>
            <span className="font-bold text-slate-900">{activeWorkspace.name}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
          </button>

          {isWorkspaceDropdownOpen && (
            <div className="absolute left-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50">
              <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold border-b border-slate-100">
                Select Business Profile / Workspace
              </div>
              <div className="py-1">
                {workspaces.map((ws) => (
                  <button
                    key={ws.id}
                    onClick={() => {
                      setActiveWorkspace(ws.id);
                      setIsWorkspaceDropdownOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 text-left hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-900">{ws.name}</div>
                      <div className="text-[11px] text-slate-500">{ws.subtitle}</div>
                    </div>
                    {ws.id === activeWorkspaceId && (
                      <Check className="w-4 h-4 text-cyan-600" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Center: Search input */}
      <div className="hidden md:flex flex-1 max-w-xs mx-auto">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search leads by name or company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Right: Notifications & User profile */}
      <div className="flex items-center gap-3">
        <button
          className="relative p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
          title="Notifications"
        >
          <Bell className="w-5 h-5" />
          {unreadNotifications > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-600" />
          )}
        </button>

        <div className="h-5 w-[1px] bg-slate-200" />

        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-cyan-700 text-white font-bold text-xs flex items-center justify-center shadow-2xs">
            MS
          </div>
          <div className="hidden xl:flex flex-col text-left">
            <span className="text-xs font-bold text-slate-900 leading-tight">MSR Operations</span>
            <span className="text-[10px] text-slate-500 font-medium">Lead Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
};
