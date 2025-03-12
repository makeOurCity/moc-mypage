import { Box, Button, FormControl, FormHelperText, FormLabel, HStack, IconButton, Input, VStack } from "@chakra-ui/react";
import { Control, Controller, useFieldArray } from "react-hook-form";
import { SubscriptionFormData } from "./SubscriptionForm";

type Props = {
  control: Control<SubscriptionFormData>;
};

type CustomField = {
  key: string;
  value: string;
};

export default function HttpCustomFields({ control }: Props) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "httpCustomFields",
  });

  return (
    <FormControl>
      <FormLabel>HTTP Custom設定</FormLabel>
      <VStack spacing={4} align="stretch">
        {fields.map((field, index) => (
          <Box key={field.id}>
            <HStack spacing={2} align="flex-start">
              <FormControl>
                <FormLabel fontSize="sm">キー</FormLabel>
                <Controller
                  control={control}
                  name={`httpCustomFields.${index}.key`}
                  render={({ field }) => (
                    <Input size="sm" {...field} placeholder="Authorization" />
                  )}
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize="sm">値</FormLabel>
                <Controller
                  control={control}
                  name={`httpCustomFields.${index}.value`}
                  render={({ field }) => (
                    <Input size="sm" {...field} placeholder="Bearer token" />
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
        ))}
        <Button
          onClick={() => append({ key: "", value: "" })}
          size="sm"
          width="fit-content"
        >
          + フィールドを追加
        </Button>
      </VStack>
      <FormHelperText>
        HTTPリクエストのカスタマイズ設定を入力してください。
        ヘッダーやクエリパラメータなどのキーと値のペアを設定できます。
      </FormHelperText>
    </FormControl>
  );
}
