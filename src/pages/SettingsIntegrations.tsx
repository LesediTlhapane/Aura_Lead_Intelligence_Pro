import React, { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import {
  Building2,
  Sliders,
  Bell,
  Webhook,
  Key,
  Save,
  CheckCircle2,
  Copy,
  ExternalLink,
} from 'lucide-react';

export const SettingsIntegrations: React.FC = () => {
  const { workspaces, activeWorkspaceId, updateWorkspaceRules } = useAppStore();

  const currentWorkspace = workspaces.find((w) => w.id === activeWorkspaceId) || workspaces[0];

  const [activeTab, setActiveTab] = useState<'profile' | 'qualification' | 'notifications' | 'integrations'>('profile');

  // Local Form States
  const [name, setName] = useState(currentWorkspace.name);
  const [subtitle, setSubtitle] = useState(currentWorkspace.subtitle);
  const [industry, setIndustry] = useState(currentWorkspace.industry);
  const [notificationEmail, setNotificationEmail] = useState(currentWorkspace.notificationEmail);
  const [slackWebhook, setSlackWebhook] = useState(currentWorkspace.slackWebhook);
  const [n8nWebhookUrl, setN8nWebhookUrl] = useState(currentWorkspace.n8nWebhookUrl);
  const [apiKey] = useState(currentWorkspace.apiKey);

  const [copiedKey, setCopiedKey] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleCopyKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleSaveSettings = () => {
    updateWorkspaceRules(currentWorkspace.id, {
      name,
      subtitle,
      industry,
      notificationEmail,
      slackWebhook,
      n8nWebhookUrl,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900">Settings &amp; Integrations</h2>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-semibold">
              Workspace: {currentWorkspace.name}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Manage business profile settings, notification channels, and n8n webhook API keys.
          </p>
        </div>

        <button
          onClick={handleSaveSettings}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs shadow-2xs transition-colors cursor-pointer self-start md:self-auto"
        >
          <Save className="w-4 h-4" />
          Save Settings
        </button>
      </div>

      {savedSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-3 text-emerald-800 text-xs font-semibold">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>Workspace settings saved successfully!</span>
        </div>
      )}

      {/* Tabs Navigation */}
      <div className="flex border-b border-slate-200 bg-white rounded-t-xl px-4 pt-3 gap-2">
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
            activeTab === 'profile'
              ? 'border-cyan-600 text-cyan-800'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Building2 className="w-4 h-4" />
          Business Profile
        </button>

        <button
          onClick={() => setActiveTab('qualification')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
            activeTab === 'qualification'
              ? 'border-cyan-600 text-cyan-800'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Sliders className="w-4 h-4" />
          Qualification Settings
        </button>

        <button
          onClick={() => setActiveTab('notifications')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
            activeTab === 'notifications'
              ? 'border-cyan-600 text-cyan-800'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Bell className="w-4 h-4" />
          Notification Settings
        </button>

        <button
          onClick={() => setActiveTab('integrations')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
            activeTab === 'integrations'
              ? 'border-cyan-600 text-cyan-800'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Webhook className="w-4 h-4" />
          Integration Settings
        </button>
      </div>

      {/* Tab Panels */}
      <div className="bg-white rounded-b-xl border-x border-b border-slate-200 p-6 shadow-2xs space-y-6">
        {/* Tab 1: Business Profile */}
        {activeTab === 'profile' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
              Business Profile Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Organization Name:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Company Subtitle / Sector:</label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block font-semibold text-slate-700 mb-1">Industry Sector:</label>
                <input
                  type="text"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Qualification Settings */}
        {activeTab === 'qualification' && (
          <div className="space-y-4 text-xs">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
              Qualification Rules Thresholds
            </h3>

            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-800">HOT Lead Threshold:</span>
                <span className="font-mono font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                  Score &ge; 85 / 100
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-800">WARM Lead Threshold:</span>
                <span className="font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  Score 60 - 84 / 100
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-800">COLD Lead Threshold:</span>
                <span className="font-mono font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                  Score &lt; 60 / 100
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Notification Settings */}
        {activeTab === 'notifications' && (
          <div className="space-y-4 text-xs">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
              Business Notification Channels
            </h3>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Notification Recipient Email:
              </label>
              <input
                type="email"
                value={notificationEmail}
                onChange={(e) => setNotificationEmail(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Slack Channel Webhook URL:
              </label>
              <input
                type="text"
                value={slackWebhook}
                onChange={(e) => setSlackWebhook(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono focus:bg-white"
              />
            </div>
          </div>
        )}

        {/* Tab 4: Integration Settings */}
        {activeTab === 'integrations' && (
          <div className="space-y-4 text-xs">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
              n8n Webhook &amp; API Integration
            </h3>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                n8n Webhook Ingestion URL:
              </label>
              <input
                type="text"
                value={n8nWebhookUrl}
                onChange={(e) => setN8nWebhookUrl(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono focus:bg-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Aura API Key:
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={apiKey}
                  className="flex-1 px-3 py-2 bg-slate-100 border border-slate-200 rounded-lg text-slate-700 font-mono"
                />
                <button
                  type="button"
                  onClick={handleCopyKey}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Copy className="w-4 h-4" />
                  {copiedKey ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
