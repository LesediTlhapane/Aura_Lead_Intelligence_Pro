import React from 'react';
import { useAppStore } from '../store/useAppStore';

export const ActionRecommendations: React.FC = () => {
  const { setActiveModule } = useAppStore();
  return (
    <div className="p-6 bg-white border border-slate-200 rounded-xl">
      <h2 className="text-lg font-bold text-slate-900">Action Recommendations</h2>
      <p className="text-xs text-slate-500 mt-1">Advanced Module</p>
      <button onClick={() => setActiveModule('overview')} className="mt-4 px-3 py-1.5 bg-slate-100 text-xs font-semibold rounded">Back</button>
    </div>
  );
};
