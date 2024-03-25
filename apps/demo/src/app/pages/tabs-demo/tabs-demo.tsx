import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@practice-react/ui';

export function TabsDemo() {
  return (
    <Tabs>
      <TabList>
        <Tab value="person">Person</Tab>
        <Tab value="address">Address</Tab>
      </TabList>
      <TabPanels>
        <TabPanel value="person" defaultTab>
          Some content for person
        </TabPanel>
        <TabPanel value="address">Some content for Address</TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default TabsDemo;
