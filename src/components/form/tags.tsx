import { FormControl, FormHelperText, FormLabel } from "@chakra-ui/react";
import React from "react";
import { Controller, UseFormMethods } from "react-hook-form";

import ErrorMessage from "./common/error-message";
import { TagsInput } from "./tag-input";

interface TagsFieldProps {
  name: string;
  label: string;
  hint?: string;
  f: UseFormMethods<Record<string, any>>;
}

export default function TagsField({ name, label, hint, f }: TagsFieldProps) {
  return (
    <FormControl isInvalid={f.errors[name] && true}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Controller
        control={f.control}
        name={name}
        render={({ onChange, onBlur }) => (
          <TagsInput name={name} onChange={onChange} onBlur={onBlur} />
        )}
      />
      <ErrorMessage name={name} errors={f.errors} />
      {hint && <FormHelperText>{hint}</FormHelperText>}
    </FormControl>
  );
}
