import React, { useCallback } from "react";
import {
  useColorModeValue,
  MenuDivider,
  MenuItem,
  MenuList,
  Link,
} from "@chakra-ui/react";
import {  signOut } from "next-auth/react";
import { useRouter } from "next/router";

export default function HeaderMenu() {
  const router = useRouter();
  const white = useColorModeValue("white", "gray.900");
  const gray = useColorModeValue("gray.200", "gray.700");

  const handleSignOut = useCallback(async () => {
    const respo = await signOut({
      callbackUrl: "/",
    });
  }, []);

  return (
    <MenuList bg={white} borderColor={gray}>
      <MenuItem><Link href="about">About MyPage</Link></MenuItem>
      <MenuDivider />

      <MenuItem onClick={() => handleSignOut()}>Sign Out</MenuItem>
    </MenuList>
  );
}
