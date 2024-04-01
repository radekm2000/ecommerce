import { Control, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { ReactNode } from "react";
import { FeedbackFormData } from "../FeedbackDialog";
export const FormInputText = ({
  name,
  control,
  label,
  multiline,
  maxRows,
}: {
  label: ReactNode;
  name: keyof FeedbackFormData;
  multiline?: boolean;
  maxRows?: number;
  control: Control<FeedbackFormData>;
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <TextField
            helperText={error ? error.message : null}
            error={!!error}
            maxRows={maxRows}
            spellCheck="false"
            multiline={multiline}
            onChange={onChange}
            value={value}
            label={label}
            variant="outlined"
          />
        );
      }}
    />
  );
};
