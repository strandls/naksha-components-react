import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import React from "react";

import ErrorMessage from "./common/error-message";

export default function SelectField({ name, label, f, options }) {
  return (
    <FormControl isInvalid={f.errors[name] && true}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Select name={name} ref={f.register}>
        {options.map(option => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </Select>
      <ErrorMessage name={name} errors={f.errors} />
    </FormControl>
  );
}
