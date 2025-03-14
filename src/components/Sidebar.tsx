import React, { ReactNode } from "react";
import {
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  Image,
  Divider,
} from "@chakra-ui/react";
import {
  FiHome,
  FiCompass,
  FiFile,
  FiPackage,
  FiSend,
} from "react-icons/fi";
import { IconType } from "react-icons";
import NavItem from "@/components/header/NavItem";
import Header from "@/components/header/Header";
import { useSession } from "next-auth/react";
import FiwareServiceHistory from "./orion/FiwareServiceHistory";
import { useRouter } from "next/router";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface LinkItemProps {
  name: string;
  href?: string;
  showAnonymousUser?: boolean;
  icon: IconType;
}

const LinkItems: Array<LinkItemProps> = [
  { name: "Home", icon: FiHome, href: "/", showAnonymousUser: true },
  { name: "Tenant", icon: FiCompass, href: "/fiware/orion/types" },
  { name: "Entity", icon: FiFile, href: "/fiware/orion/entities" },
  { name: "Subscriptions", icon: FiPackage, href: "/fiware/orion/subscriptions" },
  { name: "Postman", icon: FiSend, href: "/fiware/orion/postman" },
];

export default function SidebarWithHeader({
  children,
}: {
  children: ReactNode;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <Header onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const { data: session } = useSession();
  const router = useRouter();
  const items = LinkItems.filter((item) => session || item.showAnonymousUser);
  const [, setFiwareService] = useLocalStorage<string | undefined>("fiware-service", undefined);

  const handleHistorySelect = (service: string) => {
    // 選択された値を保存
    setFiwareService(service);

    // 現在のページがテナント設定ページでない場合は、テナント設定ページに遷移
    if (router.pathname !== "/fiware/orion/types") {
      router.push("/fiware/orion/types");
    }
  };

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Box w="5em">
          <Image src="/logo.webp" alt="MoC" />
        </Box>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {items.map((link) => (
        <NavItem key={link.name} href={link.href} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}
      <Box mt={4}>
        <Divider />
        <Box px={4} py={2}>
          <FiwareServiceHistory onSelect={handleHistorySelect} />
        </Box>
      </Box>
    </Box>
  );
};
