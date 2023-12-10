import { Layout } from "@/components/Layout";
import SubscriptionFormIdPatternTypeForm, { SubscriptionFormIdPatternTypeData } from "@/components/orion/subscription/SubscriptionFormIdPatternType";
import { Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, Heading, Stack } from "@chakra-ui/react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";


export default function FiwareOrionSubscriptionsNew() {
  const { control, handleSubmit, setValue, watch, reset, formState } = useForm<SubscriptionFormIdPatternTypeData>({
    defaultValues: { 
      description: "",
      idPattern: ".*",
      url: "https://",
    },
  });

  const onSubmit = useCallback(
    async (data: SubscriptionFormIdPatternTypeData) => {
      if (formState.isSubmitting) return;

      console.log(data);
      reset();
    },
    [reset, formState.isSubmitting],
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
                <SubscriptionFormIdPatternTypeForm control={control} />
              </CardBody>
              <CardFooter>
                <ButtonGroup>
                  <Button type="submit" colorScheme="teal">作成</Button>
                  <Button >キャンセル</Button>
                </ButtonGroup>
              </CardFooter>
            </form>
          </Card>
        </Stack>
      </Layout>
    );
}