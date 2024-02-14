import { Box, Card, CardContent, Typography } from "@mui/material";
import PaidRoundedIcon from "@mui/icons-material/PaidRounded";

export const SessionObjLoadingLayout = () => {
  return (
    <Box
      sx={{
        backgroundColor: "rgba(37,44,51,0.08)",
        display: "flex",
        height: "95vh",
        padding: "16px 30px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          width: "300px",
          height: "300px",
          padding: "20px",
        }}
      >
        <CardContent
          sx={{
            gap: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PaidRoundedIcon
            sx={{
              color: "rgba(37, 211, 102, 1)",
              height: "24px",
              width: "24px",
              fontSize: "large",
              padding: "16px",
            }}
          />
          <Typography
            sx={{
              fontSize: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Loading....
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};
