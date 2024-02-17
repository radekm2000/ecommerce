import {
  Avatar,
  Box,
  Button,
  Input,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useUserContext } from "../../contexts/UserContext";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { AccountCircle } from "@mui/icons-material";
import { ChangeEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../../api/axios";
import toast from "react-hot-toast";
import { Redirect, useLocation } from "wouter";
import { User } from "../../types/types";

type FormData = {
  country: string;
  aboutYou: string;
};

const countries = ["Poland", "England"] as const;

export const EditProfile = () => {
  const { user, setUser } = useUserContext();
  const formDataToBackend = new FormData();
  const [, setLocation] = useLocation();
  const [selectedFile, setSelectedFile] = useState<File | "">("");
  const below960 = useMediaQuery(960);
  const [formData, setFormData] = useState<FormData>({
    country: "",
    aboutYou: "",
  });
  const queryClient = useQueryClient();
  const handleAvatarChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const uploadedFiles = (e.target as HTMLInputElement).files;
    if (!uploadedFiles) {
      return;
    }
    const file = uploadedFiles[0];
    setSelectedFile(file);
  };
  const mutation = useMutation({
    mutationKey: ["profile", "update"],
    mutationFn: updateProfile,
    onSuccess: (user: User) => {
      setUser(user);
      toast.success("Profile updated");
      setLocation("/");
    },
    onError: (err) => {
      console.log(err);
    },
  });
  const { mutate } = mutation;
  const handleSubmitProfileChangeClick = () => {
    formDataToBackend.append("file", selectedFile);
    formDataToBackend.append("data", JSON.stringify(formData));

    mutate(formDataToBackend);
  };
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "calc(100vh - 130px)",
        backgroundColor: "rgba(37,44,51,0.08)",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "1280px",
          display: "flex",
          flexDirection: below960 ? "column" : "row",
          padding: "20px",
        }}
      >
        <Box sx={{ width: "30%" }}>
          <Typography
            sx={{
              fontSize: "24px",
              width: "100%",
              display: "flex",
              padding: "16px",
            }}
          >
            Settings
          </Typography>
        </Box>
        <Box
          sx={{
            width: below960 ? "95%" : "70%",
            display: "flex",
            flexDirection: "column",
            padding: "0px 10px 0px 20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              backgroundColor: "white",
              padding: "24px",
              alignItems: "center",
              borderBottom: "1px solid rgba(23, 23, 23, 0.15)",
            }}
          >
            <Typography sx={{ width: "100%" }}>Your photo</Typography>
            <Box
              gap={2}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
                alignItems: "center",
              }}
            >
              {user.avatar ? (
                <Avatar
                  src={user.avatar}
                  sx={{
                    width: "64px",
                    height: "64px",
                  }}
                />
              ) : selectedFile ? (
                <Avatar
                  sx={{ height: "64px", width: "64px", marginRight: "16px" }}
                  src={URL.createObjectURL(selectedFile)}
                />
              ) : (
                <AccountCircle
                  sx={{
                    width: "64px",
                    height: "64px",
                    paddingRight: "16px",
                    color: "grey",
                    display: "flex",
                  }}
                />
              )}
              <Button
                component="label"
                size="small"
                variant="outlined"
                sx={{
                  border: "1px solid #007782",
                  textTransform: "none",
                  padding: "8px",
                  color: "#007782",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "40%",
                }}
              >
                Choose photo
                <Input
                  id="upload-photo"
                  name="upload-photo"
                  type="file"
                  style={{ display: "none" }}
                  onChange={(e) => handleAvatarChange(e)}
                />
              </Button>
            </Box>
          </Box>
          <Box
            sx={{ display: "flex", padding: "24px", backgroundColor: "white" }}
          >
            <Box sx={{ width: "50%" }}>
              <Typography>About you</Typography>
            </Box>
            <Box sx={{ width: "50%" }}>
              <TextField
                spellCheck="false"
                onChange={(e) =>
                  setFormData({ ...formData, aboutYou: e.target.value })
                }
                value={formData.aboutYou}
                placeholder="Tell us more about yourself"
                variant="standard"
                multiline
                rows={5}
                sx={{
                  width: "100%",

                  "& .MuiInput-underline:before": {
                    borderBottomColor: "#007782", // Semi-transparent underline
                  },
                  "& .MuiInput-underline:hover:before": {
                    borderBottomColor: "#007782", // Solid underline on hover
                  },
                  "& .MuiInput-underline:after": {
                    borderBottomColor: "#007782", // Solid underline on focus
                  },
                }}
              ></TextField>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              padding: "24px",
              backgroundColor: "white",
              marginTop: "15px",
            }}
          >
            <Box sx={{ width: "50%" }}>
              <Typography>Country</Typography>
            </Box>
            <Box sx={{ width: "50%" }}>
              <TextField
                value={formData.country}
                onChange={(e) =>
                  setFormData({ ...formData, country: e.target.value })
                }
                select
                variant="standard"
                sx={{ width: "100%" }}
              >
                {countries.map((country, index) => (
                  <MenuItem key={index} value={country}>
                    {country}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </Box>
          <Box
            sx={{ width: "100%", justifyContent: "flex-end", display: "flex" }}
          >
            <Button
              onClick={() => handleSubmitProfileChangeClick()}
              variant="contained"
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                color: "white",
                backgroundColor: "#007782",
                textTransform: "none",
                marginTop: "10px",
                "&:hover": {
                  backgroundColor: "#007782",
                },
              }}
            >
              Edit profile
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
