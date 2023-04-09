import { Stack, Box, Text, IconButton } from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <Box
      as="footer"
      role="contentinfo"
      mx="auto"
      maxW="7xl"
      py="12"
      pb="20"
      px={{ base: "4", md: "8" }}
    >
      <Stack direction="row" spacing="4" align="center" justify="space-between">
        <Text fontSize="sm">
          &copy; {new Date().getFullYear()} Chris K. All rights reserved.
        </Text>
        <IconButton
          as="a"
          href="https://github.com/Chris4496/TheDictionaryHub"
          aria-label="GitHub"
          icon={<FaGithub fontSize="20px" />}
        />
      </Stack>
    </Box>
  );
}

export default Footer;
