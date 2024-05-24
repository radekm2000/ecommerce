import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import { UserWithAvatar } from "../../types/types";
import { AccountCircle } from "@mui/icons-material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { useAddReview } from "../../hooks/useAddReview";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { RenderAvatar } from "../RenderAvatar";

type FormFields = {
  rating: number;
  comment: string;
};

export const ReviewForm = ({ user }: { user: UserWithAvatar }) => {
  const below960 = useMediaQuery(960);
  const [hasSubmittedOnce, setHasSubmittedOnce] = useState(false);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormFields>();
  const postMutation = useAddReview(user.id);
  const { mutate } = postMutation;
  const onSubmit: SubmitHandler<FormFields> = (data) => {
    mutate({
      data: {
        ...data,
        reviewRecipientId: user.id,
      },
    });
    setHasSubmittedOnce(true);
  };
  const handleRatingChange = (event, value: number | null) => {
    if (typeof value === "number") {
      setValue("rating", value);
    }
  };
  return (
    <Card
      sx={{
        width: below960 ? "500px" : "300px",
        height: "300px",
        padding: "20px",
      }}
    >
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
            <RenderAvatar height="64px" width="64px " user={user} />

            <Typography sx={{ marginLeft: "5px" }}>{user.username}</Typography>
          </Box>
          <Box sx={{ marginTop: "10px" }}>
            <Controller
              name="rating"
              control={control}
              defaultValue={1}
              rules={{ min: 1, required: true }}
              render={({ field }) => (
                <Rating
                  readOnly={hasSubmittedOnce}
                  {...field}
                  onChange={handleRatingChange}
                />
              )}
            />
            {errors.rating && (
              <Typography sx={{ color: "red", fontSize: "14px" }}>
                Rating is required
              </Typography>
            )}
          </Box>
          <Controller
            name="comment"
            control={control}
            defaultValue=""
            rules={{ maxLength: 100 }}
            render={({ field: { ref, ...field } }) => (
              <TextField
                inputRef={ref}
                {...field}
                InputProps={{
                  readOnly: hasSubmittedOnce,
                }}
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
                error={!!errors.comment}
                spellCheck="false"
                id="review-comment"
                label={"Review"}
              ></TextField>
            )}
          ></Controller>
          {errors.comment && (
            <Typography sx={{ color: "red" }}>
              This comment is too long.
            </Typography>
          )}
          <Button
            onClick={handleSubmit(onSubmit)}
            type="submit"
            fullWidth
            disabled={hasSubmittedOnce}
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
            {hasSubmittedOnce ? (
              <Typography>Thanks for review!</Typography>
            ) : (
              <Typography>Submit</Typography>
            )}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
