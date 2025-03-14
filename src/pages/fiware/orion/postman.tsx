import { Box, Container, Heading, Text } from "@chakra-ui/react";
import PostmanWidget from "@/components/orion/subscription/PostmanWidget";

export default function PostmanPage() {
  return (
    <Container maxW="container.xl" py={5}>
      <Box mb={8}>
        <Heading as="h1" size="lg" mb={4}>
          Postman テストツール
        </Heading>
        <Text mb={6}>
          FIWARE Orion APIのエンドポイントをテストするためのPostmanコレクションです。
          このツールを使用して、サブスクリプションの通知設定やエンティティの操作をテストできます。
        </Text>
      </Box>

      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
        <PostmanWidget
          collectionId="12345678-90ab-cdef-1234-567890abcdef"
          height="600px"
        />
      </Box>
    </Container>
  );
}
