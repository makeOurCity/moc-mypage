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
import { Environments } from "@/libs/environments";

export default function Home() {

  return (
    <Modal isOpen={ true } onClose={() => {}}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          サインインが必要です
        </ModalHeader>
        <ModalBody pb={ 6 }>
          このページにアクセスするためにはサインインしてください。

          <Flex mt={ 6 }>
            {Environments.getSignUpUrl() && <Button
              as={ Link }
              href={ Environments.getSignUpUrl() }
              variant="ghost"
            >
              Sign Up
            </Button>}
            <Button
              bg="red.700"
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
