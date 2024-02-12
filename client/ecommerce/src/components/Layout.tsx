import { ReactNode } from "react";
import { Navbar } from "./Navbar";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};
