import type { ReactNode } from 'react';
import BottomNav from './BottomNav';

interface PageWrapperProps {
  children: ReactNode;
  /** If true, hides the bottom nav (used for welcome/full-screen pages) */
  hideNav?: boolean;
}

export default function PageWrapper({ children, hideNav = false }: PageWrapperProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh', backgroundColor: 'var(--color-bg)' }}>
      <main className="page-content">
        {children}
      </main>
      {!hideNav && <BottomNav />}
    </div>
  );
}
