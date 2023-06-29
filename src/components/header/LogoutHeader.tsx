import React from "react";
import { HStack, Button, Link } from "@chakra-ui/react";
import { useSession, signIn } from "next-auth/react";

export default function LogoutHeader() {
  const { data: session } = useSession();

  const signUpUrl = process.env.NEXT_PUBLIC_SIGN_UP_URL;

  const signUpButton = () => {
    if (signUpUrl) {
      return (
        <Link href={signUpUrl}>
          <Button  variant="ghost" size="sm">
            Sign Up
          </Button>
        </Link>
      );
    }

    return <></>;
  }

  return (
    <HStack spacing={{ base: "0", md: "6" }}>
      { signUpButton() }
      <Button
        bg="red.700"
        color="white"
        _hover={{
          bg: "red.600",
          color: "white",
        }}
        variant="solid"
        onClick={() => signIn()}
      >
        Sign In
      </Button>
    </HStack>
  );
}
