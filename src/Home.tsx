import {
  Input,
  Center,
  IconButton,
  Heading,
  Box,
  HStack,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Helmet } from "react-helmet";

import Footer from "./components/Footer";
import BackToTopButton from "./components/BackToTopButton";
import NavBar from "./components/NavBar";
import DisplayDict from "./body/DisplayDict";

const fetchDictList = async () => {
  const response = await fetch(
    "https://fastapi-backend-kubygcfq3a-ue.a.run.app/"
  );
  const json = await response.json();
  return json;
};

function Home() {
  const params = useParams();
  const navigate = useNavigate();

  const { isLoading, error, data } = useQuery<any, Error>(
    "distList",
    fetchDictList
  );

  const [dictList, setDictList] = useState<any>([]);

  useEffect(() => {
    if (data) {
      setDictList(data);
    }
  }, [data]);

  const [word, setWord] = useState(params.word || "");
  const inputref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const getWordOfTheDay = async () => {
      const response = await fetch(
        "https://fastapi-backend-kubygcfq3a-ue.a.run.app/wotd/"
      );
      const json = await response.json();
      setWord(json);
    };
    getWordOfTheDay();
  }, []);

  const searchWord = () => {
    const word = inputref.current?.value;
    if (!word) return;
    navigate(`/search/${word}`, { replace: true });
    setWord(word);
    // blur the input
    inputref.current?.blur();
  };

  const searchWordEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      searchWord();
    }
  };

  if (isLoading) {
    return (
      <Center my="140">
        <VStack spacing={4}>
          <Heading size="4xl">Loading...</Heading>
          <Spinner size="xl" />
        </VStack>
      </Center>
    );
  }
  if (error) return <Center>Error: {error.message}</Center>;

  return (
    <>
      <Helmet>
        <title>{`Dictionary - ${word}`}</title>
      </Helmet>
      <Box>
        <HStack my={3} mx={1}>
          <ColorModeSwitcher></ColorModeSwitcher>
          {/* <CustomizePopup
          setdictList={setdictList}
          setCookie={setCookie}
          dictList={dictList}
        /> */}
        </HStack>
        <Center>
          <Heading fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}>
            Search a word and get results from multiple dictionaries
          </Heading>
        </Center>
        <Center>
          <Input
            placeholder="Search here.."
            autoComplete="off"
            size="lg"
            maxWidth={1200}
            m={3}
            type="text"
            name="textvalue"
            onKeyDown={searchWordEnter}
            ref={inputref}
            boxShadow="lg"
          />
          <IconButton
            aria-label="Search"
            icon={<SearchIcon />}
            mr={3}
            onClick={searchWord}
          />
        </Center>
        <Center maxWidth={1200} m="auto">
          <NavBar dictList={dictList} />
        </Center>
        {dictList.map((dict: any) => (
          <DisplayDict word={word} dict={dict} key={dict.name} />
        ))}
        <Footer />
        <BackToTopButton />
      </Box>
    </>
  );
}

export default Home;
