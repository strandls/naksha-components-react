import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import React from "react";
import { useController } from "react-hook-form";

interface InputFieldProps {
  name: string;
  label?: string;
  type?: string;
  hint?: string;
}

export default function InputField({
  name,
  label,
  type,
  hint,
}: InputFieldProps) {
  const { field, fieldState } = useController({
    name,
    defaultValue: "", // to prevent uncontrolled to controlled error
  });

  return (
    <FormControl isInvalid={fieldState.invalid}>
      {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <Input id={name} placeholder={label} type={type} {...field} />
      <FormErrorMessage children={fieldState?.error?.message} />
      {hint && <FormHelperText color="gray.600">{hint}</FormHelperText>}
    </FormControl>
  );
}
