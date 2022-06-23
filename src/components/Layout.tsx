import Head from "next/head";
import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "This is the default title" }: Props) => (
  <>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header></header>
    <div className="container mx-auto min-h-[100vh] h-full w-full p-8">
      {children}
    </div>
  </>
);

export default Layout;
