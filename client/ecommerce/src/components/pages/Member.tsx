import { Box } from "@mui/material";
import { useLocation, useParams } from "wouter";
import { ProfileInfo } from "../ProfileInfo";
import { useAllProducts } from "../../hooks/useAllProducts";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useUserInfo } from "../../hooks/useUserInfo";
import BasicTabs from "../TabPanel";
import { useEffect, useState } from "react";
import {
  compareDesc,
  formatDistanceToNowStrict,
} from "date-fns";

export const Member = () => {
  const [tab, setTab] = useState("");
  const below700 = useMediaQuery(700);
  const below1200 = useMediaQuery(1200);
  const params = useParams();
  const [location, setLocation] = useLocation();
  const userId = params?.userId;
  const { data: user, isLoading: isUserLoading } = useUserInfo(
    parseInt(userId!)
  );
  console.log(user);
  const { data: products, isLoading: isProductsDataLoading } = useAllProducts();

  useEffect(() => {
    const params = new URLSearchParams();
    if (tab) {
      params.set("tab", tab);
      setLocation(`${location}?tab=${tab}`);
    }
  });
  if (isUserLoading) {
    return "isLoading...";
  }
  if (!user) {
    return;
  }
  if (!userId) {
    return;
  }
  if (isProductsDataLoading) {
    return "isLoading...";
  }
  const memberProducts = products?.filter(
    (product) => product.user.id === parseInt(userId)
  );
  if (!memberProducts) {
    return "No products yet";
  }
  if (!products) {
    return "No products to display";
  }
  const reviews = user.reviews;

  const sortedReviewsByCreateTime = reviews.sort((a, b) =>
    compareDesc(a.createdAt, b.createdAt)
  );

  const timeFormattedReviews = sortedReviewsByCreateTime.map((review) => {
    const formattedDistance = formatDistanceToNowStrict(review.createdAt, {
      addSuffix: true,
    });
    return {
      ...review,
      createdAt: formattedDistance,
    };
  });

  return (
    <Box
      sx={{
        height: "100%",
        minHeight: "calc(100vh - 81px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        maxWidth: "100%",
      }}
    >
      <ProfileInfo user={user} />
      <Box
        sx={{
          maxWidth: "1260px",
          width: "100%",
          display: "column",
          padding: "20x",
        }}
      >
        <BasicTabs
          reviews={timeFormattedReviews}
          setTab={setTab}
          memberproducts={memberProducts}
        />

        {/* <Typography
          sx={{ fontSize: "16px", color: "#171717", padding: "16px" }}
        >
          {memberProducts.length} items
        </Typography> */}
      </Box>
      {/* <Box
        sx={{
          maxWidth: "1260px",
          width: "100%",
          display: "flex",
          padding: "20x",
        }}
      >
        <Grid container>
          {memberProducts.map((product, index) => (
            <Grid
              item
              key={index}
              xs={below700 ? 6 : 4}
              md={below1200 ? 3 : 3}
              lg={below1200 ? 3 : 12 / 5}
              xl={12 / 5}
            >
              <Card
                elevation={0}
                sx={{
                  width: "fit-content",
                  height: "fit-content",
                  padding: "8px",
                }}
              >
                <Link href={`/products/${product.id}-${product.title}`}>
                  <CardMedia
                    alt={product.title}
                    component="img"
                    sx={{ width: "100%", height: "330px", cursor: "pointer" }}
                    image={product.images[0].imageUrl}
                  ></CardMedia>
                </Link>
                <CardContent>
                  <Typography sx={{ fontSize: "14px", color: "#171717" }}>
                    PLN {product.price}.00
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box> */}
    </Box>
  );
};
