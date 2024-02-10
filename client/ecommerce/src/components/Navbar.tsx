import Box from "@mui/material/Box";
import { styled, alpha, ThemeProvider } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import createTheme from "@mui/material/styles/createTheme";
import Tab from "@mui/material/Tab";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { useEffect, useState } from "react";
import { useUserContext } from "../contexts/UserContext";
import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Tabs,
} from "@mui/material";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { Link, Redirect, useLocation } from "wouter";
import { useNotificationsContext } from "../contexts/ChatNotificationsContext";
import { useNotifications } from "../hooks/useNotifications";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "rgba(0,0,0,0.08)",
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const theme = createTheme({
  palette: {
    primary: {
      main: "#757575",
      light: alpha("#757575", 0.2),
      // dark: alpha("#757575", 0.9),
    },
  },
});

interface LinkTabProps {
  label?: string;
  href?: string;
  selected?: boolean;
}

function LinkTab(props: LinkTabProps) {
  return (
    <Tab
      sx={{
        cursor: "pointer",
        fontSize: "14px",
        textTransform: "none",
        "&:hover": {
          backgroundColor: "rgba(23, 23, 23, 0.02)",
        },
      }}
      component="a"
      aria-current={props.selected && "page"}
      {...props}
    />
  );
}

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "primary.dark",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export const Navbar = () => {
  const below1000 = useMediaQuery(1000);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [value, setValue] = useState(0);
  const below800 = useMediaQuery(800);
  const { user } = useUserContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);
  const [, setLocation] = useLocation();
  const isMenuOpen = Boolean(anchorEl);
  const { notifications, setNotifications } = useNotificationsContext();
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const { data: notificationsReceived, isLoading: isNotificationsLoading } =
    useNotifications(user.id);
  if (isNotificationsLoading) {
    return "isNotificationsLoading...";
  }
  if (notificationsReceived) {
    setNotifications(notificationsReceived);
  }
  const handleSearchTextClick = () => {
    const params = new URLSearchParams();
    if (searchInputValue) {
      params.set("search_text", searchInputValue);
      setLocation(`/q/?${params.toString()}`);
      setSearchInputValue("");
    }
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    return <Redirect to="/profile" />;
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const shownNotificationsInboxNumber = notifications.filter(
    (notification) => notification.isRead !== true
  );
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <Link href={`/members/${user.id}`}>
          <Typography>Profile</Typography>
        </Link>
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleMobileMenuClose}>
        <Link to="/inbox">
          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
          >
            <Badge
              color="error"
              badgeContent={shownNotificationsInboxNumber.length}
            >
              <MailIcon />
            </Badge>
          </IconButton>
        </Link>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          {user.avatar ? <Avatar src={user.avatar} /> : <AccountCircle />}
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            flexGrow: 1,
            borderBottom: "1px solid rgba(23, 23, 23, 0.08)",
            borderColor: "primary.light",
          }}
        >
          <AppBar
            sx={{ backgroundColor: "#FFFFFF" }}
            position="static"
            elevation={0}
          >
            <Toolbar
              sx={{
                padding: "8px 16px",
                margin: below800 ? "0px 10px" : "0px 150px",
              }}
            >
              <Typography
                onClick={() => setLocation("/", { replace: true })}
                color="#26a69a"
                variant="h6"
                noWrap
                component="div"
                sx={{
                  cursor: "pointer",
                  display: {
                    xs: "none",
                    sm: "block",
                    fontFamily: "Maison Neue",
                    fontWeight: "800",
                    fontSize: "24px",
                    marginRight: 15,
                    marginLeft: "auto",
                  },
                }}
              >
                Vetted
              </Typography>
              <Box
                sx={{
                  width: "50%",
                  position: "relative",
                  display: below800 ? "none" : "inline",
                }}
              >
                <Search sx={{ flexGrow: 1 }}>
                  <SearchIconWrapper>
                    <SearchIcon color="primary" />
                  </SearchIconWrapper>
                  <StyledInputBase
                    onChange={(e) => setSearchInputValue(e.target.value)}
                    value={searchInputValue}
                    sx={{ width: "100%" }}
                    placeholder="Search for items"
                    inputProps={{ "aria-label": "search" }}
                  />
                </Search>
                {searchInputValue && (
                  <CardActionArea onClick={handleSearchTextClick}>
                    <Card
                      sx={{
                        position: "absolute",
                        width: "100%",
                        border: "1px solid rgba(23, 23, 23, 0.15)",
                        marginTop: "8px",
                        zIndex: 1,
                      }}
                    >
                      <CardContent
                        sx={{
                          p: 2,
                          "&:last-child": { pb: 2 },
                          alignItems: "center",
                          justifyContent: "flex-start",
                          color: "#171717",
                          fontSize: "16px",
                          fontWeight: "400",
                        }}
                      >
                        Search "{searchInputValue}"
                      </CardContent>
                    </Card>
                  </CardActionArea>
                )}
              </Box>
              <Box sx={{ flexGrow: 1 }} />
              <Button
                sx={{
                  borderRadius: "6px",
                  background: "#007782",
                  width: "90px",
                  height: "38px",
                  "&:hover": {
                    background: "#007782",
                  },
                  display: below800 ? "none" : null,
                }}
              >
                <Link href="/products/new">
                  <Typography
                    color="white"
                    fontFamily="Maison Neue"
                    fontSize="14px"
                  >
                    Sell now
                  </Typography>
                </Link>
              </Button>
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <Link to="/inbox">
                  <IconButton
                    size="large"
                    aria-label="show 4 new mails"
                    color="primary"
                  >
                    <Badge
                      badgeContent={shownNotificationsInboxNumber.length}
                      color="error"
                    >
                      <MailIcon />
                    </Badge>
                  </IconButton>
                </Link>
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="primary"
                >
                  <Badge color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="primary"
                >
                  {user.avatar ? (
                    <Avatar src={user.avatar} />
                  ) : (
                    <AccountCircle />
                  )}
                </IconButton>
              </Box>

              <Box sx={{ display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="primary"
                >
                  <MoreIcon />
                </IconButton>
              </Box>
            </Toolbar>
          </AppBar>
          {renderMobileMenu}
          {renderMenu}
        </Box>
        {below800 ? (
          <Box
            sx={{
              padding: "16px 16px",
              width: "auto",
              justifyContent: "center",
              display: "block",
              flexDirection: "row",
            }}
          >
            <Box sx={{ position: "relative" }}>
              <Search sx={{ flexGrow: 1, width: "100%" }}>
                <SearchIconWrapper>
                  <SearchIcon color="primary" />
                </SearchIconWrapper>
                <StyledInputBase
                  onChange={(e) => setSearchInputValue(e.target.value)}
                  value={searchInputValue}
                  sx={{ width: "100%" }}
                  placeholder="Search for items"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
              {searchInputValue && (
                <CardActionArea onClick={handleSearchTextClick}>
                  <Card
                    sx={{
                      position: "absolute",
                      width: "100%",
                      border: "1px solid rgba(23, 23, 23, 0.15)",
                      marginTop: "8px",
                      zIndex: 1,
                    }}
                  >
                    <CardContent
                      sx={{
                        p: 2,
                        "&:last-child": { pb: 2 },
                        alignItems: "center",
                        justifyContent: "flex-start",
                        color: "#171717",
                        fontSize: "16px",
                        fontWeight: "400",
                      }}
                    >
                      Search "{searchInputValue}"
                    </CardContent>
                  </Card>
                </CardActionArea>
              )}
            </Box>
          </Box>
        ) : null}
        {below1000 ? null : (
          <Box
            sx={{
              width: "100%",
              borderBottom: "1px solid rgba(23, 23, 23, 0.08)",
            }}
          >
            <Box
              sx={{
                backgroundColor: "#FFFFFF",
                margin: "0px 150px",
              }}
            >
              <Tabs
                TabIndicatorProps={{
                  style: { display: "none" },
                }}
                sx={{
                  fontFamily: "Maison Neue",
                  fontSize: "14px",
                }}
                value={value}
                aria-label="nav tabs example"
                role="navigation"
              >
                <Link to="/catalog/men">
                  <LinkTab label="Men" href="/catalog/men" />
                </Link>
                <Link to="/catalog/women">
                  <LinkTab label="Women" href="/catalog/women" />
                </Link>
              </Tabs>
            </Box>
          </Box>
        )}
      </ThemeProvider>
    </>
  );
};
