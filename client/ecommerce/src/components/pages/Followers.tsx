import { Link, useParams } from "wouter";
import { useUserInfo } from "../../hooks/useUserInfo";
import { Avatar, Box, Button, Container, Typography } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useEffect, useState } from "react";
import { UserWithFollows } from "../../types/types";
import { useUserContext } from "../../contexts/UserContext";
import { useFollowUser } from "../../utils/followUser";

export const Followers = () => {
  const { user: meUser } = useUserContext();

  const below960 = useMediaQuery(960);
  const below700 = useMediaQuery(700);
  const params = useParams();
  const userId = params?.userId;
  const isFollowed = (member: UserWithFollows) => {
    return (member.followers ?? []).some((follower) => {
      return follower.following.id === meUser.id;
    });
  };
  const { data: user, isLoading: isUserLoading } = useUserInfo(
    parseInt(userId!)
  );
  const [followButonClicked, setFollowButtonClicked] = useState(false);
  useEffect(() => {
    if (user && userId) {
      setFollowButtonClicked(isFollowed(user));
    }
  }, [user]);
  const mutation = useFollowUser(user?.id);
  const { mutate } = mutation;
  const handleFollowButtonClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setFollowButtonClicked(!followButonClicked);
    if (user) {
      mutate(user.id);
    }
  };

  if (isUserLoading) {
    return "isLoading...";
  }
  if (!user) {
    return;
  }
  if (!userId) {
    return;
  }

  return (
    <Container>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          minHeight: "calc(100vh - 81px)",
          paddingTop: "32px",
          paddingLeft: "8px",
          flexDirection: below960 ? "column" : "null",
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            flexBasis: "30%",
          }}
        >
          <Box
            sx={{
              marginBottom: "4px",

              flexDirection: "column",
            }}
          >
            <Link to={`/members/${userId}`}>
              <Box
                sx={{
                  cursor: "pointer",

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  borderBottom: "1px solid rgba(23, 23, 23, 0.10)",
                  marginBottom: "5px",
                  paddingBottom: "16px",
                }}
              >
                {user.avatar ? (
                  <Avatar
                    sx={{ width: "48px", height: "48px" }}
                    src={user.avatar}
                  />
                ) : (
                  <AccountCircle
                    sx={{ width: "48px", height: "48px", color: "grey" }}
                  />
                )}
                <Typography
                  sx={{
                    fontsize: "16px",
                    fontFamily: "Arial",
                    marginLeft: "8px",
                  }}
                >
                  {user.username}
                </Typography>
              </Box>
            </Link>
            {meUser.id === parseInt(userId) ? null : (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-stat",
                  paddingTop: "16px",
                  marginBottom: below960 ? "16px" : "0px",
                  paddingBottom: below960 ? "16px" : "0px",
                  borderBottom: below960
                    ? "1px solid rgba(23, 23, 23, 0.10)"
                    : "null",
                }}
              >
                <Button
                  sx={{
                    width: "50%",
                    textTransform: "none",
                    color: "#007782",
                    fontSize: "16px",
                    border: "1px solid white",
                    borderRight: "1px solid rgba(23, 23, 23, 0.10)",
                  }}
                  variant="outlined"
                >
                  Message
                </Button>
                <Button
                  onClick={(e) => handleFollowButtonClick(e)}
                  sx={{
                    width: "50%",
                    textTransform: "none",
                    color: "#007782",
                    fontSize: "16px",
                    border: "1px solid white",
                  }}
                  variant="outlined"
                >
                  {followButonClicked ? "Following" : "Follow"}
                </Button>
              </Box>
            )}
          </Box>
        </Box>
        <Box
          sx={{
            paddingLeft: below960 ? "0px" : "40px",
            flexGrow: 2,
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              borderBottom: "1px solid rgba(23, 23, 23, 0.10)",
              paddingBottom: "8px",
            }}
          >
            <Typography sx={{ fontSize: "16px" }}>
              {user.username} is following
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            {user?.followers?.map((follower, index) => (
              <Link to={`/members/${follower.following.id}`}>
                <Box
                  key={index}
                  sx={{
                    cursor: "pointer",
                    overflow: "hidden",
                    flexBasis: below700 ? "100%" : "33.333%",
                    display: "flex",
                    padding: "16px 0px",
                  }}
                >
                  {follower.following.avatar ? (
                    <img
                      style={{
                        height: "48px",
                        width: "48px",
                        borderRadius: "50%",
                      }}
                      src={follower.following.avatar}
                    />
                  ) : (
                    <AccountCircle
                      sx={{ width: "48px", height: "48px", color: "grey" }}
                    />
                  )}
                  <Typography
                    sx={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      marginLeft: "8px",
                    }}
                  >
                    {follower.following.username}
                  </Typography>
                </Box>
              </Link>
            ))}
          </Box>
        </Box>
      </Box>
    </Container>
  );
};
