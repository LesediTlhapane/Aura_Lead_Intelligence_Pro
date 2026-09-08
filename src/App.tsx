import React from 'react';
import { useAppStore } from './store/useAppStore';
import { DashboardShell } from './components/layout/DashboardShell';
import { DashboardOverview } from './pages/DashboardOverview';
import { LeadsQualification } from './pages/LeadsQualification';
import { QualificationRules } from './pages/QualificationRules';
import { WorkflowView } from './pages/WorkflowView';
import { SettingsIntegrations } from './pages/SettingsIntegrations';
import { AdvancedView } from './pages/AdvancedView';
import { NotFound } from './pages/NotFound';

export default function App() {
  const { activeModule } = useAppStore();

  const renderModule = () => {
    switch (activeModule) {
      case 'overview':
        return <DashboardOverview />;
      case 'leads':
        return <LeadsQualification />;
      case 'rules':
        return <QualificationRules />;
      case 'workflow':
        return <WorkflowView />;
      case 'settings':
        return <SettingsIntegrations />;
      case 'advanced':
        return <AdvancedView />;
      default:
        return <DashboardOverview />;
    }
  };

  return <DashboardShell>{renderModule()}</DashboardShell>;
}
