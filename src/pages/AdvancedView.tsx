import React from 'react';
import { useAppStore } from '../store/useAppStore';
import { Layers, ArrowLeft, TrendingUp, Send, PieChart, Building2, Zap } from 'lucide-react';

// Keep this component type-safe in installations that do not include React's
// ambient JSX declarations.
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elementName: string]: any;
    }
  }
}

export const AdvancedView: React.FC = () => {
  const { setActiveModule } = useAppStore();

  const advancedModules = [
    {
      title: 'Company Enrichment',
      description: 'Firmographic data, tech stack, and employee size verification.',
      icon: <Building2 className="w-6 h-6 text-cyan-600" />,
    },
    {
      title: 'Opportunity Scoring',
      description: 'Deal velocity, win probability, and engagement scoring models.',
      icon: <TrendingUp className="w-6 h-6 text-purple-600" />,
    },
    {
      title: 'Outreach Studio',
      description: 'AI-generated personalized email sequences and cadences.',
      icon: <Send className="w-6 h-6 text-amber-600" />,
    },
    {
      title: 'Revenue Prediction',
      description: 'Pipeline forecasting, ARR impact models, and closing timelines.',
      icon: <PieChart className="w-6 h-6 text-emerald-600" />,
    },
    {
      title: 'Executed Workflow Logs',
      description: 'Full audit history of n8n webhooks and AI actions executed.',
      icon: <Zap className="w-6 h-6 text-sky-600" />,
    },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Advanced Intelligence Modules</h2>
          <p className="text-xs text-slate-500 mt-1">
            Secondary intelligence modules kept accessible without cluttering your core lead qualification workflow.
          </p>
        </div>

        <button
          onClick={() => setActiveModule('overview')}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {advancedModules.map((mod, idx) => (
          <div key={idx} className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center">
              {mod.icon}
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">{mod.title}</h3>
              <p className="text-xs text-slate-500 mt-0.5">{mod.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
