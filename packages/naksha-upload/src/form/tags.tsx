import { FormErrorMessage } from "@chakra-ui/form-control";
import { FormControl, FormHelperText, FormLabel } from "@chakra-ui/react";
import React from "react";
import { useController } from "react-hook-form";

import { TagsInput } from "./tag-input";

interface TagsFieldProps {
  name: string;
  label: string;
  hint?: string;
}

export default function TagsField({ name, label, hint }: TagsFieldProps) {
  const { field, fieldState } = useController({ name });

  return (
    <FormControl isInvalid={fieldState.invalid}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <TagsInput
        name={field.name}
        onChange={field.onChange}
        onBlur={field.onBlur}
      />
      <FormErrorMessage children={fieldState?.error?.message} />
      {hint && <FormHelperText>{hint}</FormHelperText>}
    </FormControl>
  );
}
