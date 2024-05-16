import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import { UserRole, UserWithAvatar } from "../../../types/types";
import { RenderAvatar } from "../../RenderAvatar";
import { useEditUserRole } from "../../../hooks/useAddAdminRankForUser";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RoleInputDropdown } from "./RoleInputDropdown";



const RoleSchema = z.object({
  role: z.union([
    z.literal("user"),
    z.literal("admin"),
    z.literal("discordUser"),
  ]),
});

export type RoleForm = z.infer<typeof RoleSchema>;

type Props = {
  open: boolean;
  handleClose: () => void;
  user: UserWithAvatar;
};

export const PersonEditDialog = ({ open, handleClose, user }: Props) => {
  const editRankMutation = useEditUserRole();

  const { handleSubmit, control } = useForm<RoleForm>({
    defaultValues: {
      role: user.role,
    },
    resolver: zodResolver(RoleSchema),
  });

  const onSubmit: SubmitHandler<RoleForm> = (data) => {
    editRankMutation.mutate({
      role: data as unknown as UserRole,
      userId: user.id,
    });
    handleClose()
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
          <RoleInputDropdown
            control={control}
            label=""
            name="role"
          ></RoleInputDropdown>
          <Button
            onClick={handleSubmit(onSubmit)}
            variant="contained"
            sx={{
              textTransform: "none",
              backgroundColor: "#007782",
              "&:hover": {
                backgroundColor: "#007782",
              },
            }}
          >
            Grant a role
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
