import { FormControl, FormHelperText, FormLabel } from "@chakra-ui/react";
import styled from "@emotion/styled";
import React from "react";
import { Controller, UseFormMethods } from "react-hook-form";
import MultiSelect from "react-multi-select-component";

import ErrorMessage from "./error-message";

const MultiSelectBox = styled.div`
  .multi-select {
    max-width: 100%;
  }
`;

interface SelectMultipleFieldProps {
  name: string;
  label: string;
  f: UseFormMethods<Record<string, any>>;
  options: any[];
  hint?: string;
}

export default function SelectMultipleField({
  name,
  label,
  options,
  f,
  hint,
}: SelectMultipleFieldProps) {
  return (
    <FormControl isInvalid={f.errors[name] && true}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Controller
        control={f.control}
        name={name}
        render={({ onChange, value }) => (
          <MultiSelectBox>
            <MultiSelect
              labelledBy={name}
              onChange={onChange}
              options={options}
              value={value}
            />
          </MultiSelectBox>
        )}
      />
      <ErrorMessage name={name} errors={f.errors} />
      {hint && <FormHelperText>{hint}</FormHelperText>}
    </FormControl>
  );
}
