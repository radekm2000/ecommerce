import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { BasicRating } from "./BasicRating";
import { useState } from "react";
import { UserWithAvatar } from "../../types/types";
import { AccountCircle } from "@mui/icons-material";

export const ReviewForm = ({ user }: { user: UserWithAvatar }) => {
  const [value, setValue] = useState<number | null>(0);
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    console.log(value, comment);
  };

  return (
    <Card sx={{ width: "300px", height: "300px", padding: "20px" }}>
      <CardContent
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {user.avatar ? (
              <Avatar
                sx={{ width: "32px", height: "32px" }}
                src={user.avatar}
              />
            ) : (
              <AccountCircle
                sx={{ width: "64px", height: "64px", color: "grey" }}
              />
            )}
            <Typography sx={{ marginLeft: "5px" }}>{user.username}</Typography>
          </Box>
          <Box sx={{ marginTop: "10px" }}>
            <BasicRating value={value} setValue={setValue} />
          </Box>

          <TextField
            sx={{
              marginTop: "10px",
              "& fieldset.MuiOutlinedInput-notchedOutline": {
                borderColor: "#007782",
              },
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#007782",
                },
              },
            }}
            multiline
            maxRows={2}
            spellCheck="false"
            id="review-comment"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            label={"Review"}
          ></TextField>
          <Button
            onClick={(e) => handleSubmit(e)}
            fullWidth
            variant="contained"
            sx={{
              textTransform: "none",
              backgroundColor: "#007782",
              marginTop: "20px",
              "&:hover": {
                backgroundColor: "#007782",
              },
            }}
          >
            Submit
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
