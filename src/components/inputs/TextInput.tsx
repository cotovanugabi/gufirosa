import { InputAdornment, TextField, TextFieldProps } from "@mui/material";
import { Control, Controller } from "react-hook-form";

interface TextInputProps {
  control: Control<any>;
  name: string;
  isNumeric?: boolean;
  endAdornment?: string;
  startAdornment?: string;
  rules?: any;
}
export function TextInput({
  control,
  name,
  isNumeric,
  endAdornment,
  startAdornment,
  rules,
  ...rest
}: TextInputProps & TextFieldProps) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, ...field }, fieldState: { error } }) => (
        <TextField
          error={Boolean(error)}
          helperText={error && error.message}
          {...rest}
          {...field}
          onChange={(val) =>
            onChange(isNumeric ? Number(val.target.value) : val.target.value)
          }
          InputProps={{
            startAdornment: startAdornment && (
              <InputAdornment position="start">{startAdornment}</InputAdornment>
            ),
            endAdornment: endAdornment && (
              <InputAdornment position="start">{endAdornment}</InputAdornment>
            ),
          }}
        />
      )}
    />
  );
}
