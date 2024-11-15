'use client';
import { RootStore } from '@/app/store/rootStore';
import React, { createContext, ReactNode } from 'react';

export const StoreContext = createContext(RootStore);

export const StoreWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <StoreContext.Provider value={RootStore}>{children}</StoreContext.Provider>
  );
};
