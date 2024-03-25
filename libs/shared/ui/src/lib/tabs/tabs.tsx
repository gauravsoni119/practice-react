import React, { useState } from 'react';
import { TabsContext } from './tabs-context';

/**
 * Build a component Tabs that displays a list of tabs for either viewing information about a person or viewing information about an address.
 * You should make the tab functional so that when the tab Person is active then return the PersonContainer with all its children. Implement the same logic for the Address tab.
 * We have already written some starting code along with styles for you. Your code should work as shown in the below GIF.
 */

export interface TabsProps {
  children: React.ReactNode;
}

export function Tabs({ children }: TabsProps) {
  const [activeTab, setActiveTab] = useState('');
  const [tabs, setTabs] = useState<unknown[]>([]);
  return (
    <TabsContext.Provider value={{ activeTab, tabs, setActiveTab, setTabs }}>
      <div>{children}</div>
    </TabsContext.Provider>
  );
}

export default Tabs;
