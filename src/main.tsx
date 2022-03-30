import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { registerSW } from "virtual:pwa-register";

registerSW({ immediate: true });

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <ColorModeScript initialColorMode="dark" />
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
