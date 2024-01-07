import { Box, Button, Typography } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { User } from "../types/types";
import { useUserContext } from "../contexts/UserContext";
import { Link } from "wouter";

export const ProfileInfo = ({ user }: { user: User }) => {
  const below750 = useMediaQuery(750);
  const below900 = useMediaQuery(900);
  const { user: meUser } = useUserContext();
  return (
    <Box
      sx={{
        maxWidth: "1260px",
        width: "100%",
        display: "flex",
        padding: "20px",
      }}
    >
      {below750 ? (
        <Box
          sx={{
            display: "flex",
            borderBottom: "1px solid rgba(23, 23, 23, 0.08)",
            paddingBottom: "20px",
            minWidth: "100%",
          }}
        >
          <Box>
            {user.avatar ? (
              <img
                style={{
                  height: "48px",
                  width: "48px",
                  marginRight: "auto",
                  padding: "20px",
                  borderRadius: "50%",
                }}
                src={user.avatar}
              />
            ) : (
              <AccountCircle
                sx={{
                  height: "64px",
                  width: "64px",
                  marginRight: "auto",
                  color: "grey",
                }}
              />
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography sx={{ fontSize: "24px", color: "#171717" }}>
              {user.username}
            </Typography>
            <Typography sx={{ color: "#4D4D4D", fontSize: "16px" }}>
              good reputation
            </Typography>
          </Box>
        </Box>
      ) : (
        <>
          <Box>
            {user.avatar ? (
              <img
                src={user.avatar}
                alt="Avatar"
                style={{
                  height: "192px",
                  width: "192px",
                  marginRight: "auto",
                  padding: "20px",
                  borderRadius: "50%",
                }}
              />
            ) : (
              <AccountCircle
                sx={{
                  height: "192px",
                  width: "226px",
                  marginRight: "auto",
                  color: "grey",
                }}
              />
            )}
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                padding: "16px",
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography sx={{ fontSize: "24px" }}>
                  {user.username}
                </Typography>
                <Typography color={"#4D4D4D"}>No reviews yet</Typography>
              </Box>
              {user.id === meUser.id ? (
                <Button
                  disableElevation
                  disableRipple
                  sx={{
                    textTransform: "none",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "1px solid grey",
                    color: "grey",
                  }}
                  startIcon={<CreateOutlinedIcon />}
                >
                  Edit profile
                </Button>
              ) : below900 ? (<Box>
                <Typography>hello world</Typography>
              </Box>) : (
                <Box
                  sx={{
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                  }}
                >
                  <Button
                    variant="outlined"
                    disableElevation
                    disableRipple
                    sx={{
                      borderRadius: "6px",
                      borderColor: "#007782",
                      textTransform: "none",
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: "10px",
                    }}
                  >
                    <Typography sx={{ color: "#007782" }}>Message</Typography>
                  </Button>
                  <Button
                    disableElevation
                    disableRipple
                    sx={{
                      background: "#007782",
                      textTransform: "none",
                      justifyContent: "center",
                      alignItems: "center",
                      border: "1px #007782",
                    }}
                  >
                    <Link href="/products/new">
                      <Typography
                        color="white"
                        fontFamily="Arial"
                        fontSize="14px"
                        sx={{ fontWeight: "500" }}
                      >
                        Follow
                      </Typography>
                    </Link>
                  </Button>
                </Box>
              )}
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: "60px" }}>
              <Box
                sx={{
                  marginRight: "auto",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                }}
              >
                <Typography
                  fontSize="12px"
                  color={"#4D4D4D"}
                  fontFamily="Arial"
                >
                  About:
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "5px",
                  }}
                >
                  <LocationOnOutlinedIcon
                    sx={{ width: "16px", height: "16px", color: "grey" }}
                  />
                  <Typography color={"#4D4D4D"}>Poland</Typography>
                </Box>
                <Box
                  sx={{
                    width: "160px",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography color={"#4D4D4D"}>
                    0 followers 0 following
                  </Typography>
                </Box>
                <Box
                  sx={{
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                  }}
                >
                  <Typography color={"#4D4D4D"}>good reputation</Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <Typography
                  fontSize="12px"
                  color={"#4D4D4D"}
                  fontFamily="Arial"
                >
                  Verified info:
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "5px",
                  }}
                >
                  <CheckCircleOutlineOutlinedIcon
                    sx={{
                      width: "16px",
                      height: "16px",
                      color: "grey",
                    }}
                  />
                  <Typography color={"#4D4D4D"}>Email</Typography>
                </Box>
                <Typography color={"#4D4D4D"}>
                  {user.googleId && (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "5px",
                      }}
                    >
                      <CheckCircleOutlineOutlinedIcon
                        sx={{
                          width: "16px",
                          height: "16px",
                          color: "grey",
                        }}
                      />
                      <Typography color={"#4D4D4D"}>Google</Typography>
                    </Box>
                  )}
                </Typography>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};
