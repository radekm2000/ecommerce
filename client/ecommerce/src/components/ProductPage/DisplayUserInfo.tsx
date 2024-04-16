import React, { useEffect, useState } from "react";
import { ProductWithImageAndUser, UserWithFollows } from "../../types/types";
import { Avatar, Box, Button, Rating, Typography } from "@mui/material";
import { IsProductsOwnerMeUser } from "../../utils/checkIfProductsOwnerIsMe";
import { useUserContext } from "../../contexts/UserContext";
import { AccountCircle } from "@mui/icons-material";
import { useFollowUser } from "../../utils/followUser";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Link, useLocation } from "wouter";
import { useUserInfo } from "../../hooks/useUserInfo";
import { calculateMedian } from "../../utils/calculateMedian";
import { FallbackProgress } from "../../utils/FallbackProgress";
export const DisplayUserInfo = ({
  userId,
  product,
}: {
  userId: number;
  product: ProductWithImageAndUser | undefined;
}) => {
  const [, setLocation] = useLocation();
  const { user: meUser } = useUserContext();
  const [followButonClicked, setFollowButtonClicked] = useState(false);
  const isFollowed = (member: UserWithFollows | undefined) => {
    return (member?.followings ?? []).some((following) => {
      return following.follower.id === meUser.id;
    });
  };
  const { data: meUserInfo, isLoading: isMeUserInfoLoading } = useUserInfo(
    meUser.id
  );
  const { data: user, isLoading: isUserLoading } = useUserInfo(userId);
  useEffect(() => {
    setFollowButtonClicked(isFollowed(user));
  }, [user]);
  const mutation = useFollowUser(user?.id);
  if (isMeUserInfoLoading || isUserLoading) {
    return <FallbackProgress />;
  }
  if (!product) {
    return;
  }

  if (!user) {
    return;
  }
  if (!meUserInfo) {
    return;
  }
  const { mutate } = mutation;
  const handleFollowButtonClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setFollowButtonClicked(!followButonClicked);
    mutate(user!.id);
  };
  const meUserRatings = meUserInfo?.reviews.map((review) => review.rating);
  const calculatedMeUserRatingValue = calculateMedian(meUserRatings);
  IsProductsOwnerMeUser(meUser.username, product);
  const ratings = user.reviews.map((review) => review.rating);
  const calculatedRatingValue = calculateMedian(ratings);
  return (
    <Box sx={{ width: "100%" }}>
      {IsProductsOwnerMeUser(meUser.username, product) ? (
        <Link to={`/members/${meUser.id}`}>
          <Box
            sx={{
              backgroundColor: "white",
              width: "100%",
              display: "flex",
              flexDirection: "row",
              padding: "16px",
              alignItems: "center",
              justifyContent: "flex-start",
              "&:hover": {
                backgroundColor: "rgba(23, 23,23, 0.04)",
              },
              cursor: "pointer",
            }}
          >
            {meUser.avatar ? (
              <Avatar
                src={meUser.avatar}
                sx={{ width: "48px", height: "48px", marginRight: "8px" }}
              />
            ) : (
              <AccountCircle
                sx={{ width: "48px", height: "48px", color: "grey" }}
              />
            )}
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography
                sx={{ fontSize: "16px", color: "#171717", marginLeft: "8px" }}
              >
                {meUser.username}
                {user.reviews.length > 0 && (
                  <>
                    <Box sx={{ display: "flex" }}>
                      <Rating
                        size="small"
                        value={calculatedMeUserRatingValue}
                        readOnly
                      />
                      <Typography sx={{ color: "#4D4D4D", fontSize: "11px" }}>
                        {user.reviews.length}
                      </Typography>
                    </Box>
                  </>
                )}
              </Typography>
            </Box>
            <KeyboardArrowRightIcon
              sx={{
                width: "24px",
                height: "24px",
                color: "black",
                marginLeft: "auto",
              }}
            />
          </Box>
        </Link>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
            width: "100%",
          }}
        >
          <Link to={`/members/${user?.id}`}>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                padding: "16px",
                backgroundColor: "white",

                alignItems: "center",
                justifyContent: "flex-start",
                borderBottom: "1px solid rgba(23, 23, 23, 0.15)",

                cursor: "pointer",
              }}
            >
              {user?.avatar ? (
                <Avatar
                  src={user.avatar}
                  sx={{ width: "48px", height: "48px", marginRight: "8px" }}
                />
              ) : (
                <AccountCircle
                  sx={{ width: "48px", height: "48px", color: "grey" }}
                />
              )}
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography sx={{ fontSize: "16px", color: "#171717" }}>
                  {user?.username}
                </Typography>
                {user.reviews.length > 0 && (
                  <>
                    <Box sx={{ display: "flex" }}>
                      <Rating
                        size="small"
                        value={calculatedRatingValue}
                        readOnly
                      />
                      <Typography sx={{ color: "#4D4D4D", fontSize: "11px" }}>
                        {user.reviews.length}
                      </Typography>
                    </Box>
                  </>
                )}
              </Box>
              <KeyboardArrowRightIcon
                sx={{
                  width: "24px",
                  height: "24px",
                  marginLeft: "auto",
                }}
              />
            </Box>
          </Link>
          <Box
            sx={{
              display: "flex",
              backgroundColor: "white",
              padding: "16px",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              onClick={() => setLocation(`/inbox/new/${user?.id}`)}
              sx={{
                width: "50%",
                border: "none",
                borderRight: "1px solid rgba(23, 23, 23, 0.15)",
                textTransform: "none",
                color: "#007782",
              }}
            >
              Message
            </Button>
            <Button
              onClick={(e) => handleFollowButtonClick(e)}
              sx={{
                border: "none",

                textTransform: "none",
                color: "#007782",
                width: "50%",
              }}
            >
              {followButonClicked ? "Following" : "Follow"}
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};
