import { Layout } from "@/components/Layout";
import { Card, CardBody, CardHeader, Heading, Stack } from "@chakra-ui/react";
import { Environments } from "@/libs/environments";


export default function About() {

  const version = Environments.getAppVersion()

  return (
    <Layout>
      <Stack spacing={10}>

      <Card>
          <CardHeader>
            <Heading as="h1" size="md">
              マイページについて
            </Heading>
          </CardHeader>

          <CardBody>
            Version: {version}
          </CardBody>
        </Card>

      </Stack>
    </Layout>
  );
}
