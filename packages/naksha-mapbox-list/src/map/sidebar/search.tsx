import { Box, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useT } from "@ibp/naksha-commons";
import React from "react";

import { IconSearch } from "../icons";

export default function Search({ onChange, name }) {
  const { t } = useT();

  return (
    <Box p={4} shadow="md">
      <InputGroup>
        <InputLeftElement p={0} children={<IconSearch />} />
        <Input
          name={name}
          placeholder={t("find_layer_by_name")}
          type="search"
          onChange={(e) => onChange(e.target.value)}
        />
      </InputGroup>
    </Box>
  );
}
