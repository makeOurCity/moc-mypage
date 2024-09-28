import { Layout } from "@/components/Layout";
import ObjectsUploadForm from "@/components/objects/UploadForm";
import { Card, CardBody, CardHeader, Heading } from "@chakra-ui/react";


export default function ObjectsUpload() {
  return (
    <Layout>
      <Card>
        <CardHeader>
          <Heading as="h1" size="md">ファイルアップロード</Heading>
        </CardHeader>
        <CardBody>
          <ObjectsUploadForm />
        </CardBody>
      </Card>
    </Layout>
  )
}
