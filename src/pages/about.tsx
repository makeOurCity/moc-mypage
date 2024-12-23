import { Layout } from "@/components/Layout";
import { Card, CardBody, CardHeader, Heading, Stack } from "@chakra-ui/react";



export default function About() {

  const version = process.env.NEXT_PUBLIC_MYPAGE_VERSION

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
