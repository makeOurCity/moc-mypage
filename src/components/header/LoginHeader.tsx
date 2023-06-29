import React from "react";
import {
  Box,
  Flex,
  HStack,
  VStack,
  Text,
  Menu,
  MenuButton,
} from "@chakra-ui/react";
import {  FiChevronDown } from "react-icons/fi";
import { useSession } from "next-auth/react";
import HeaderIcon from "./Icon";
import HeaderMenu from "./Menu";

export default function LoginHeader() {
  const {data: session} = useSession();

  return (
    <HStack spacing={{ base: "0", md: "6" }}>
      {/* <IconButton
    size="lg"
    variant="ghost"
    aria-label="open menu"
    icon={<FiBell />}
  /> */}
      <Flex alignItems={"center"}>
        <Menu>
          <MenuButton
            py={2}
            transition="all 0.3s"
            _focus={{ boxShadow: "none" }}
          >
            <HStack>
              <HeaderIcon></HeaderIcon>
              <VStack
                display={{ base: "none", md: "flex" }}
                alignItems="flex-start"
                spacing="1px"
                ml="2"
              >
                <Text fontSize="sm">
                  {session?.user?.email || "example@example.com"}
                </Text>
              </VStack>
              <Box display={{ base: "none", md: "flex" }}>
                <FiChevronDown />
              </Box>
            </HStack>
          </MenuButton>
          <HeaderMenu />
        </Menu>
      </Flex>
    </HStack>
  );
}
