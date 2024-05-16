import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import { UserWithAvatar } from "../../../types/types";
import { RenderAvatar } from "../../RenderAvatar";
import { useAddAdminRankForUser } from "../../../hooks/useAddAdminRankForUser";

type Props = {
  open: boolean;
  handleClose: () => void;
  user: UserWithAvatar;
};

export const PersonEditDialog = ({ open, handleClose, user }: Props) => {
  const editRankMutation = useAddAdminRankForUser();

  const handleClick = () => {
    editRankMutation.mutate(user.id);
    handleClose();
  };
  return (
    <Dialog maxWidth="sm" fullWidth open={open} onClose={handleClose}>
      <DialogTitle>Edit role</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column" }}>
        <Stack spacing={4} margin={2}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <RenderAvatar user={user} width="64px" height="64px" />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
              }}
            >
              <Typography>{user.username}</Typography>
              <Typography sx={{ fontSize: "9px", color: "grey" }}>
                {user.role}
              </Typography>
            </Box>
          </Box>
          <Button onClick={handleClick}
            variant="contained"
            sx={{
              textTransform: "none",
              backgroundColor: "#007782",
              "&:hover": {
                backgroundColor: "#007782",
              },
            }}
          >
            Grant ADMIN role
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
