import React from 'react';

export interface StatusIndicatorProps {
  status?: string;
  pendingCount?: number;
  size?: 'sm' | 'md' | 'lg';
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = () => {
  return null;
};
