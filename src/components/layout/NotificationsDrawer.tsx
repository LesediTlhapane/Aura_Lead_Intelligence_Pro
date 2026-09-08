import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { Bell, Flame, CheckCircle, Info } from 'lucide-react';

export const NotificationsDrawer: React.FC = () => {
  const { notifications, markNotificationRead } = useAppStore();

  return (
    <div className="hidden">
      {notifications.map((n) => (
        <div key={n.id} onClick={() => markNotificationRead(n.id)}>
          {n.title}
        </div>
      ))}
    </div>
  );
};
