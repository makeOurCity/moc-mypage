import { ReactElement } from "react";
import SimpleSidebar from "./sidebar";

type LayoutProps = Required<{
  readonly children: ReactElement;
}>;

export const Layout = ({ children }: LayoutProps) => (
  <>
    <SimpleSidebar>
      <h1>Test</h1>
    </SimpleSidebar>
    {children}
  </>
);
