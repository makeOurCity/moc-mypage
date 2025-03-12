import { Layout } from "@/components/Layout";
import SubscriptionForm, { SubscriptionFormData } from "@/components/orion/subscription/SubscriptionForm";
import { useOrion } from "@/hooks/useOrion";
import { Card, CardBody, CardHeader, Heading, Stack, useToast } from "@chakra-ui/react";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { createSubscriptionRequest } from "@/libs/parse/subscription";
import { useRouter } from "next/router";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function FiwareOrionSubscriptionsNew() {
  const [fiwareService] = useLocalStorage<string | undefined>(
    "fiware-service",
    undefined
  );
  const { api, setFiwareServiceHeader } = useOrion();
  useEffect(() => {
    setFiwareServiceHeader(fiwareService || "");
  }, [fiwareService]);

  const { control, handleSubmit, reset, formState } = useForm<SubscriptionFormData>({
    defaultValues: {
      description: "",
      idPattern: ".*",
      notificationType: "url",
      url: "https://",
    },
  });
  const router = useRouter();
  const toast = useToast();

  const onSubmit = useCallback(
    async (data: SubscriptionFormData) => {
      if (formState.isSubmitting) return;

      const request = createSubscriptionRequest(data);

      try {
        const resp = await api.subscriptionsApi.createSubscription(
          "application/json",
          request
        );

        if (resp.status === 201) {
          toast({
            title: "Subscriptionの作成",
            description: "Subscriptionの作成に成功しました。",
            status: "success",
            isClosable: true,
          });
          router.push("/fiware/orion/subscriptions");
          return;
        }
      } catch (e: any) {
        console.error(e);
        toast({
          title: "Subscriptionの作成",
          description: `Subscriptionの作成に失敗しました。(${e.message})`,
          status: "error",
          isClosable: true,
        });
      }
    },
    [formState.isSubmitting, api.subscriptionsApi, router, toast]
  );

  const onCancel = useCallback(async () => {
    reset();
  }, [reset]);

  return (
    <Layout>
      <Stack spacing={10}>
        <Card>
          <CardHeader>
            <Heading as="h1" size="md">
              新規Subscription作成
            </Heading>
          </CardHeader>
          <CardBody>
            <SubscriptionForm
              control={control}
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              onCancel={onCancel}
              isSubmitting={formState.isSubmitting}
            />
          </CardBody>
        </Card>
      </Stack>
    </Layout>
  );
}
