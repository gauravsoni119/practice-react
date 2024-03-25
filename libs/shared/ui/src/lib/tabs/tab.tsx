import React, { useId } from 'react';
import { useTabsContext } from './tabs-context';

export interface TabProps {
  children: React.ReactNode;
  value: string;
}

export function Tab({ children, value }: TabProps) {
  const { setActiveTab, tabs } = useTabsContext();
  const id = useId();
  return (
    <button
      id={id}
      onClick={() => setActiveTab(value)}
      className="px-2 py-1 border-red-500 border-2"
    >
      {children}
    </button>
  );
}

export default Tab;
