import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  Stack,
  SxProps,
  TextField,
  Typography,
} from "@mui/material";
import { featureType } from "../FeedbackDialog";
const sx: SxProps = {
  "& .MuiDialog-container": {
    alignItems: "flex-start",
  },
};
type DisplayFeedbackDialogProps = {
  featureTypeValue: featureType;
  open: boolean;
  handleClose: () => void;
  contactName: string;
  email: string;
  description: string;
};

export const DisplayFeedbackDialog = ({
  featureTypeValue,
  open,
  handleClose,
  contactName,
  email,
  description,
}: DisplayFeedbackDialogProps) => {
  const onClose = () => {
    handleClose();
  };
  return (
    <Dialog open={open} onClose={() => onClose()} sx={sx} fullWidth>
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

            <Select readOnly value={featureTypeValue}>
              <MenuItem value={featureTypeValue}>{featureTypeValue}</MenuItem>
            </Select>
          </Box>
          <TextField
            label="Contact name"
            spellCheck="false"
            name="contact name"
            value={contactName}
          ></TextField>
          <TextField
            label="Email"
            spellCheck="false"
            name="email"
            value={email}
          ></TextField>
          <TextField
            label="Description"
            spellCheck="false"
            value={description}
            name="description"
            maxRows={5}
            multiline
          ></TextField>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
