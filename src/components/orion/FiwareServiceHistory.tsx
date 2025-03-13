import {
  Box,
  Select,
  Text,
  VStack,
  HStack,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiTrash2 } from "react-icons/fi";
import { useFiwareServiceHistory } from "@/hooks/useFiwareServiceHistory";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface Props {
  onSelect: (service: string) => void;
}

export default function FiwareServiceHistory({ onSelect }: Props) {
  const { history, removeHistory } = useFiwareServiceHistory();
  const [currentService] = useLocalStorage<string | undefined>("fiware-service", undefined);
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const hoverBg = useColorModeValue("gray.50", "gray.700");

  // 現在の設定値を含めたオプションを作成
  const options = [
    // 現在の設定値（履歴にない場合）
    ...(currentService !== undefined && !history.some(h => h.service === currentService)
      ? [{ service: currentService, lastUsed: Date.now() }]
      : []),
    // 履歴の値
    ...history
  ];

  return (
    <VStack spacing={2} align="stretch">
      <Text fontSize="sm" fontWeight="medium" color="gray.600">
        テナント選択
      </Text>
      <Box position="relative">
        <Select
          size="sm"
          value={currentService ?? ""}
          onChange={(e) => onSelect(e.target.value)}
          borderColor={borderColor}
          placeholder="テナントを選択"
        >
          <option value="">設定なし</option>
          {options.map((item) => (
            item.service && (
              <option key={item.service} value={item.service}>
                {item.service}
              </option>
            )
          ))}
        </Select>
      </Box>
      {options.length > 0 && (
        <Box maxH="200px" overflowY="auto">
          <VStack spacing={1} align="stretch">
            {options.map((item) => (
              <HStack
                key={item.service}
                justify="space-between"
                fontSize="xs"
                color="gray.500"
                px={2}
                py={1}
                _hover={{ bg: hoverBg }}
              >
                <Text isTruncated>{item.service || '(設定なし)'}</Text>
                <IconButton
                  aria-label="履歴を削除"
                  icon={<FiTrash2 />}
                  size="xs"
                  variant="ghost"
                  onClick={() => removeHistory(item.service)}
                />
              </HStack>
            ))}
          </VStack>
        </Box>
      )}
    </VStack>
  );
}
