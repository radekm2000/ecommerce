import { Box, Button, Rating, Typography } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import { useMediaQuery } from "../hooks/useMediaQuery";
import {
  ExtendedUserWithProfileAndReviews,
  User,
  UserWithFollows,
} from "../types/types";
import { useUserContext } from "../contexts/UserContext";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import { useEffect, useState } from "react";
import { useFollowUser } from "../utils/followUser";
import { Link, useLocation } from "wouter";
import { calculateMedian } from "../utils/calculateMedian";
import { DiscordAvatar } from "./DiscordAvatar";
import { RenderAvatar } from "./RenderAvatar";
import { DisplayVerifiedInfo } from "./DisplayVerifiedInfo";
export const ProfileInfo = ({
  user,
}: {
  user: ExtendedUserWithProfileAndReviews;
}) => {
  const { user: meUser } = useUserContext();
  const [, setLocation] = useLocation();
  const ratings = user.reviews.map((review) => review.rating);
  const calculatedRatingValue = calculateMedian(ratings);

  const isFollowed = (member: UserWithFollows) => {
    return (member.followings ?? []).some((following) => {
      return following.follower.id === meUser.id;
    });
  };
  const [followButonClicked, setFollowButtonClicked] = useState(false);
  useEffect(() => {
    setFollowButtonClicked(isFollowed(user));
  }, [user]);
  const below750 = useMediaQuery(750);
  const below900 = useMediaQuery(900);
  const mutation = useFollowUser(user.id);
  const { mutate } = mutation;
  const handleFollowButtonClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setFollowButtonClicked(!followButonClicked);
    mutate(user.id);
  };

  const handleEditProfileClick = () => {
    setLocation("/settings/profile");
  };

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
            <RenderAvatar
              height="48px"
              width="48px"
              user={user}
              marginRight="10px"
            />
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
          </Box>
        </Box>
      ) : (
        <>
          <RenderAvatar
            height="192px"
            width="192px"
            user={user}
            marginRight="10px"
          />

          <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                padding: "16px 0px",
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography sx={{ fontSize: "24px" }}>
                  {user.username}
                </Typography>
                <Box
                  sx={{ display: "flex", gap: "10px", alignItems: "center" }}
                >
                  <Rating size="small" value={calculatedRatingValue} readOnly />

                  {user.reviews.length > 0 ? (
                    user.reviews.length == 1 ? (
                      <Typography>{user.reviews.length} review</Typography>
                    ) : (
                      <Typography sx={{ fontSize: "16px" }} color={"#4D4D4D"}>
                        {user.reviews.length} reviews
                      </Typography>
                    )
                  ) : (
                    <Typography color={"#4D4D4D"}>No reviews yet</Typography>
                  )}
                </Box>

                {user.id === meUser.id && below900 ? (
                  <Box
                    sx={{
                      alignItems: "center",
                      justifyContent: "flex-start",
                      display: "flex",
                      paddingTop: "8px",
                    }}
                  >
                    <Button
                      onClick={() => handleEditProfileClick()}
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
                  </Box>
                ) : null}
                {user.id !== meUser.id && below900 ? (
                  <Box
                    sx={{
                      alignItems: "center",
                      justifyContent: "center",
                      display: "flex",
                      paddingTop: "8px",
                    }}
                  >
                    <Button
                      onClick={() => setLocation(`/inbox/${user.id}`)}
                      variant="outlined"
                      disableElevation
                      disableRipple
                      sx={{
                        borderRadius: "6px",
                        borderColor: "#007782",
                        textTransform: "none",
                        maxWidth: "82px",
                        justifyContent: "center",
                        alignItems: "center",
                        marginRight: "10px",
                      }}
                    >
                      <Typography sx={{ color: "#007782", fontSize: "14px" }}>
                        Message
                      </Typography>
                    </Button>
                    <Button
                      onClick={(e) => handleFollowButtonClick(e)}
                      variant="contained"
                      disableElevation
                      disableRipple
                      sx={{
                        background: "#007782",
                        textTransform: "none",
                        justifyContent: "center",
                        alignItems: "center",
                        "&:hover": {
                          background: "#007782",
                        },
                        border: "1px #007782",
                      }}
                    >
                      <Typography
                        color="white"
                        fontFamily="Arial"
                        fontSize="14px"
                        sx={{
                          fontWeight: "500",
                          "&:hover": {
                            background: "#007782",
                          },
                        }}
                      >
                        {followButonClicked ? "Following" : "Follow"}
                      </Typography>
                    </Button>
                  </Box>
                ) : null}
              </Box>
              {user.id === meUser.id ? (
                <Button
                  onClick={() => handleEditProfileClick()}
                  disableElevation
                  disableRipple
                  sx={{
                    display: below900 ? "none" : "inline-flex",
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
              ) : below900 ? null : (
                <Box
                  sx={{
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                  }}
                >
                  <Button
                    onClick={() => setLocation(`/inbox/new/${user.id}`)}
                    variant="outlined"
                    disableElevation
                    disableRipple
                    sx={{
                      borderRadius: "6px",
                      borderColor: "#007782",
                      textTransform: "none",
                      maxWidth: "82px",
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: "10px",
                    }}
                  >
                    <Typography sx={{ color: "#007782", fontSize: "14px" }}>
                      Message
                    </Typography>
                  </Button>
                  <Button
                    onClick={(e) => handleFollowButtonClick(e)}
                    variant="contained"
                    disableElevation
                    disableRipple
                    sx={{
                      background: "#007782",
                      "&:hover": {
                        background: "#007782",
                      },
                      textTransform: "none",
                      justifyContent: "center",
                      alignItems: "center",
                      border: "1px #007782",
                    }}
                  >
                    <Typography
                      color="white"
                      fontFamily="Arial"
                      fontSize="14px"
                      sx={{ fontWeight: "500" }}
                    >
                      {followButonClicked ? "Following" : "Follow"}
                    </Typography>
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
                    justifyContent: "flex-start",
                    gap: "5px",
                  }}
                >
                  {user?.profile?.country ? (
                    <>
                      <LocationOnOutlinedIcon
                        sx={{ width: "16px", height: "16px", color: "grey" }}
                      />
                      <Typography color={"#4D4D4D"}>
                        {user.profile?.country}
                      </Typography>
                    </>
                  ) : null}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    gap: "5px",
                    width: "200px",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  <RssFeedIcon
                    sx={{ width: "16px", height: "16px", color: "grey" }}
                  />
                  <Typography color={"#4D4D4D"}>
                    <Link
                      style={{ color: "#007782" }}
                      to={`/members/${user.id}/followers`}
                    >
                      {user?.followers?.length || 0}
                    </Link>{" "}
                    {user?.followers!.length > 1 ? "followers" : "follower"}{" "}
                    <Link
                      style={{ color: "#007782" }}
                      to={`/members/${user.id}/followings`}
                    >
                      {user?.followings?.length || 0}
                    </Link>{" "}
                    {user.followings!.length > 1 ? "followings" : "following"}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                  }}
                >
                  <Typography color={"#4D4D4D"}>
                    {user?.profile?.aboutYou ? user.profile.aboutYou : ""}
                  </Typography>
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
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "center",
                  }}
                >
                  {user.email && <DisplayVerifiedInfo info="Email" />}
                  {user.discordId && <DisplayVerifiedInfo info="Discord" />}
                  {user.googleId && <DisplayVerifiedInfo info="Google" />}
                </Box>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};
