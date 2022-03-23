import NextImage from "next/image";
import Zoom from "react-medium-image-zoom";

import { DrawerBody, DrawerFooter, DrawerHeader, DrawerContent, DrawerCloseButton, Grid, GridItem } from "@chakra-ui/react";

export const Images = (props) => {
  return (
    <DrawerContent>
      <DrawerCloseButton />
      <DrawerHeader>レビュー</DrawerHeader>

      <DrawerBody>
        <Grid templateRows="repeat(1, 1fr)" templateColumns="repeat(5, 1fr)" gap={4}>
          {props.travelSpot.reviews.map((review) =>
            review.images.map((image, index) => (
              <GridItem>
                <Zoom zoomMargin={30}>
                  <NextImage src={image.url} alt={`${review.title}の画像${index}`} width={200} height={200} className="review_image" />
                </Zoom>
              </GridItem>
            ))
          )}
        </Grid>
      </DrawerBody>

      <DrawerFooter></DrawerFooter>
    </DrawerContent>
  );
};
