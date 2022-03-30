import { ReactNode, VFC } from "react";

import { NavBar } from "components/layout/NavBar";
import { Footer } from "components/layout/Footer";

import { Container } from "@chakra-ui/react";

type Props = {
  children: ReactNode;
};

export const Layout: VFC<Props> = (props) => {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <Container maxW="container.xl">{props.children}</Container>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};
