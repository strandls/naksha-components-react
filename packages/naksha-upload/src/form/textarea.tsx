import {
  FormControl,
  FormHelperText,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";
import React from "react";
import { UseFormMethods } from "react-hook-form";

import { getByPath } from "@ibp/naksha-commons";
import ErrorMessage from "./error-message";

interface TextareaFieldProps {
  name: string;
  label?: string;
  f: UseFormMethods<Record<string, any>>;
  type?: string;
  hint?: string;
}

export default function TextareaField({
  name,
  label,
  f,
  type,
  hint,
}: TextareaFieldProps) {
  return (
    <FormControl isInvalid={getByPath(f.errors, `${name}.message`)}>
      {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <Textarea bg="white" name={name} type={type} ref={f.register} />
      <ErrorMessage name={name} errors={f.errors} />
      {hint && <FormHelperText>{hint}</FormHelperText>}
    </FormControl>
  );
}
