import { Box, Button, FormControl, FormHelperText, FormLabel, HStack, Input, Link, Select, Textarea, VStack } from "@chakra-ui/react";
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

  const getAvailableParams = (currentParam?: string) => {
    return customParams.filter(
      param => currentParam === param.name || !fields.some(field => field.key === param.name)
    );
  };

  return (
    <FormControl>
      <FormLabel>HTTP Custom設定</FormLabel>
      <FormHelperText mb={4}>
        詳細なパラメータについては
        <Link
          href="https://github.com/telefonicaid/fiware-orion/blob/master/doc/manuals.jp/orion-api.md#subscriptionnotificationhttpcustom"
          color="teal.500"
          isExternal
          ml={1}
        >
          Orion APIドキュメント
        </Link>
        を参照してください。
      </FormHelperText>
      <VStack spacing={4} align="stretch">
        {fields.map((field, index) => {
          const param = customParams.find(p => p.name === field.key);
          const availableParams = getAvailableParams(field.key);

          if (!param) return null;

          return (
            <Box key={field.id}>
              <HStack spacing={2} align="flex-start">
                <FormControl flex={1}>
                  <FormLabel fontSize="sm">パラメータ</FormLabel>
                  <Controller
                    control={control}
                    name={`httpCustomFields.${index}.key`}
                    render={({ field: { onChange, value } }) => (
                      <Select value={value} onChange={onChange}>
                        {availableParams.map(p => (
                          <option key={p.name} value={p.name}>
                            {p.name}
                          </option>
                        ))}
                      </Select>
                    )}
                  />
                  <FormHelperText>{param.description}</FormHelperText>
                </FormControl>
                <FormControl flex={2}>
                  <FormLabel fontSize="sm">値</FormLabel>
                  <Controller
                    control={control}
                    name={`httpCustomFields.${index}.value`}
                    render={({ field: { onChange, value } }) => (
                      param.type === "object" ? (
                        <Textarea
                          value={value}
                          onChange={onChange}
                          placeholder={param.placeholder}
                          minHeight="100px"
                          fontFamily="monospace"
                        />
                      ) : (
                        <Input
                          value={value}
                          onChange={onChange}
                          placeholder={param.placeholder}
                        />
                      )
                    )}
                  />
                </FormControl>
                <Button
                  onClick={() => remove(index)}
                  size="sm"
                  colorScheme="red"
                  mt={8}
                >
                  削除
                </Button>
              </HStack>
            </Box>
          );
        })}
        {customParams.length > fields.length && (
          <Button
            onClick={() => {
              const availableParams = getAvailableParams();
              if (availableParams.length > 0) {
                append({ key: availableParams[0].name, value: "" });
              }
            }}
            size="sm"
            width="fit-content"
          >
            + パラメータを追加
          </Button>
        )}
      </VStack>
    </FormControl>
  );
}
