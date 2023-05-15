import { ReactElement } from "react";
import SidebarWithHeader from "./Sidebar";

type LayoutProps = Required<{
  readonly children: ReactElement;
}>;

export const Layout = ({ children }: LayoutProps) => (
  <SidebarWithHeader>{children}</SidebarWithHeader>
);
