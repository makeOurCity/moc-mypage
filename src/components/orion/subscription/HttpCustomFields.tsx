import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  Link,
  Select,
  Textarea,
  Text,
  VStack,
  Tooltip,
  IconButton
} from "@chakra-ui/react";
import { DeleteIcon, InfoIcon } from "@chakra-ui/icons";
import { Control, Controller, useFieldArray } from "react-hook-form";
import { SubscriptionFormData } from "./SubscriptionForm";

type Props = {
  control: Control<SubscriptionFormData>;
};

type HttpCustomParam = {
  name: string;
  type: "string" | "object";
  description: string;
  placeholder?: string;
};

const customParams: HttpCustomParam[] = [
  {
    name: "method",
    type: "string",
    description: "HTTP メソッド",
    placeholder: "POST"
  },
  {
    name: "payload",
    type: "object",
    description: "リクエストボディ",
    placeholder: `{
  "key": "value"
}`
  },
  {
    name: "json",
    type: "object",
    description: "JSON形式のリクエストボディ",
    placeholder: `{
  "data": {
    "key": "value"
  }
}`
  },
  {
    name: "qs",
    type: "object",
    description: "クエリパラメータ",
    placeholder: `{
  "param1": "value1",
  "param2": "value2"
}`
  },
  {
    name: "headers",
    type: "object",
    description: "HTTPヘッダー",
    placeholder: `{
  "Content-Type": "application/json",
  "Authorization": "Bearer token"
}`
  },
  {
    name: "timeout",
    type: "string",
    description: "タイムアウト時間（ミリ秒）",
    placeholder: "5000"
  },
];

export default function HttpCustomFields({ control }: Props) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "httpCustomFields",
  });

  const availableParams = customParams.filter(
    param => !fields.some(field => field.key === param.name)
  );

  return (
    <Box>
      <FormControl>
        <HStack mb={4} align="center">
          <FormLabel mb={0}>HTTP Custom設定</FormLabel>
          <Tooltip label="詳細なパラメータについてはOrion APIドキュメントを参照してください">
            <Link
              href="https://github.com/telefonicaid/fiware-orion/blob/master/doc/manuals.jp/orion-api.md#subscriptionnotificationhttpcustom"
              color="teal.500"
              isExternal
            >
              <InfoIcon />
            </Link>
          </Tooltip>
        </HStack>

        {/* 既存のパラメータ */}
        <VStack spacing={3} align="stretch" mb={4}>
          {fields.map((field, index) => {
            const param = customParams.find(p => p.name === field.key);
            if (!param) return null;

            return (
              <Box
                key={field.id}
                p={3}
                borderWidth="1px"
                borderRadius="md"
                position="relative"
              >
                <HStack spacing={4} align="flex-start">
                  <Box flex={1}>
                    <HStack mb={1}>
                      <Text fontWeight="medium">{param.name}</Text>
                      <Tooltip label={param.description}>
                        <InfoIcon color="gray.500" />
                      </Tooltip>
                    </HStack>
                    <Controller
                      control={control}
                      name={`httpCustomFields.${index}.value`}
                      render={({ field: { onChange, value } }) => (
                        param.type === "object" ? (
                          <Textarea
                            value={value}
                            onChange={onChange}
                            placeholder={param.placeholder}
                            size="sm"
                            minHeight="80px"
                            fontFamily="monospace"
                          />
                        ) : (
                          <Input
                            value={value}
                            onChange={onChange}
                            placeholder={param.placeholder}
                            size="sm"
                          />
                        )
                      )}
                    />
                  </Box>
                  <IconButton
                    icon={<DeleteIcon />}
                    onClick={() => remove(index)}
                    aria-label="パラメータを削除"
                    size="sm"
                    colorScheme="red"
                    variant="ghost"
                    position="absolute"
                    top={2}
                    right={2}
                  />
                </HStack>
              </Box>
            );
          })}
        </VStack>

        {/* パラメータ追加セクション */}
        {availableParams.length > 0 && (
          <Box mt={4}>
            <Select
              placeholder="パラメータを追加"
              onChange={(e) => {
                if (e.target.value) {
                  append({ key: e.target.value, value: "" });
                  e.target.value = "";
                }
              }}
              size="sm"
              mb={2}
            >
              {availableParams.map(param => (
                <option key={param.name} value={param.name}>
                  {param.name}
                </option>
              ))}
            </Select>

            <Box mt={4} p={4} bg="gray.50" borderRadius="md">
              <Text fontWeight="bold" mb={3}>利用可能なパラメータ</Text>
              <VStack align="stretch" spacing={3}>
                {availableParams.map(param => (
                  <Box key={param.name} p={3} bg="white" borderRadius="md" shadow="sm">
                    <Text fontWeight="bold" color="teal.600">{param.name}</Text>
                    <Text fontSize="sm" color="gray.600" mt={1}>
                      {param.description}
                    </Text>
                    {param.placeholder && (
                      <Text fontSize="xs" fontFamily="monospace" mt={2} color="gray.500">
                        例: {param.placeholder}
                      </Text>
                    )}
                  </Box>
                ))}
              </VStack>
            </Box>
          </Box>
        )}
      </FormControl>
    </Box>
  );
}
