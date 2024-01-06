import React from "react";
import {
  Button,
  Flex,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay
} from "@chakra-ui/react";
import { signIn } from "next-auth/react";

export default function Home() {

  return (
    <Modal isOpen={ true } onClose={() => {}}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          ログインが必要です
        </ModalHeader>
        <ModalBody pb={ 6 }>
          このページにアクセスするためにはログインをしてください。

          <Flex mt={ 6 }>
            <Button
              bg="red.700"
              color="white"
              _hover={{
                bg: "red.600",
                color: "white",
              }}
              as={ Link }
              href={ process.env.NEXT_PUBLIC_SIGN_UP_URL }
              variant="solid"
            >
              Sign Up
            </Button>
            <Button
              bg="gray.700"
              color="white"
              _hover={{
                bg: "gray.600",
                color: "white",
              }}
              ml={ 6 }
              variant="solid"
              onClick={() => signIn()}
            >
              Sign In
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
