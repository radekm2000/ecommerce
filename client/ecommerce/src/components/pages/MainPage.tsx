import { useUserContext } from "../../contexts/UserContext";
import { useEffect } from "react";
import { useProfileInfo } from "../../hooks/useProfileInfo";
import { Box, Typography } from "@mui/material";
import { useAllProducts } from "../../hooks/useAllProducts";
import { NotAuthed } from "../Navbar";
import { PaginatedProducts } from "../PaginatedProducts";
import { MainPageSkeleton } from "../MainPageSkeleton";

export const MainPage = () => {
  const { user, setUser } = useUserContext();
  const { data: products, isLoading: isProductsDataLoading } = useAllProducts();
  const {
    data: userInfo,
    isLoading: isUserInfoLoading,
    isSuccess,
  } = useProfileInfo(user);
  useEffect(() => {
    if (isSuccess) {
      setUser(userInfo);
    }
  }, [isSuccess, setUser, userInfo]);

  if (isUserInfoLoading || isProductsDataLoading) {
    return <MainPageSkeleton />;
  }
  if (!products) {
    return "No products to display";
  }
  if (!user.id && !user.username) {
    return <NotAuthed />;
  }
  return (
    <Box
      sx={{
        height: "100%",
        minHeight: "calc(100vh - 81px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "100%",
        marginTop: "200px",
        padding: "15px",
      }}
    >
      <Box sx={{ maxWidth: "1260px", width: "100%", display: "flex" }}>
        {products.length > 0 ? (
          <PaginatedProducts />
        ) : (
          <Typography>No products yet</Typography>
        )}
      </Box>
    </Box>
  );
};
