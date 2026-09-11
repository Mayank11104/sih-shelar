import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Notification } from '../types';
import { NOTIFICATIONS } from '../mockData/data';

const LS_NOTIF_KEY = 'agriverse_notifications_read';

interface NotifContextValue {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
}

const NotifContext = createContext<NotifContextValue | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const readIds: string[] = JSON.parse(localStorage.getItem(LS_NOTIF_KEY) ?? '[]');
    return NOTIFICATIONS.map((n) => ({ ...n, read: readIds.includes(n.id) }));
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const readIds = notifications.filter((n) => n.read).map((n) => n.id);
    localStorage.setItem(LS_NOTIF_KEY, JSON.stringify(readIds));
  }, [notifications]);

  const markAsRead = (id: string) =>
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));

  const markAllAsRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  return (
    <NotifContext.Provider value={{ notifications, unreadCount, markAsRead, markAllAsRead }}>
      {children}
    </NotifContext.Provider>
  );
}

export function useNotifications(): NotifContextValue {
  const ctx = useContext(NotifContext);
  if (!ctx) throw new Error('useNotifications must be used inside <NotificationProvider>');
  return ctx;
}
