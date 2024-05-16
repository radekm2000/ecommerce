import { Control, Controller } from "react-hook-form";
import { RoleForm } from "./PersonEditDialog";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

type RoleInputProps = {
  name: keyof RoleForm;
  control: Control<RoleForm>;
  label: string;
};

const roleTypes = ["user", "admin", "discordUser"] as const;

const generateRoleOptions = () => {
  return roleTypes.map((role, index) => {
    return (
      <MenuItem key={index} value={role}>
        {role}
      </MenuItem>
    );
  });
};

export const RoleInputDropdown = ({ name, control, label }: RoleInputProps) => {
  return (
    <FormControl size={"small"}>
      <InputLabel>{label}</InputLabel>
      <Controller
        render={({ field: { onChange, value } }) => (
          <Select onChange={onChange} value={value}>
            {generateRoleOptions()}
          </Select>
        )}
        control={control}
        name={name}
      />
    </FormControl>
  );
};
