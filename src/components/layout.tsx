import { ReactElement } from "react";
import SidebarWithHeader from "./sidebar";

type LayoutProps = Required<{
  readonly children: ReactElement;
}>;

export const Layout = ({ children }: LayoutProps) => (
  <SidebarWithHeader>{children}</SidebarWithHeader>
);
