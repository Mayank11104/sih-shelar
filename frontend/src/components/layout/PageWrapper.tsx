import type { ReactNode } from 'react';
import BottomNav, { Sidebar } from './BottomNav';

interface PageWrapperProps {
  children: ReactNode;
  hideNav?: boolean;
}

export default function PageWrapper({ children, hideNav = false }: PageWrapperProps) {
  return (
    <div className="app-shell">
      {!hideNav && <Sidebar />}
      <div className="main-area">
        {children}
      </div>
      {!hideNav && <BottomNav />}
    </div>
  );
}
