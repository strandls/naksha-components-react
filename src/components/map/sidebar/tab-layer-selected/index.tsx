import { Box, Flex } from "@chakra-ui/react";
import React, { useState } from "react";

import Search from "../search";
import LayersList from "./list";

export default function LayerSelected() {
  const [q, setQ] = useState<any>();

  return (
    <Flex direction="column" h="100%">
      <Search onChange={setQ} name="list-selected" />
      <Box className="list" boxSize="100%" overflowX="auto">
        <LayersList q={q} />
      </Box>
    </Flex>
  );
}
