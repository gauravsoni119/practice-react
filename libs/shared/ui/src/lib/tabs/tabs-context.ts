import { createContext, useContext } from 'react';

export const TabsContext = createContext<null | {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  tabs: unknown[];
  setTabs: React.Dispatch<React.SetStateAction<unknown[]>>;
}>(null);

export const TabPanelContext = createContext<null | string>(null);

export function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs context must be used with <Tabs />');
  }
  return context;
}

export function useTabPanelContext() {
  const context = useContext(TabPanelContext);
  if (!context) {
    throw new Error('TabPanel context must be used with <TabPanel />');
  }
  return context;
}
