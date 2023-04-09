import {
  Center,
  VStack,
  StackDivider,
  Heading,
  Divider,
  Stack,
  SkeletonText,
  Link,
  Container,
  Box,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

import Entry from "./Entry";
import SynAntEntry from "./SynAntEntry";

import { useState, useEffect } from "react";
import { useQuery } from "react-query";

import { entry } from "../types";

interface params {
  word: string;
}

interface Props {
  dict: { name: string; searchQuery: string };
  word: string;
}

function DisplayDict(props: Props) {
  const word: string = props.word;
  const dictName: string = props.dict.name;
  const searchQuery: string = props.dict.searchQuery;

  const url = `https://dict-api-kubygcfq3a-uc.a.run.app/${dictName}/?search=${word}`;

  const fetchData = async (word: string): Promise<any> => {
    const response = await fetch(url);
    const json = await response.json();
    return json;
  };

  const { isLoading, error, data } = useQuery<boolean, Error, any>(
    [dictName, word],
    () => fetchData(word)
  );

  if (isLoading) {
    return (
      <Center>
        <Stack w={1250} pt={40} px={6}>
          <SkeletonText noOfLines={18} spacing="6" />
        </Stack>
      </Center>
    );
  }

  if (data.response == "No result") {
    return (
      <div id={dictName}>
        <Center p={10}>
          <Heading fontSize={{ base: "2xl", lg: "3xl" }}>
            Result from {dictName[0].toUpperCase() + dictName.slice(1)}{" "}
            Dictionary
          </Heading>
        </Center>
        <Divider orientation="horizontal" borderColor="grey.200" />
        <Center p="10">
          <Heading>No Result</Heading>
        </Center>
      </div>
    );
  }

  return (
    <div id={dictName}>
      <Center p={4}>
        <Container maxW={1000}>
          <Box
            borderRadius="md"
            px={4}
            py={2}
            // bgColor="teal.500"
            w="fit-content"
          >
            {dictName == "synant" ? (
              <>
                <Heading fontSize={{ base: "2xl", lg: "3xl" }}>
                  Synonyms and antonyms
                </Heading>
                <Heading fontSize={{ base: "lg", lg: "xl" }}>
                  from thesaurus.com
                </Heading>
              </>
            ) : (
              <Heading fontSize={{ base: "2xl", lg: "3xl" }}>
                {dictName[0].toUpperCase() + dictName.slice(1)} Dictionary's
                results
              </Heading>
            )}
          </Box>
        </Container>
      </Center>
      <Divider orientation="horizontal" borderColor="grey.200" />
      <Center>
        <VStack
          divider={<StackDivider />}
          spacing={4}
          align="stretch"
          w={1100}
          minW="100%"
          maxW={1100}
          p={{ base: "5", lg: "10" }}
        >
          {data.map((entry: any) =>
            dictName == "synant" ? (
              <SynAntEntry key={entry.definition} {...entry} />
            ) : (
              <Entry key={entry.id} {...entry} />
            )
          )}
        </VStack>
      </Center>
      <Center>
        <Container maxW={1000} mb="6">
          <Link href={searchQuery + props.word} color="blue.500" isExternal>
            Link to Dictionary <ExternalLinkIcon mx="2px" />
          </Link>
        </Container>
      </Center>
    </div>
  );
}

export default DisplayDict;
