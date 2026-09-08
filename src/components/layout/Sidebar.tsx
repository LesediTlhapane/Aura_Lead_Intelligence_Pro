import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { ModuleId } from '../../types';
import { cn } from '../../lib/utils';
import {
  LayoutDashboard,
  Users,
  Sliders,
  GitFork,
  Settings,
  Sparkles,
  ChevronRight,
  TrendingUp,
  Send,
  PieChart,
  Building2,
  Zap,
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const {
    activeModule,
    setActiveModule,
    workspaces,
    activeWorkspaceId,
    leads,
    isAdvancedNavExpanded,
    toggleAdvancedNav,
  } = useAppStore();

  const currentWorkspace = workspaces.find((w) => w.id === activeWorkspaceId) || workspaces[0];

  const primaryNavItems: { id: ModuleId; label: string; icon: React.ReactNode; badgeCount?: number }[] = [
    {
      id: 'overview',
      label: 'Dashboard',
      icon: <LayoutDashboard className="w-4 h-4" />,
    },
    {
      id: 'leads',
      label: 'Leads',
      icon: <Users className="w-4 h-4" />,
      badgeCount: leads.filter((l) => l.workspaceId === activeWorkspaceId && l.status === 'New').length,
    },
    {
      id: 'rules',
      label: 'Qualification Rules',
      icon: <Sliders className="w-4 h-4" />,
    },
    {
      id: 'workflow',
      label: 'Workflow',
      icon: <GitFork className="w-4 h-4" />,
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings className="w-4 h-4" />,
    },
  ];

  const advancedNavItems: { id: ModuleId; label: string; icon: React.ReactNode }[] = [
    { id: 'advanced', label: 'Company Enrichment', icon: <Building2 className="w-4 h-4" /> },
    { id: 'advanced', label: 'Opportunity Scoring', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'advanced', label: 'Outreach Studio', icon: <Send className="w-4 h-4" /> },
    { id: 'advanced', label: 'Revenue Prediction', icon: <PieChart className="w-4 h-4" /> },
    { id: 'advanced', label: 'Executed Logs', icon: <Zap className="w-4 h-4" /> },
  ];

  return (
    <aside className="fixed top-0 left-0 z-40 h-screen w-64 bg-white border-r border-slate-200 flex flex-col select-none">
      {/* App Branding */}
      <div className="h-16 border-b border-slate-200 flex items-center justify-between px-4 shrink-0 bg-white">
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => setActiveModule('overview')}
        >
          <div className="w-9 h-9 rounded-xl bg-cyan-600 flex items-center justify-center text-white shadow-sm group-hover:bg-cyan-700 transition-colors">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-slate-900 text-sm tracking-tight leading-none flex items-center gap-1.5">
              AURA
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-50 text-cyan-700 font-semibold border border-cyan-200">
                PRO
              </span>
            </span>
            <span className="text-[10px] text-slate-500 font-medium tracking-wide mt-0.5">
              LEAD INTELLIGENCE
            </span>
          </div>
        </div>
      </div>

      {/* Active Workspace Banner in Sidebar */}
      <div className="p-3 bg-slate-50 border-b border-slate-200">
        <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1 px-1">
          Active Workspace
        </div>
        <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200 shadow-2xs">
          <div className="truncate">
            <div className="text-xs font-bold text-slate-900 truncate">
              {currentWorkspace.name}
            </div>
            <div className="text-[11px] text-slate-500 truncate">
              {currentWorkspace.subtitle}
            </div>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" title="Workspace Active" />
        </div>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        <div>
          <div className="px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Main Menu
          </div>
          <nav className="space-y-1">
            {primaryNavItems.map((item) => {
              const isActive = activeModule === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveModule(item.id)}
                  className={cn(
                    'w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer',
                    isActive
                      ? 'bg-cyan-50 text-cyan-800 border border-cyan-200 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className={cn(isActive ? 'text-cyan-600' : 'text-slate-400')}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>

                  {item.badgeCount !== undefined && item.badgeCount > 0 && (
                    <span
                      className={cn(
                        'px-2 py-0.5 rounded-full text-[10px] font-mono font-bold',
                        isActive
                          ? 'bg-cyan-600 text-white'
                          : 'bg-rose-100 text-rose-700 border border-rose-200'
                      )}
                    >
                      {item.badgeCount}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Collapsible Advanced Section */}
        <div className="pt-2 border-t border-slate-100">
          <button
            onClick={toggleAdvancedNav}
            className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
          >
            <span className="uppercase tracking-wider text-[11px]">Advanced Modules</span>
            <ChevronRight
              className={cn(
                'w-3.5 h-3.5 transition-transform duration-200',
                isAdvancedNavExpanded && 'rotate-90'
              )}
            />
          </button>

          {isAdvancedNavExpanded && (
            <div className="mt-1 space-y-1 pl-2">
              {advancedNavItems.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveModule('advanced')}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-xs text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors text-left"
                >
                  <span className="text-slate-400">{item.icon}</span>
                  <span className="truncate">{item.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer Info */}
      <div className="p-3 border-t border-slate-200 bg-slate-50 shrink-0">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-medium text-slate-700">AI Engine Ready</span>
          </span>
          <span className="font-mono text-[10px] text-slate-400">n8n Connected</span>
        </div>
      </div>
    </aside>
  );
};
