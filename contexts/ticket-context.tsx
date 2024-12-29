'use client'

import React, { createContext, useContext, useState } from 'react';

type TicketFilterType = 'all' | 'open' | 'unassigned' | 'assigned';

interface TicketContextType {
  filterType: TicketFilterType;
  setFilterType: (type: TicketFilterType) => void;
}

const TicketContext = createContext<TicketContextType | null>(null);

export function TicketProvider({ children }: { children: React.ReactNode }) {
  const [filterType, setFilterType] = useState<TicketFilterType>('all');

  return (
    <TicketContext.Provider value={{ filterType, setFilterType }}>
      {children}
    </TicketContext.Provider>
  );
}

export function useTicketContext() {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error('useTicketContext must be used within a TicketProvider');
  }
  return context;
}
