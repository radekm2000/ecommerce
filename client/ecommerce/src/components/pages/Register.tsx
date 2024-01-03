import {
  Box,
  Button,
  FilledInput,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import toast from "react-hot-toast";

import EmailIcon from "@mui/icons-material/Email";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../api/axios";
import { AxiosError } from "axios";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () =>
    setShowPassword((showPassword) => !showPassword);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const registerMutation = useMutation({
    mutationFn: registerUser,
    mutationKey: ["register"],
    onSuccess: () => {
      toast.success("User registered sucesfully");
    },
    onError: (err) => {
      const error = err as AxiosError<Error>;
      const message = error.response?.data?.message || "Something went wrong";
      toast.error(message);
    },
  });
  const { mutate } = registerMutation;

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    mutate({ username, email, password, confirmPassword });
  };

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
          Sign up
        </Typography>
        <TextField
          error={email.length > 3 && email.indexOf("@") == -1 ? true : false}
          helperText={
            email.length > 3 && email.indexOf("@") == -1
              ? "Email must be in proper format"
              : ""
          }
          onChange={(e) => setEmail(e.target.value)}
          id="filled-email-input"
          sx={{ mt: "32px" }}
          fullWidth
          value={email}
          variant="filled"
          label="Email"
          type="email"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            ),
          }}
        ></TextField>
        <TextField
          error={username.length > 1 && username.length < 5 ? true : false}
          helperText={
            username.length > 1 && username.length < 5
              ? "Username must be at least 5 characters long"
              : ""
          }
          onChange={(e) => setUsername(e.target.value)}
          id="input-with-icon-textfield"
          sx={{ mt: "32px" }}
          fullWidth
          label="Username"
          value={username}
          variant="filled"
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
        <FormControl
          error={password === confirmPassword ? false : true}
          sx={{ mt: "32px" }}
          fullWidth
          variant="filled"
        >
          <InputLabel htmlFor="filled-adornment-confirmPassword">
            Confirm Password
          </InputLabel>
          <FilledInput
            value={confirmPassword}
            type={showPassword ? "text" : "password"}
            onChange={(e) => setConfirmPassword(e.target.value)}
            id="filled-adornment-confirmPassword"
            startAdornment={
              <InputAdornment position="start">
                <LockRoundedIcon />
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle confirmPassword visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText id="confirm-password-error-text">
            {password !== confirmPassword ? "Passwords must match" : ""}
          </FormHelperText>
        </FormControl>
        <Button
          onClick={(e) => handleSubmit(e)}
          variant="contained"
          size="medium"
          sx={{ mt: "32px" }}
          fullWidth
        >
          Sign up
        </Button>
        <Link
          href="/login"
          sx={{ cursor: "pointer", display: "flex", marginLeft: "auto" }}
          variant="body2"
        >
          Already have an account? Sign in
        </Link>
      </Box>
    </Box>
  );
};
