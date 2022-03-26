import {
  Container,
  Heading,
  WrapItem,
  Box,
  Text,
  Stack,
  Tag,
  Wrap,
  StackDivider,
} from "@chakra-ui/react";

import { synAntEntry } from "../types";

function SynAntEntry({ definition, pos, synonyms, antonyms }: synAntEntry) {
  synonyms = Object.entries(synonyms).sort(
    (a, b) => Number(b[0]) - Number(a[0])
  );

  antonyms = Object.entries(antonyms).sort(
    (a, b) => Number(a[0]) - Number(b[0])
  );

  return (
    <Container maxW={1000} py="5">
      <Box py="1">
        <Heading fontSize={{ base: "22px", md: "27px", lg: "32px" }}>
          {definition}
        </Heading>
      </Box>
      <Box>
        <Text fontSize="md">{pos}</Text>
      </Box>
      <Stack
        divider={<StackDivider />}
        spacing={4}
        align="stretch"
        minW="100%"
        direction={["column", "row"]}
        // maxW={1100}
      >
        <Box py={6}>
          <Heading
            as="h1"
            size="md"
            mb={4}
            fontSize={{ base: "17px", md: "19px", lg: "21px" }}
          >
            Synomyms:
          </Heading>
          {synonyms.map((synset: any) => (
            <Container key={synset[0]} my={3}>
              <Text fontSize={{ base: "18px", md: "20px", lg: "22px" }}>
                {"Similarity: " + synset[0] + "%"}
              </Text>
              <Wrap>
                {synset[1].map((s: any) => (
                  <WrapItem key={s}>
                    <Tag size="lg">{s}</Tag>
                  </WrapItem>
                ))}
              </Wrap>
            </Container>
          ))}
          {synonyms.length > 0 ? null : <Text>None</Text>}
        </Box>

        <Box py={6}>
          <Heading
            as="h1"
            size="md"
            mb={4}
            fontSize={{ base: "17px", md: "19px", lg: "22px" }}
          >
            Antonyms:
          </Heading>
          {antonyms.map((antset: any) => (
            <Container key={antset[0]} my={3}>
              <Text fontSize={{ base: "18px", md: "20px", lg: "22px" }}>
                {"Similarity: " + antset[0] + "%"}
              </Text>
              <Wrap>
                {antset[1].map((s: any) => (
                  <WrapItem key={s}>
                    <Tag size="lg">{s}</Tag>
                  </WrapItem>
                ))}
              </Wrap>
            </Container>
          ))}
          {antonyms.length > 0 ? null : <Text>None</Text>}
        </Box>
      </Stack>
    </Container>
  );
}

export default SynAntEntry;
