import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input
} from "@chakra-ui/react";
import React from "react";
import { UseFormMethods } from "react-hook-form";
import { getByPath } from "../../utils/basic";

import ErrorMessage from "./common/error-message";

interface InputFieldProps {
  name: string;
  label?: string;
  f: UseFormMethods<Record<string, any>>;
  type?: string;
  hint?: string;
}

export default function InputField({
  name,
  label,
  f,
  type,
  hint
}: InputFieldProps) {
  return (
    <FormControl isInvalid={getByPath(f.errors, `${name}.message`)}>
      {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <Input name={name} type={type} ref={f.register} />
      <ErrorMessage name={name} errors={f.errors} />
      {hint && <FormHelperText>{hint}</FormHelperText>}
    </FormControl>
  );
}
