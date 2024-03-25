export interface TabPanelsProps {
  children: React.ReactNode;
}

export function TabPanels({ children }: TabPanelsProps) {
  return <div>{children}</div>;
}

export default TabPanels;
