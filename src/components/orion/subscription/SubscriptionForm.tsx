import { Box, Button, ButtonGroup, FormControl, FormHelperText, FormLabel, Input, Textarea } from "@chakra-ui/react";
import { Control, Controller, UseFormHandleSubmit } from "react-hook-form";
import HttpCustomFields from "./HttpCustomFields";
import NotificationTypeSelector from "./NotificationTypeSelector";

export type NotificationType = "url" | "httpCustom";

export interface HttpCustomField {
  key: string;
  value: string;
}

export interface SubscriptionFormData {
  description: string;
  idPattern: string;
  notificationType: NotificationType;
  url: string;
  httpCustomFields: HttpCustomField[];
}

type Props = {
  control: Control<SubscriptionFormData>;
  isSubmitting: boolean;
  onSubmit: (data: SubscriptionFormData) => Promise<void>;
  onCancel: () => void;
  handleSubmit: UseFormHandleSubmit<SubscriptionFormData>;
};

export default function SubscriptionForm({
  control,
  isSubmitting,
  onSubmit,
  onCancel,
  handleSubmit,
}: Props) {
  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <FormControl mb={4}>
        <FormLabel>IDパターン</FormLabel>
        <Controller
          control={control}
          name="idPattern"
          render={({ field, fieldState: { error } }) => (
            <>
              <Input
                type="text"
                placeholder=".*"
                value={field.value}
                onChange={field.onChange}
                isInvalid={!!error}
              />
              {error ? (
                <FormHelperText color="red.500">{error.message}</FormHelperText>
              ) : (
                <FormHelperText>
                  IDで絞り込みを行えます。すべてのIDを対象とする場合は{"'.*'"}と正規表現で指定してください。
                </FormHelperText>
              )}
            </>
          )}
        />
      </FormControl>

      <NotificationTypeSelector control={control} />

      <FormControl mb={4}>
        <FormLabel>URL設定</FormLabel>
        <Controller
          control={control}
          name="url"
          render={({ field, fieldState: { error } }) => (
            <>
              <Input
                type="text"
                placeholder="https://example.com"
                value={field.value}
                onChange={field.onChange}
                isInvalid={!!error}
              />
              {error ? (
                <FormHelperText color="red.500">{error.message}</FormHelperText>
              ) : (
                <FormHelperText>
                  連携先のURLをhttpsから始まる形で記入してください。
                </FormHelperText>
              )}
            </>
          )}
        />
      </FormControl>

      <Controller
        control={control}
        name="notificationType"
        render={({ field }) => (
          <>
            {field.value === "httpCustom" && <HttpCustomFields control={control} />}
          </>
        )}
      />

      <FormControl mb={4}>
        <FormLabel>説明</FormLabel>
        <Controller
          control={control}
          name="description"
          render={({ field, fieldState: { error } }) => (
            <>
              <Textarea
                value={field.value}
                onChange={field.onChange}
                isInvalid={!!error}
              />
              {error ? (
                <FormHelperText color="red.500">{error.message}</FormHelperText>
              ) : (
                <FormHelperText>
                  用途やデータの送信先などのメモを記入してください。
                </FormHelperText>
              )}
            </>
          )}
        />
      </FormControl>

      <ButtonGroup>
        <Button type="submit" colorScheme="teal" isLoading={isSubmitting}>
          作成
        </Button>
        <Button onClick={onCancel}>キャンセル</Button>
      </ButtonGroup>
    </Box>
  );
}
