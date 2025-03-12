import { Box, Button, FormControl, FormHelperText, FormLabel, HStack, Link, Select, Textarea, VStack } from "@chakra-ui/react";
import { Control, Controller, useFieldArray } from "react-hook-form";
import { SubscriptionFormData } from "./SubscriptionForm";

type Props = {
  control: Control<SubscriptionFormData>;
};

type HttpCustomParam = {
  name: string;
  type: "string" | "object";
  description: string;
};

const customParams: HttpCustomParam[] = [
  { name: "method", type: "string", description: "HTTP メソッド (GET, POST, etc.)" },
  { name: "payload", type: "object", description: "リクエストボディ" },
  { name: "json", type: "object", description: "JSON形式のリクエストボディ" },
  { name: "timeout", type: "string", description: "タイムアウト時間（ミリ秒）" },
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
    <FormControl>
      <FormLabel>HTTP Custom設定</FormLabel>
      <FormHelperText mb={4}>
        詳細なパラメータについては
        <Link
          href="https://github.com/telefonicaid/fiware-orion/blob/master/doc/manuals.jp/orion-api.md#subscriptionnotificationhttpcustom"
          color="teal.500"
          isExternal
        >
          Orion APIドキュメント
        </Link>
        を参照してください。
      </FormHelperText>
      <VStack spacing={4} align="stretch">
        {fields.map((field, index) => {
          const param = customParams.find(p => p.name === field.key);
          return (
            <Box key={field.id}>
              <HStack spacing={2} align="flex-start">
                <FormControl>
                  <FormLabel fontSize="sm">パラメータ</FormLabel>
                  <Controller
                    control={control}
                    name={`httpCustomFields.${index}.key`}
                    render={({ field: { value, onChange } }) => (
                      <Select value={value} onChange={onChange}>
                        <option value={value}>{value}</option>
                      </Select>
                    )}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel fontSize="sm">値</FormLabel>
                  <Controller
                    control={control}
                    name={`httpCustomFields.${index}.value`}
                    render={({ field }) => (
                      param?.type === "object" ? (
                        <Textarea
                          {...field}
                          placeholder={`{
  "key": "value"
}`}
                        />
                      ) : (
                        <Textarea
                          {...field}
                          placeholder={param?.description}
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
        {availableParams.length > 0 && (
          <Button
            onClick={() => append({ key: availableParams[0].name, value: "" })}
            size="sm"
            width="fit-content"
            isDisabled={availableParams.length === 0}
          >
            + パラメータを追加
          </Button>
        )}
      </VStack>
    </FormControl>
  );
}
