import { RecoilRoot } from "recoil";
import { ChakraProvider } from "@chakra-ui/react";
import { Toaster } from "react-hot-toast";

import { Layout } from "components/layout/Layout";

import "styles/globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-medium-image-zoom/dist/styles.css";

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
          <Toaster position="top-right" />
        </Layout>
      </ChakraProvider>
    </RecoilRoot>
  );
}

export default MyApp;
