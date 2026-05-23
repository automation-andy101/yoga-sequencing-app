import type { ReactNode } from "react";
import Navbar from "@/components/layout/Navbar";

type Props = {
  children: ReactNode;
};

export default function PublicLayout({ children }: Props) {
  return (
    <>
      <Navbar />

      <div>{children}</div>
    </>
  );
}