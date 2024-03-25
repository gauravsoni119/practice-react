import { useEffect } from 'react';
import { useTabsContext } from './tabs-context';

export interface TabPanelProps {
  children: React.ReactNode;
  value: string;
  defaultTab?: boolean;
}

export function TabPanel({ children, value, defaultTab }: TabPanelProps) {
  const { activeTab, setActiveTab } = useTabsContext();
  useEffect(() => {
    if (defaultTab) {
      setActiveTab(value);
    }
  }, [setActiveTab, defaultTab, value]);
  return (
    <div className="bg-slate-400" hidden={activeTab !== value}>
      {children}
    </div>
  );
}

export default TabPanel;
