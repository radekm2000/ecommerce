import { Box, Typography } from "@mui/material";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

type Props = {
  info: "Discord" | "Email" | "Google";
};

export const DisplayVerifiedInfo = ({ info }: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "5px",
      }}
    >
      <CheckCircleOutlineOutlinedIcon
        sx={{
          width: "16px",
          height: "16px",
          color: "grey",
        }}
      />

      <Typography color={"#4D4D4D"}>{info}</Typography>
    </Box>
  );
};
