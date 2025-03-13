import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  List,
  ListItem,
  Text,
  IconButton,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiClock, FiX } from "react-icons/fi";
import { useFiwareServiceHistory } from "@/hooks/useFiwareServiceHistory";

interface Props {
  onSelect: (service: string) => void;
}

export default function FiwareServiceHistory({ onSelect }: Props) {
  const { history, removeHistory, isOpen, toggleOpen } = useFiwareServiceHistory();
  const hoverBg = useColorModeValue("gray.100", "gray.700");

  if (history.length === 0) {
    return null;
  }

  return (
    <Accordion
      allowToggle
      defaultIndex={isOpen ? [0] : []}
      onChange={() => toggleOpen()}
    >
      <AccordionItem border="none">
        <AccordionButton
          display="flex"
          alignItems="center"
          py={2}
          _hover={{
            bg: hoverBg,
          }}
        >
          <Box flex="1" textAlign="left">
            <HStack spacing={2}>
              <FiClock />
              <Text>マルチテナント履歴</Text>
            </HStack>
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pb={4} px={2}>
          <List spacing={2}>
            {history.map((item) => (
              <ListItem
                key={item.service}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                p={2}
                cursor="pointer"
                _hover={{
                  bg: hoverBg,
                }}
                onClick={() => onSelect(item.service)}
              >
                <Text fontSize="sm" isTruncated maxW="80%">
                  {item.service}
                </Text>
                <IconButton
                  aria-label="履歴を削除"
                  icon={<FiX />}
                  size="sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeHistory(item.service);
                  }}
                />
              </ListItem>
            ))}
          </List>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
