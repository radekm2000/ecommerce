import { Box, Rating, Typography } from "@mui/material";

export const BasicRating = ({
  value,
  setValue,
}: {
  value: number | null;
  setValue: React.Dispatch<React.SetStateAction<number | null>>;
}) => {
  return (
    <Box>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
    </Box>
  );
};
