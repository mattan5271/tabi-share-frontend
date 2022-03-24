import Error from "next/error";
import NextImage from "next/image";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import { useGetRequest } from "hooks/useGetRequest";
import { GoogleMap } from "components/travel_spots/GoogleMap";
import { LoadingSpinner } from "components/other/LoadingSpinner";

import { SearchIcon } from "@chakra-ui/icons";
import { FaCrown } from "react-icons/fa";
import {
  Box,
  SimpleGrid,
  Grid,
  GridItem,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  FormControl,
  FormErrorMessage,
  Text,
} from "@chakra-ui/react";

const Home = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { data: travelSpots, error: travelSpotsError, isLoading: travelSpotsIsLoading, isError: travelSpotsIsError } = useGetRequest("/travel_spots");
  const { data: genres, error: genresError, isLoading: genresIsLoading, isError: genresIsError } = useGetRequest("/admin/genres");
  const { data: rateRank, error: rateRankError, isLoading: rateRankIsLoading, isError: rateRankIsError } = useGetRequest("/travel_spots/rate_ranking");
  const { data: favRank, error: favRankError, isLoading: favRankIsLoading, isError: favRankIsError } = useGetRequest("/travel_spots/fav_ranking");
  const { data: reviewRank, error: reviewRankError, isLoading: reviewRankIsLoading, isError: reviewRankIsError } = useGetRequest("/travel_spots/review_ranking");

  const searchTravelSpots = (query) => {
    router.push({ pathname: "/travel_spots", query: query });
  };

  const onSubmit = (inputData) => {
    searchTravelSpots(inputData);
    reset();
  };

  if (travelSpotsIsLoading || genresIsLoading || rateRankIsLoading || favRankIsLoading || reviewRankIsLoading) return <LoadingSpinner />;
  if (travelSpotsIsError || genresIsError || rateRankIsError || favRankIsError || reviewRankIsError) {
    return (
      <Error
        statusCode={
          travelSpotsError?.response?.status ||
          genresError?.response?.status ||
          rateRankError?.response?.status ||
          favRankError?.response?.status ||
          reviewRankError?.response?.status ||
          500
        }
      />
    );
  }

  return (
    <Box>
      <Heading size="lg" mb={3} isTruncated>
        現在地から探す
      </Heading>
      <GoogleMap travelSpots={travelSpots} zoom={10} />

      <Grid templateColumns="repeat(12, 1fr)" my={10}>
        <GridItem colSpan={1} />
        <GridItem colSpan={10}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl id="keyword" isInvalid={!!errors.keyword}>
              <InputGroup>
                <InputRightElement>
                  <IconButton type="submit" colorScheme="blue" icon={<SearchIcon />} />
                </InputRightElement>
                <Input type="text" placeholder="キーワード検索" {...register("keyword", { required: "キーワードを入力してください" })} />
              </InputGroup>
              <FormErrorMessage>{errors.keyword?.message}</FormErrorMessage>
            </FormControl>
          </form>
        </GridItem>
        <GridItem colSpan={1} />
      </Grid>

      <Grid templateColumns="repeat(12, 1fr)">
        <GridItem colSpan={7}>
          <Heading size="lg" mb={3} isTruncated>
            ジャンルから探す
          </Heading>
          <Grid templateColumns="repeat(4, 1fr)" gap={4}>
            {genres.map((genre) => (
              <GridItem key={genre.id}>
                <NextImage
                  src={genre.image.url || "/no_image.jpeg"}
                  alt={`${genre.name}の画像`}
                  width={200}
                  height={200}
                  className="active_image"
                  onClick={() => searchTravelSpots({ genre_id: genre.id })}
                ></NextImage>
                <Text fontWeight={"bold"}>{genre.name}</Text>
              </GridItem>
            ))}
          </Grid>
        </GridItem>

        <GridItem colSpan={1}></GridItem>

        <GridItem colSpan={4}>
          <Heading size="lg" mb={3} isTruncated>
            評価ランキング
          </Heading>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>順位</Th>
                <Th>旅行先</Th>
                <Th>評価</Th>
              </Tr>
            </Thead>
            <Tbody>
              {rateRank.map((travelSpot, index) => (
                <Tr key={index}>
                  <Td>{index <= 2 ? <FaCrown color={(index === 0 && "#FFD700") || (index === 1 && "#C0C0C0 ") || (index === 2 && "#C47222")} /> : `${index + 1}位`}</Td>
                  <Td>{travelSpot.name}</Td>
                  <Td>{travelSpot.rating.toFixed(1)}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>

          <Heading size="lg" mt={10} mb={3} isTruncated>
            レビュー数ランキング
          </Heading>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>順位</Th>
                <Th>旅行先</Th>
                <Th>レビュー数</Th>
              </Tr>
            </Thead>
            <Tbody>
              {reviewRank.map((travelSpot, index) => (
                <Tr key={index}>
                  <Td>{index <= 2 ? <FaCrown color={(index === 0 && "#FFD700") || (index === 1 && "#C0C0C0 ") || (index === 2 && "#C47222")} /> : `${index + 1}位`}</Td>
                  <Td>{travelSpot.name}</Td>
                  <Td>{travelSpot.reviews.length}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>

          <Heading size="lg" mt={10} mb={3} isTruncated>
            「行きたい！」ランキング
          </Heading>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>順位</Th>
                <Th>旅行先</Th>
                <Th>行きたい！</Th>
              </Tr>
            </Thead>
            <Tbody>
              {favRank.map((travelSpot, index) => (
                <Tr key={index}>
                  <Td>{index <= 2 ? <FaCrown color={(index === 0 && "#FFD700") || (index === 1 && "#C0C0C0 ") || (index === 2 && "#C47222")} /> : `${index + 1}位`}</Td>
                  <Td>{travelSpot.name}</Td>
                  <Td>{travelSpot.favorites.length}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Home;
