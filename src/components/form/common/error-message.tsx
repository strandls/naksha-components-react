import { FormErrorMessage } from "@chakra-ui/react";
import React from "react";

import { getByPath } from "../../../utils/basic";

export default function ErrorMessage({ errors, name }) {
  const errorText = getByPath(errors, `${name}.message`);
  return <FormErrorMessage>{errorText}</FormErrorMessage>;
}
