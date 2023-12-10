import { Box, Button, FormControl, FormHelperText, FormLabel, HStack, Input, Textarea, VStack } from "@chakra-ui/react";
import { Control, Controller, useForm } from "react-hook-form";

export type SubscriptionFormIdPatternTypeData = {
  id?: string;
  description: string;
  idPattern: string;
  url: string;
}

type props = {
  control: Control<SubscriptionFormIdPatternTypeData>
}

export default function SubscriptionFormIdPatternTypeForm({control}:props) {
  return(
    <>
      <VStack spacing={4}>
        <FormControl>
          <FormLabel>IDパターン</FormLabel>
          <Controller control={control} name="idPattern" render={
            ({field}) => (
              <Input type='text' placeholder=".*" value={field.value} onChange={field.onChange} />
            )
          }/>
          <FormHelperText>IDで絞り込みを行えます。すべてのIDを対象とする場合は{"'.*'"}と正規表現で指定してください。</FormHelperText>
        </FormControl>
      
        <FormControl>
          <FormLabel>送信先URL</FormLabel>
          <Controller control={control} name="url" render={
            ({field}) => (
              <Input type='text' placeholder="https://example.com" value={field.value} onChange={field.onChange}/>
            )
          }/>
          <FormHelperText>連携先のURLをhttpsから始まる形で記入してください。</FormHelperText>
        </FormControl>
      
        <FormControl>
          <FormLabel>説明</FormLabel>
          <Controller control={control} name="description" render={
            ({field}) => (
              <Textarea value={field.value} onChange={field.onChange} />
            )
          } />
          <FormHelperText>用途やデータの送信先などのメモを記入してください。</FormHelperText>
        </FormControl>
      </VStack>
    </>
  )
}