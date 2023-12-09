import { Layout } from "@/components/Layout";
import SubscriptionFormIdPatternTypeForm from "@/components/orion/subscription/SubscriptionFormIdPatternType";
import { Card, CardBody, CardHeader, Heading, Stack } from "@chakra-ui/react";


export default function FiwareOrionSubscriptionsNew() {
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
              <SubscriptionFormIdPatternTypeForm />
            </CardBody>
          </Card>
        </Stack>
      </Layout>
    );
}