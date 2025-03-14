import { Box, Button, ButtonGroup, FormControl, FormHelperText, FormLabel, Input, Textarea, Stack, Heading, Divider } from "@chakra-ui/react";
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
      <Stack spacing={8}>
        {/* 基本設定セクション */}
        <Box
          p={6}
          borderRadius="lg"
          boxShadow="sm"
          bg="white"
        >
          <Heading size="sm" mb={4}>基本設定</Heading>
          <Stack spacing={4}>
            <FormControl>
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

            <FormControl>
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
          </Stack>
        </Box>

        {/* 通知設定セクション */}
        <Box
          p={6}
          borderRadius="lg"
          boxShadow="sm"
          bg="white"
        >
          <Heading size="sm" mb={4}>通知設定</Heading>
          <Stack spacing={4}>
            <NotificationTypeSelector control={control} />

            <FormControl>
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
          </Stack>
        </Box>

        <Divider />

        <ButtonGroup>
          <Button type="submit" colorScheme="teal" isLoading={isSubmitting}>
            作成
          </Button>
          <Button onClick={onCancel}>キャンセル</Button>
        </ButtonGroup>
      </Stack>
    </Box>
  );
}
