import React, { useState } from "react";
import {
  IconButton,
  Box,
  Flex,
  useColorModeValue,
  FlexProps,
  Image,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import { useSession, signOut } from "next-auth/react";
import HeaderIcon from "./Icon";
import HeaderMenu from "./Menu";
import LoginHeader from "./LoginHeader";
import LogoutHeader from "./LogoutHeader";
import { Environments } from "@/libs/environments";
import TextLogo from "../../libs/textLogo";

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
export default function Header({ onOpen, ...rest }: MobileProps) {
  const { data: session } = useSession();
  const white = useColorModeValue("white", "gray.900");
  const gray = useColorModeValue("gray.200", "gray.700");

  let header = <LogoutHeader />;
  if (session) {
    header = <LoginHeader />;
  }

  let headerIcon = <></>;
  if (Environments.getMocHeaderLogoText()) {
    headerIcon = (<Image src="/api/fonts/logo" alt={Environments.getMocHeaderLogoText()}/>)
  } else {
    headerIcon = (<Image src={Environments.getMocHeaderLogoImageUrl()} alt="MoC" />)
  }

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={white}
      borderBottomWidth="1px"
      borderBottomColor={gray}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Box w="12em" mx="auto">
        { headerIcon }
      </Box>

      {header}
    </Flex>
  );
}
