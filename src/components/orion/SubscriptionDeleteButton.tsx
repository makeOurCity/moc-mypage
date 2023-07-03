import { Button } from "@chakra-ui/react";

export default function SubscriptionDeleteButton() {
  return (
    <Button
      bg="red.700"
      color="white"
      _hover={{
        bg: "red.600",
        color: "white",
      }}
    >
      削除
    </Button>
  );
}
