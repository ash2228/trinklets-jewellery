'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Loading from '@/components/Loading';

interface NavLoadingContextType {
  isNavigating: boolean;
  setNavigating: (v: boolean) => void;
}

const NavLoadingContext = createContext<NavLoadingContextType | undefined>(undefined);

export function NavigationLoadingProvider({ children }: { children: React.ReactNode }) {
  const [isNavigating, setIsNavigating] = useState(false);
  const pathname = usePathname();

  // Clear navigating when the path changes (navigation completed)
  useEffect(() => {
    if (isNavigating) setIsNavigating(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Fallback: auto-clear navigating after a max duration
  useEffect(() => {
    if (!isNavigating) return;
    const t = setTimeout(() => setIsNavigating(false), 15000);
    return () => clearTimeout(t);
  }, [isNavigating]);

  return (
    <NavLoadingContext.Provider value={{ isNavigating, setNavigating: setIsNavigating }}>
      {children}
      {isNavigating && <Loading />}
    </NavLoadingContext.Provider>
  );
}

export function useNavigationLoading() {
  const ctx = useContext(NavLoadingContext);
  if (!ctx) throw new Error('useNavigationLoading must be used within NavigationLoadingProvider');
  return ctx;
}
