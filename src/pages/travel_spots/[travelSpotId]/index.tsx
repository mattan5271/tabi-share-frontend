import { NextPage } from "next";
import Error from "next/error";
import { NextRouter, useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Rating } from "react-simple-star-rating";
import { TwitterIcon, TwitterShareButton } from "react-share";
import Slider from "react-slick";
import ShowMoreText from "react-show-more-text";

import { TravelSpotFavoriteButton } from "components/travel_spots/TravelSpotFavoriteButton";

import { useGetRequest } from "hooks/useGetRequest";
import { useHandleRequest } from "hooks/useHandleRequest";
import { LoadingSpinner } from "components/other/LoadingSpinner";
import { ReviewForm } from "components/reviews/ReviewForm";
import { TravelSpotDetail } from "components/travel_spots/TravelSpotDetail";
import { Reviews } from "components/reviews/Reviews";
import { Images } from "components/travel_spots/Images";
import { Access } from "components/travel_spots/Access";
import { Image as ImageType, Review } from "types";

import {
  Box,
  Container,
  Heading,
  Tabs,
  TabList,
  Tab,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  Image,
  VStack,
  HStack,
} from "@chakra-ui/react";

const TABS = ["旅行先詳細", "レビュー", "画像", "アクセス"];

type sliderSettings = {
  dots: boolean;
  autoplay: boolean;
  pauseOnHover: boolean;
  infinite: boolean;
  arrow: boolean;
  speed: number;
  slidesToShow: number;
};

const TravelSpot: NextPage = () => {
  const router: NextRouter = useRouter();
  const travelSpotId: string | string[] | undefined = router.query.travelSpotId;
  const BASE_URL: string = `/travel_spots/${travelSpotId}`;
  const [rating, setRating] = useState<number>(0);
  const [images, setImages] = useState<File[]>([]);
  const [previewImageUrls, setPreviewImageUrls] = useState<string[]>([]);
  const [selectTabName, setSelectTabName] = useState<string>("");
  const { handlePostRequest } = useHandleRequest();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Review>();
  const sliderSettings: sliderSettings = {
    dots: true,
    autoplay: true,
    pauseOnHover: true,
    infinite: true,
    arrow: true,
    speed: 1000,
    slidesToShow: 2.5,
  };

  const { data: travelSpot, error, isLoading, mutate } = useGetRequest(BASE_URL);

  const onSubmit = (inputData: Review): void => {
    handlePostRequest({
      apiUrl: "/reviews",
      params: { ...inputData, images, rating, travelSpotId },
      modelJa: "レビュー",
      modelEn: "review",
      mutate: { mutate, url: BASE_URL },
    });
    reset();
    setRating(0);
    setImages([]);
    setPreviewImageUrls([]);
  };

  const clickTab = (contentName: string): void => {
    setSelectTabName(contentName);
    onOpen();
  };

  const DrawerDetail = (): JSX.Element | null => {
    switch (selectTabName) {
      case "旅行先詳細":
        return <TravelSpotDetail travelSpot={travelSpot} />;
      case "レビュー":
        return <Reviews reviews={travelSpot.reviews} mutate={{ mutate, url: BASE_URL }} />;
      case "画像":
        const images: ImageType[] = travelSpot.reviews.flatMap((review: Review) => review.images.map((image: ImageType) => image));
        return <Images images={images} />;
      case "アクセス":
        return <Access travelSpot={travelSpot} />;
      default:
        return null;
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <Error statusCode={error?.response?.status || 500} />;

  return (
    <Box>
      <Container maxW="container.xl">
        <Slider {...sliderSettings}>
          {travelSpot.images.map((image: ImageType) => (
            <Image src={image ? image.url : "/no_image.jpeg"} alt={`${travelSpot.name}の画像`} height={400} key={image.url} />
          ))}
        </Slider>
      </Container>

      <Container maxW="container.lg" mt={10}>
        <VStack mb={5}>
          <Heading size="lg" isTruncated>
            {travelSpot.name}
          </Heading>
          <ShowMoreText more="全文表示" less="閉じる" width={1000} anchorClass="show-more-text-anchor">
            {travelSpot.introduction}
          </ShowMoreText>

          <HStack>
            <TravelSpotFavoriteButton travelSpot={travelSpot} mutate={{ mutate, url: BASE_URL }} />
            <TwitterShareButton url={`${process.env.NEXT_PUBLIC_API_URL}/${BASE_URL}`} title={`${travelSpot.name}\n`}>
              <TwitterIcon size={35} borderRadius={10} />
            </TwitterShareButton>
          </HStack>

          <Rating size={30} initialValue={travelSpot.rating} readonly={true} />
        </VStack>

        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            {TABS.map((tab) => (
              <Tab onClick={() => clickTab(tab)} key={tab}>
                {tab}
              </Tab>
            ))}
          </TabList>
        </Tabs>

        <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={"lg"}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>{selectTabName}</DrawerHeader>
            <DrawerBody>
              <DrawerDetail />
            </DrawerBody>
          </DrawerContent>
        </Drawer>

        <VStack>
          <Heading size="md" my={5} isTruncated>
            レビュー投稿
          </Heading>
        </VStack>
        <ReviewForm
          rating={rating}
          setRating={setRating}
          setImages={setImages}
          previewImageUrls={previewImageUrls}
          setPreviewImageUrls={setPreviewImageUrls}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          register={register}
          errors={errors}
        />
      </Container>

      <style jsx global>{`
        .slick-prev:before,
        .slick-next:before {
          color: black;
        }
        .show-more-text-anchor {
          color: blue;
          text-decoration: underline;
        }
      `}</style>
    </Box>
  );
};

export default TravelSpot;
