import NextImage from "next/image";
import { VFC } from "react";
import Zoom from "react-medium-image-zoom";

import { Image } from "types";

import { DrawerBody, DrawerFooter, DrawerHeader, DrawerContent, DrawerCloseButton, Grid, GridItem } from "@chakra-ui/react";

type Props = {
  images: Image[];
};

export const Images: VFC<Props> = (props) => {
  return (
    <DrawerContent>
      <DrawerCloseButton />
      <DrawerHeader>レビュー</DrawerHeader>

      <DrawerBody>
        <Grid templateColumns="repeat(5, 1fr)" gap={4}>
          {props.images.map((image: Image, index: number) => (
            <GridItem key={index}>
              <Zoom zoomMargin={30}>
                <NextImage src={image.url} alt={`レビューの画像${index}`} width={200} height={200} />
              </Zoom>
            </GridItem>
          ))}
        </Grid>
      </DrawerBody>

      <DrawerFooter></DrawerFooter>
    </DrawerContent>
  );
};
