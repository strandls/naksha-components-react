import { ChakraProvider } from "@chakra-ui/react";
import * as React from "react";

const withChakra = (StoryFn: Function) => (
  <ChakraProvider>
    <StoryFn />
  </ChakraProvider>
);

export const decorators = [withChakra];
