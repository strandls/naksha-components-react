import { Box, Flex } from "@chakra-ui/core";
import React, { useState } from "react";

import Search from "../search";
import LayersList from "./list";

export default function LayerSelected() {
  const [q, setQ] = useState<any>();

  return (
    <Flex direction="column" h="full">
      <Search onChange={setQ} name="list-selected" />
      <Box className="list" boxSize="full" overflowX="auto">
        <LayersList q={q} />
      </Box>
    </Flex>
  );
}
