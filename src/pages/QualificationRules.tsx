import React, { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { Sliders, Save, CheckCircle, RotateCcw, AlertCircle, Plus, Trash2, Sparkles } from 'lucide-react';

export const QualificationRules: React.FC = () => {
  const { workspaces, activeWorkspaceId, updateWorkspaceRules } = useAppStore();

  const currentWorkspace = workspaces.find((w) => w.id === activeWorkspaceId) || workspaces[0];

  const [name, setName] = useState(currentWorkspace.name);
  const [subtitle, setSubtitle] = useState(currentWorkspace.subtitle);
  const [industry, setIndustry] = useState(currentWorkspace.industry);
  const [products, setProducts] = useState<string[]>(currentWorkspace.products);
  const [newProduct, setNewProduct] = useState('');

  const [importantSignals, setImportantSignals] = useState<string[]>(currentWorkspace.importantSignals);
  const [newSignal, setNewSignal] = useState('');

  const [highValueCriteria, setHighValueCriteria] = useState<string[]>(currentWorkspace.highValueCriteria);
  const [newHighValue, setNewHighValue] = useState('');

  const [urgencyCriteria, setUrgencyCriteria] = useState<string[]>(currentWorkspace.urgencyCriteria);
  const [newUrgency, setNewUrgency] = useState('');

  const [budgetCriteria, setBudgetCriteria] = useState(currentWorkspace.budgetCriteria);

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleAddProduct = () => {
    if (newProduct.trim()) {
      setProducts([...products, newProduct.trim()]);
      setNewProduct('');
    }
  };

  const handleRemoveProduct = (index: number) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  const handleAddSignal = () => {
    if (newSignal.trim()) {
      setImportantSignals([...importantSignals, newSignal.trim()]);
      setNewSignal('');
    }
  };

  const handleRemoveSignal = (index: number) => {
    setImportantSignals(importantSignals.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    updateWorkspaceRules(currentWorkspace.id, {
      name,
      subtitle,
      industry,
      products,
      importantSignals,
      highValueCriteria,
      urgencyCriteria,
      budgetCriteria,
    });

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleResetToDefault = () => {
    setName('MSR-SOLUTIONS');
    setSubtitle('Environmental & Energy Solutions');
    setIndustry('Renewable Energy & CleanTech');
    setProducts(['Residential Solar', 'Commercial Solar', 'Industrial Solar', 'Environmental Solutions']);
    setImportantSignals([
      'Commercial project requirement',
      'Industrial facility footprint',
      'High monthly energy consumption (> R50k/mo)',
      'Urgent installation timeline (< 60 days)',
      'Pre-approved capital budget',
      'Decision-maker identified'
    ]);
    setHighValueCriteria([
      'Commercial or Industrial solar system (> 100kW)',
      'Budget exceeds R1,500,000',
      'Multi-site rollout potential'
    ]);
    setUrgencyCriteria([
      'Immediate deployment window required',
      'Active grid outage / load-shedding mitigation need'
    ]);
    setBudgetCriteria('R250,000 - R5,000,000+ per project');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Banner Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900">Qualification Rules Engine</h2>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-semibold">
              Workspace: {currentWorkspace.name}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Configure target criteria, high-value signals, and scoring rules passed to the n8n AI workflow.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleResetToDefault}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Defaults
          </button>

          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs shadow-2xs transition-colors cursor-pointer"
          >
            <Save className="w-4 h-4" />
            Save Rules Configuration
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-3 text-emerald-800 text-xs font-semibold">
          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>Rules updated successfully! The n8n AI Workflow will now use these parameters for upcoming incoming lead submissions.</span>
        </div>
      )}

      {/* Configuration Form Card 1: Business Profile & Offerings */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-5">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-3 border-b border-slate-200 flex items-center gap-2">
          <Sliders className="w-4 h-4 text-cyan-600" />
          Business Profile &amp; Offerings
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Business / Organization Name:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Tagline / Subtitle:
            </label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Industry Domain:
            </label>
            <input
              type="text"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white"
            />
          </div>
        </div>

        {/* Products / Services List */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-2">
            Products &amp; Services Offered:
          </label>
          <div className="flex flex-wrap gap-2 mb-3">
            {products.map((prod, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold"
              >
                {prod}
                <button
                  type="button"
                  onClick={() => handleRemoveProduct(idx)}
                  className="text-slate-400 hover:text-rose-600 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 max-w-md">
            <input
              type="text"
              placeholder="Add product/service (e.g., Industrial Solar)"
              value={newProduct}
              onChange={(e) => setNewProduct(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddProduct()}
              className="flex-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white"
            />
            <button
              type="button"
              onClick={handleAddProduct}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-900 text-white font-semibold text-xs transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Configuration Form Card 2: Qualification Criteria & Signals */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-5">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-3 border-b border-slate-200 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-600" />
          Lead Qualification Signals &amp; Scoring Criteria
        </h3>

        {/* Important Lead Signals */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Important Lead Signals (Boosts Score):
          </label>
          <p className="text-[11px] text-slate-500 mb-3">
            Signals detected from website submission form responses.
          </p>

          <div className="space-y-2 mb-3">
            {importantSignals.map((sig, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800"
              >
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-600" />
                  {sig}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveSignal(idx)}
                  className="text-slate-400 hover:text-rose-600 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 max-w-lg">
            <input
              type="text"
              placeholder="Add key signal (e.g., Roof area > 5000m²)"
              value={newSignal}
              onChange={(e) => setNewSignal(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddSignal()}
              className="flex-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white"
            />
            <button
              type="button"
              onClick={handleAddSignal}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-900 text-white font-semibold text-xs transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Signal
            </button>
          </div>
        </div>

        {/* High Value & Budget Threshold */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Budget / Deal Value Criteria:
            </label>
            <input
              type="text"
              value={budgetCriteria}
              onChange={(e) => setBudgetCriteria(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Target HOT Threshold:
            </label>
            <div className="px-3 py-2 text-xs bg-slate-100 border border-slate-200 rounded-lg font-mono text-slate-800 font-bold">
              Score &ge; 85/100 (Instant High Priority Alert)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
