import { FormErrorMessage } from "@chakra-ui/form-control";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";
import React from "react";
import { useController } from "react-hook-form";

interface TextareaFieldProps {
  name: string;
  label?: string;
  type?: string;
  hint?: string;
}

export default function TextareaField({
  name,
  label,
  type,
  hint,
}: TextareaFieldProps) {
  const { field, fieldState } = useController({ name });

  return (
    <FormControl isInvalid={fieldState.invalid}>
      {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <Textarea
        bg="white"
        name={field.name}
        type={type}
        onChange={field.onChange}
      />
      <FormErrorMessage children={fieldState?.error?.message} />
      {hint && <FormHelperText>{hint}</FormHelperText>}
    </FormControl>
  );
}
