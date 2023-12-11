import { Layout } from "@/components/Layout";
import SubscriptionFormIdPatternType, { SubscriptionFormIdPatternTypeData } from "@/components/orion/subscription/SubscriptionFormIdPatternType";
import { useOrion } from "@/hooks/useOrion";
import { Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, Heading, Stack, useToast } from "@chakra-ui/react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { SubscriptionFormIdPatternTypeDataToJson } from "@/libs/parse/subscription";
import { useRouter } from "next/router";


export default function FiwareOrionSubscriptionsNew() {
  const { control, handleSubmit, setValue, watch, reset, formState } = useForm<SubscriptionFormIdPatternTypeData>({
    defaultValues: { 
      description: "",
      idPattern: ".*",
      url: "https://",
    },
  });
  const { api } = useOrion();
  const router = useRouter();
  const toast = useToast();

  const onSubmit = useCallback(
    async (data: SubscriptionFormIdPatternTypeData) => {
      if (formState.isSubmitting) return;

      const request = SubscriptionFormIdPatternTypeDataToJson(data);
      try {
        const resp = await api.subscriptionsApi.createSubscription("application/json", request);

        if (resp.status == 201) {
          reset();
          toast({
            title: "Subscriptionの作成",
            description: "Subscriptionの作成に成功しました。",
            status: "success",
            isClosable: true,
          })
          router.push("/fiware/orion/subscriptions")
          return;
        }
      } catch(e: any) {
        console.error(e);

        reset({}, {
          keepValues: true,
        })
        toast({
          title: "Subscriptionの作成",
          description: `Subscriptionの作成に失敗しました。(${e.message})`,
          status: "error",
        })
      }
    },
    [reset, formState.isSubmitting, api.subscriptionsApi, router, toast],
  )

  const onCancel = useCallback(
    async () => {
      reset();
    },
    [reset],
  )

  return (
      <Layout>
        <Stack spacing={10}>
          <Card>
            <CardHeader>
              <Heading as="h1" size="md">
                  新規Subscription作成
              </Heading>
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <CardBody>
                <SubscriptionFormIdPatternType control={control} />
              </CardBody>
              <CardFooter>
                <ButtonGroup>
                  <Button type="submit" colorScheme="teal" isLoading={formState.isSubmitting}>作成</Button>
                  <Button >キャンセル</Button>
                </ButtonGroup>
              </CardFooter>
            </form>
          </Card>
        </Stack>
      </Layout>
    );
}