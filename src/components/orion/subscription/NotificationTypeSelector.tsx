import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { ReactNode } from "react";

type NotificationOption = {
  label: string;
  content: ReactNode;
};

type Props = {
  options: NotificationOption[];
  defaultIndex?: number;
};

export default function NotificationTypeSelector({ options, defaultIndex = 0 }: Props) {
  return (
    <Tabs defaultIndex={defaultIndex}>
      <TabList>
        {options.map((option, index) => (
          <Tab key={index}>{option.label}</Tab>
        ))}
      </TabList>
      <TabPanels>
        {options.map((option, index) => (
          <TabPanel key={index}>{option.content}</TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
}
