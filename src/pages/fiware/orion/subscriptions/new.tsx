import { Layout } from "@/components/Layout";
import SubscriptionFormIdPatternTypeForm from "@/components/orion/subscription/SubscriptionFormIdPatternType";
import { Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, Heading, Stack } from "@chakra-ui/react";


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
            <CardFooter>
              <ButtonGroup spacing={4}>
                <Button colorScheme="teal">作成</Button>
                <Button >キャンセル</Button>
              </ButtonGroup>
            </CardFooter>
          </Card>
        </Stack>
      </Layout>
    );
}