import React from "react";
import {
  useColorModeValue,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import {  signOut } from "next-auth/react";

export default function HeaderMenu() {
  const white = useColorModeValue("white", "gray.900");
  const gray = useColorModeValue("gray.200", "gray.700");

  return (
    <MenuList bg={white} borderColor={gray}>
      <MenuItem>Profile</MenuItem>
      <MenuItem>Settings</MenuItem>
      <MenuItem>Billing</MenuItem>
      <MenuDivider />

      <MenuItem onClick={() => signOut()}>Sign Out</MenuItem>
    </MenuList>
  );
}
