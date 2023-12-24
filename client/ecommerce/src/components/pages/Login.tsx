import {
  Box,
  Button,
  FilledInput,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useMutation } from "@tanstack/react-query";
import { signInUser } from "../../api/axios";
import toast from "react-hot-toast";
export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    mutate({ username, password });
  };

  const loginMutation = useMutation({
    mutationFn: signInUser,
    mutationKey: ["login"],
    onSuccess: () => {
      toast.success("User logged in", { style: { color: "black" } });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const { mutate } = loginMutation;
  return (
    <Box
      sx={{
        backgroundColor: "#fafaee",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          borderRadius: "4%",
          border: "1px solid '#FAFAED'",
          width: "400px",
          height: "600px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#fbfbf0",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Roboto",
            fontWeight: "500",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "3rem",
          }}
        >
          Sign in
        </Typography>
        <TextField
          id="input-with-icon-textfield"
          sx={{ mt: "32px" }}
          fullWidth
          label="Username"
          value={username}
          variant="filled"
          onChange={(e) => setUsername(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonRoundedIcon />
              </InputAdornment>
            ),
          }}
        ></TextField>

        <FormControl sx={{ mt: "32px" }} fullWidth variant="filled">
          <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
          <FilledInput
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            id="filled-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            startAdornment={
              <InputAdornment position="start">
                <LockRoundedIcon />
              </InputAdornment>
            }
          />
        </FormControl>
        <Button
          onClick={(e) => handleSubmit(e)}
          variant="contained"
          size="medium"
          sx={{ mt: "32px" }}
          fullWidth
        >
          Sign in
        </Button>
        <Grid
          sx={{ mt: "8px" }}
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Link sx={{ cursor: "pointer" }} variant="body2">
            Forgot password?
          </Link>
          <Link href="/register" sx={{ cursor: "pointer" }} variant="body2">
            Sign up
          </Link>
        </Grid>
      </Box>
    </Box>
  );
};
