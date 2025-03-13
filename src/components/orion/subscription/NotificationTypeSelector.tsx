import { FormControl, FormLabel, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { Control, Controller } from "react-hook-form";
import { SubscriptionFormData } from "./SubscriptionForm";

type Props = {
  control: Control<SubscriptionFormData>;
};

export default function NotificationTypeSelector({ control }: Props) {
  return (
    <FormControl mb={4}>
      <FormLabel>通知タイプ</FormLabel>
      <Controller
        control={control}
        name="notificationType"
        render={({ field: { onChange, value } }) => (
          <RadioGroup value={value} onChange={onChange}>
            <Stack direction="row" spacing={4}>
              <Radio value="url">標準 URL 通知</Radio>
              <Radio value="httpCustom">HTTP カスタム通知</Radio>
            </Stack>
          </RadioGroup>
        )}
      />
    </FormControl>
  );
}
