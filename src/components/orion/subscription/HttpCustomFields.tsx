import { FormControl, FormHelperText, FormLabel, Textarea } from "@chakra-ui/react";
import { Control, Controller } from "react-hook-form";
import { SubscriptionFormData } from "./SubscriptionForm";

type Props = {
  control: Control<SubscriptionFormData>;
};

export default function HttpCustomFields({ control }: Props) {
  return (
    <FormControl>
      <FormLabel>HTTP Custom設定</FormLabel>
      <Controller
        control={control}
        name="httpCustom"
        render={({ field, fieldState: { error } }) => (
          <>
            <Textarea
              value={field.value ? JSON.stringify(field.value, null, 2) : ""}
              onChange={(e) => {
                try {
                  const value = e.target.value ? JSON.parse(e.target.value) : undefined;
                  field.onChange(value);
                } catch (err) {
                  // JSONパースエラーの場合は生の文字列をそのまま保持
                  field.onChange(e.target.value);
                }
              }}
              placeholder={`{
  "headers": {
    "Authorization": "Bearer token"
  },
  "qs": {
    "authkey": "value"
  }
}`}
              isInvalid={!!error}
              fontFamily="monospace"
              minHeight="200px"
            />
            {error ? (
              <FormHelperText color="red.500">{error.message}</FormHelperText>
            ) : (
              <FormHelperText>
                HTTPリクエストのカスタマイズ設定をJSON形式で入力してください。
                headers、qs（クエリパラメータ）などが設定可能です。
              </FormHelperText>
            )}
          </>
        )}
      />
    </FormControl>
  );
}
