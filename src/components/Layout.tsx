import { Spacer } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { ReactNode } from "react";
import SidebarWithHeader from "@/components/Sidebar";

type LayoutProps = Required<{
  readonly children: ReactNode;
}>;

export function Layout({ children }: LayoutProps) {
  const {data: session, status: loading} = useSession();

  if (loading === 'loading') return <Spacer />;

  return <SidebarWithHeader>{children}</SidebarWithHeader>
}
