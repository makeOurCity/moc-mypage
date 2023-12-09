import { Box, Button, FormControl, FormHelperText, FormLabel, HStack, Input, Textarea, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

export type SubscriptionFormIdPatternTypeData = {
  id?: string;
  description: string;
  idPattern: string;
  url: string;

}

export default function SubscriptionFormIdPatternTypeForm() {
  const { control, handleSubmit, setValue, watch, reset, formState } =
  useForm<SubscriptionFormIdPatternTypeData>({
    defaultValues: { 
      description: "",
      idPattern: ".*",
      url: "https://",
    },
  });

  return(
    <>
      <form>
        <VStack spacing={4}>
          <FormControl>
            <FormLabel>IDパターン</FormLabel>
            <Input type='text' placeholder=".*" />
            <FormHelperText>IDで絞り込みを行えます。すべてのIDを対象とする場合は{"'.*'"}と正規表現で指定してください。</FormHelperText>
          </FormControl>
        
          <FormControl>
            <FormLabel>送信先URL</FormLabel>
            <Input type='text' placeholder="https://example.com"/>
            <FormHelperText>連携先のURLをhttpsから始まる形で記入してください。</FormHelperText>
          </FormControl>
        
          <FormControl>
            <FormLabel>説明</FormLabel>
            <Textarea />
            <FormHelperText>用途や、どこへのデータ送信なのかなどのメモを記入してください。</FormHelperText>
          </FormControl>
        </VStack>
      </form>
    </>
  )
}