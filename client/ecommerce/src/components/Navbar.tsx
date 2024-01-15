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
import { useState } from "react";
import { useUserContext } from "../contexts/UserContext";
import { Avatar, Button, Tabs } from "@mui/material";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { Link, Redirect } from "wouter";

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
function samePageLinkNavigation(
  event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
) {
  if (
    event.defaultPrevented ||
    event.button !== 0 || // ignore everything but left-click
    event.metaKey ||
    event.ctrlKey ||
    event.altKey ||
    event.shiftKey
  ) {
    return false;
  }
  return true;
}

interface LinkTabProps {
  label?: string;
  href?: string;
  selected?: boolean;
}

function LinkTab(props: LinkTabProps) {
  return (
    <Tab
      sx={{
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
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    // event.type can be equal to focus with selectionFollowsFocus.
    if (
      event.type !== "click" ||
      (event.type === "click" &&
        samePageLinkNavigation(
          event as React.MouseEvent<HTMLAnchorElement, MouseEvent>
        ))
    ) {
      setValue(newValue);
    }
  };

  const [value, setValue] = useState(0);
  const below800 = useMediaQuery(800);
  const { user } = useUserContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
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
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
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
                margin: "0px 150px",
              }}
            >
              <Link href="/">
                <Typography
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
              </Link>
              <Search sx={{ flexGrow: 1 }}>
                <SearchIconWrapper>
                  <SearchIcon color="primary" />
                </SearchIconWrapper>
                <StyledInputBase
                  sx={{ width: "100%" }}
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
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
                <IconButton
                  size="large"
                  aria-label="show 4 new mails"
                  color="primary"
                >
                  <Badge badgeContent={2} color="error">
                    <MailIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="primary"
                >
                  <Badge badgeContent={17} color="error">
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
                onChange={handleChange}
                aria-label="nav tabs example"
                role="navigation"
              >
                <LinkTab label="Men" href="/catalog/men" />
                <LinkTab label="Women" href="/catalog/women" />
              </Tabs>
            </Box>
          </Box>
        )}
      </ThemeProvider>
    </>
  );
};
