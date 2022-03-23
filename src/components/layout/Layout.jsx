import { NavBar } from "components/layout/NavBar";
import { Footer } from "components/layout/Footer";

import { Container } from "@chakra-ui/react";

export const Layout = ({ children }) => {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <Container maxW="container.xl">{children}</Container>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};
