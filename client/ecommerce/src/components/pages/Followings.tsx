import { useParams } from "wouter";
import { useUserInfo } from "../../hooks/useUserInfo";
import { Avatar, Box, Button, Container, Typography } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useMediaQuery } from "../../hooks/useMediaQuery";

export const Followings = () => {
  const below960 = useMediaQuery(960);
  const below700 = useMediaQuery(700);
  const params = useParams();
  const userId = params?.userId;
  const { data: user, isLoading: isUserLoading } = useUserInfo(
    parseInt(userId!)
  );
  if (isUserLoading) {
    return "isLoading...";
  }
  if (!user) {
    return;
  }
  if (!userId) {
    return;
  }
  const exampleUsers = [
    {
      username: "user1",
    },
    {
      username: "user2",
    },
    {
      username: "user3",
    },
    {
      username: "mandarynka12569909",
    },
    {
      username: "user5",
    },
    {
      username: "user6",
    },
    {
      username: "user7",
    },
  ] as const;

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
            <Box
              sx={{
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
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-stat",
                paddingTop: "16px",
                marginBottom: below960 ? '16px' : '0px',
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
                sx={{
                  width: "50%",
                  textTransform: "none",
                  color: "#007782",
                  fontSize: "16px",
                  border: "1px solid white",
                }}
                variant="outlined"
              >
                Follow
              </Button>
            </Box>
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
              {user.username} is followed by
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            {exampleUsers.map((user, index) => (
              <Box
                key={index}
                sx={{
                  overflow: 'hidden',
                  flexBasis: below700 ? "100%" : "33.333%",
                  display: "flex",
                  padding: "16px 0px",
                }}
              >
                <AccountCircle sx={{ height: "48px", width: "48px" }} />
                <Typography
                  sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    marginLeft: "8px",
                  }}
                >
                  {user.username}
                </Typography>
              </Box>
            ))}
          </Box>
          ;
        </Box>
      </Box>
    </Container>
  );
};

{
  /* <Box sx={{display: 'flex', flexWrap: 'wrap'}}>
  {exampleUsers.map((user, index) => (
    <Box
      key={index}
      sx={{
        flex: "0 0 33.333%",
        display: "flex",
        padding: "16px 0px",
        alignItems: "flex-start",
      }}
    ><AccountCircle sx={{height: '48px', width: '48px'}}/>
    <Typography>{user.username}</Typography>
    </Box>
  ))}
</Box>; */
}

{
  /* <Box sx={{ display: "flex", flexWrap: "wrap" }}>
{user?.followings?.map((following, index) => (
  <Box
    key={index}
    sx={{
      flex: "0 0 33.333%",
      display: "flex",
      padding: "16px 0px",
      alignItems: "flex-start",
    }}
  >
    {following.follower.avatar ? (
      <img
        style={{
          height: "48px",
          width: "48px",
          borderRadius: "50%",
        }}
        src={following.follower.avatar}
      />
    ) : (
      <AccountCircle
        sx={{ width: "48px", height: "48px", color: "grey" }}
      />
    )}

    <Typography sx={{ fontSize: "16px", paddingLeft: "8px" }}>
      {following.follower.username}
    </Typography>
  </Box>
))}
</Box> */
}
