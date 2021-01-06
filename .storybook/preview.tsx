import { ChakraProvider } from "@chakra-ui/react";
import * as React from "react";

const withChakra = (StoryFn) => (
  <ChakraProvider>
    <StoryFn />
  </ChakraProvider>
);

export const decorators = [withChakra];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};
