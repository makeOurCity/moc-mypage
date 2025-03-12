import { FormControl, FormHelperText, FormLabel, Input } from "@chakra-ui/react";
import { Control, Controller } from "react-hook-form";
import { SubscriptionFormData } from "./SubscriptionForm";

type Props = {
  control: Control<SubscriptionFormData>;
};

export default function UrlNotificationFields({ control }: Props) {
  return (
    <FormControl>
      <FormLabel>送信先URL</FormLabel>
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
  );
}
