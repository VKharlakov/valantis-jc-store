import { ReactNode } from "react";

import Footer from "../Footer";
import Header from "../Header";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="w-full  flex flex-col items-center">{children}</main>
      <Footer />
    </>
  );
}
