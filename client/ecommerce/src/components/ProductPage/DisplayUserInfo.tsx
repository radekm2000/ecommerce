import React, { useState } from "react";
import {
  ProductWithImageAndUser,
  User,
  UserWithoutProductsRelation,
} from "../../types/types";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { IsProductsOwnerMeUser } from "../../utils/checkIfProductsOwnerIsMe";
import { useUserContext } from "../../contexts/UserContext";
import { AccountCircle } from "@mui/icons-material";
import { useFollowUser } from "../../utils/followUser";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Link, useLocation } from "wouter";
export const DisplayUserInfo = ({
  user,
  product,
}: {
  user: UserWithoutProductsRelation | undefined;
  product: ProductWithImageAndUser | undefined;
}) => {
  const [, setLocation] = useLocation();
  const { user: meUser } = useUserContext();
  const [followButonClicked, setFollowButtonClicked] = useState(false);

  const mutation = useFollowUser(user!.id);
  if (!product) {
    return;
  }
  const { mutate } = mutation;
  console.log(user);
  const handleFollowButtonClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setFollowButtonClicked(!followButonClicked);
    mutate(user!.id);
  };
  IsProductsOwnerMeUser(meUser.username, product);
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
                backgroundColor: "rgba(23, 23, 23, 0.04)",
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
            <Typography
              sx={{ fontSize: "16px", color: "#171717", marginLeft: "8px" }}
            >
              {meUser.username}
            </Typography>
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
              <Typography sx={{ fontSize: "16px", color: "#171717" }}>
                {user?.username}
              </Typography>
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
