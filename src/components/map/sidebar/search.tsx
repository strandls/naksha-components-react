import { Box, Input, InputGroup, InputLeftElement } from "@chakra-ui/core";
import React from "react";

import { IconSearch } from "../icons";

export default function Search({ onChange, name }) {
  return (
    <Box p={4} shadow="sm">
      <InputGroup>
        <InputLeftElement p={0} children={<IconSearch />} />
        <Input
          name={name}
          placeholder="Find layer by name"
          type="search"
          onChange={e => onChange(e.target.value)}
        />
      </InputGroup>
    </Box>
  );
}
