import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Control, Controller } from "react-hook-form";
import { FeedbackFormData } from "../FeedbackDialog";
type FormInputProps = {
  name: keyof FeedbackFormData;
  control: Control<FeedbackFormData>;
  label: string;
};
const featureTypes = ["other", "enhancement", "bug", "new feature"] as const;

export const FormInputDropdown = ({ name, control, label }: FormInputProps) => {
  const generateSingleOptions = () => {
    return featureTypes.map((featureType, index) => {
      return (
        <MenuItem key={index} value={featureType}>
          {featureType}
        </MenuItem>
      );
    });
  };
  return (
    <FormControl size={"small"}>
      <InputLabel>{label}</InputLabel>
      <Controller
        render={({ field: { onChange, value } }) => (
          <Select onChange={onChange} value={value}>
            {generateSingleOptions()}
          </Select>
        )}
        control={control}
        name={name}
      />
    </FormControl>
  );
};
