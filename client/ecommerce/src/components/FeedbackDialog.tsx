import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  SxProps,
  TextField,
  Typography,
} from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { FormInputText } from "./form-component/FormInputText";
import { FormInputDropdown } from "./form-component/FormInputDropdown";

const featureTypes = ["other", "enhancement", "bug", "new feature"] as const;
export type featureType = (typeof featureTypes)[number];

const FeedbackSchema = z.object({
  featureType: z.union([
    z.literal("other"),
    z.literal("bug"),
    z.literal("enhancement"),
    z.literal("new feature"),
  ]),
  email: z.string().email(),
  contactName: z.string().min(1, "Contact name is required"),
  description: z.string().min(1, "Description is required"),
});

export type FeedbackFormData = z.infer<typeof FeedbackSchema>;
export const FeedbackDialog = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const sx: SxProps = {
    "& .MuiDialog-container": {
      alignItems: "flex-start",
    },
  };
  const {
    handleSubmit,
    control,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<FeedbackFormData>({
    defaultValues: {
      contactName: "",
      description: "",
      email: "",
      featureType: "other",
    },
    resolver: zodResolver(FeedbackSchema),
  });

  const onSubmit: SubmitHandler<FeedbackFormData> = (data) => {
    console.log(data);
  };
  const handleClose = () => {
    setValue("contactName", "");
    setValue("description", "");
    setValue("email", "");
    clearErrors();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} sx={sx} fullWidth>
      <DialogTitle
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <div>
          <Typography sx={{ color: "#007782" }} variant="h4">
            Feedback
          </Typography>
        </div>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={4} margin={2}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h5">Feature type</Typography>

            <FormInputDropdown
              control={control}
              name="featureType"
              label=""
            ></FormInputDropdown>
          </Box>
          <FormInputText
            control={control}
            name="contactName"
            label="Contact name"
          ></FormInputText>

          <FormInputText
            name="email"
            label="Email"
            control={control}
          ></FormInputText>

          <FormInputText
            multiline={true}
            maxRows={3}
            name="description"
            label="Description"
            control={control}
          ></FormInputText>

          <Button
            onClick={handleSubmit(onSubmit)}
            type="submit"
            sx={{
              backgroundColor: "#007782",
              color: "white",
              "&:hover": {
                backgroundColor: "#007782",
                color: "white",
              },
              textTransform: "none",
            }}
          >
            Submit feedback
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
