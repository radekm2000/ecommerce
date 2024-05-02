import { Search } from "@mui/icons-material";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Input,
  InputBase,
  Paper,
  ThemeProvider,
  Typography,
  styled,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

const SearchIconWrapper = styled("div")(() => ({
  height: "100%",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

type Props = {
  searchInputValue: string;
  setSearchInputValue: React.Dispatch<React.SetStateAction<string>>;
  setIsSearchedIconClicked: React.Dispatch<React.SetStateAction<boolean>>;
};

export const InboxSearchCard = ({
  searchInputValue,
  setSearchInputValue,
  setIsSearchedIconClicked,
}: Props) => {
  console.log(searchInputValue);
  const handleSearchTextClick = () => {
    return;
  };

  return (
    <Box sx={{ display: "flex", width: "100%", flexDirection: "column" }}>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "100%",
          backgroundColor: "rgba(23, 23, 23, 0.08)",
          boxShadow: "none",
          flexGrow: 1,
        }}
      >
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>

        <InputBase
          onClick={() => {setIsSearchedIconClicked(true)}}
          onChange={(e) => setSearchInputValue(e.target.value)}
          value={searchInputValue}
          sx={{ width: "100%", ml: "1", flex: 1 }}
          placeholder="Select a member"
        />
      </Paper>
    </Box>
  );
};
