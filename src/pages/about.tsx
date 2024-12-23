import { Layout } from "@/components/Layout";
import { Card, CardBody, CardHeader, Heading, Stack } from "@chakra-ui/react";
import getConfig from 'next/config';


export default function About() {

  const { publicRuntimeConfig } = getConfig()
  const version = publicRuntimeConfig.version || 'x.x.x'

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
