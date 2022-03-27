import { Box, IconButton } from "@chakra-ui/react";
import { ArrowUpIcon } from "@chakra-ui/icons";

import { useState, useEffect } from "react";

function BackToTopButton() {
  const [showButton, setShowButton] = useState(false);

  function handleScroll() {
    window.scrollTo({
      top: 0,
    });
  }

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 500) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    });
  }, []);

  if (!showButton) return null;

  return (
    <Box
      position="fixed"
      bottom={["20px", "20px", "60px"]}
      right={["20px", "20px", "60px"]}
      zIndex={1}
    >
      <IconButton
        size="lg"
        onClick={handleScroll}
        icon={<ArrowUpIcon />}
        aria-label={""}
      />
    </Box>
  );
}

export default BackToTopButton;
