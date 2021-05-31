import { FormErrorMessage } from "@chakra-ui/form-control";
import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import React from "react";
import { useController } from "react-hook-form";

export default function SelectField({ name, label, options }) {
  const { field, fieldState } = useController({ name });

  return (
    <FormControl isInvalid={fieldState.invalid}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Select name={name} value={field.value} onChange={field.onChange}>
        {options.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </Select>
      <FormErrorMessage children={fieldState?.error?.message} />
    </FormControl>
  );
}
