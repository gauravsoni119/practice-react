import React from 'react';

export interface TabListProps {
  children: React.ReactNode;
}

export function TabList({ children }: TabListProps) {
  return <div className="flex gap-1">{children}</div>;
}

export default TabList;
