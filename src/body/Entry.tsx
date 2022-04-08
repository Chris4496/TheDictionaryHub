import {
  IconButton,
  Container,
  Heading,
  Box,
  HStack,
  Text,
  Stack,
  OrderedList,
  ListItem,
} from "@chakra-ui/react";
import { FaVolumeUp } from "react-icons/fa";

import { entry } from "../types";

function Entry({ id, word, wordType, audioLinks, explanation }: entry) {
  function renderExplanation(section: any) {
    if (section["type"] === "main") {
      return (
        <Text
          fontSize={{ base: "22px", md: "24px", lg: "26px" }}
          key={section.content}
        >
          {section.content}
        </Text>
      );
    } else if (section["type"] === "example") {
      return (
        <Stack direction="row" p={3} key={section.content}>
          <Text>-</Text>
          <Text as="i" fontSize={{ base: "md", lg: "lg" }}>
            {section.content}
          </Text>
        </Stack>
      );
    }
  }

  return (
    <Container maxW={1000}>
      <Box py="1">
        <Heading fontSize={{ base: "35px", md: "40px", lg: "53px" }}>
          {word}
        </Heading>
      </Box>
      <Box>
        <Text fontSize="md">{wordType}</Text>
      </Box>
      <HStack spacing={5}>
        {audioLinks?.map((audio) => (
          <HStack id={audio.tag}>
            <h1>{audio["tag"]}</h1>
            <IconButton
              aria-label="Play Sound"
              size="sm"
              variant="ghost"
              icon={<FaVolumeUp />}
              onClick={() => new Audio(audio.link).play()}
            />
          </HStack>
        ))}
      </HStack>
      <Box py={6}>
        <OrderedList spacing={6}>
          {explanation?.map((orderedlist) => (
            <ListItem my={3}>
              {orderedlist.map((part) => renderExplanation(part))}
            </ListItem>
          ))}
        </OrderedList>
      </Box>
    </Container>
  );
}

export default Entry;
