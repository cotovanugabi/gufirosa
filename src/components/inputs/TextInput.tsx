import { TextField, TextFieldProps } from "@mui/material";
import { Control, Controller, FieldValues } from "react-hook-form";

interface TextInputProps {
  control: Control<FieldValues>;
  name: string;
  isNumeric?: boolean;
}
export function TextInput({
  control,
  name,
  isNumeric,
  ...rest
}: TextInputProps & TextFieldProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, ...field } }) => (
        <TextField
          {...rest}
          {...field}
          onChange={(val) =>
            onChange(isNumeric ? Number(val.target.value) : val.target.value)
          }
        />
      )}
    />
  );
}
