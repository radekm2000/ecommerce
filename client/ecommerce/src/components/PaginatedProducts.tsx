import {
  Avatar,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { fetchPaginatedProducts } from "../api/axios";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { Link } from "wouter";
import { RenderAvatar } from "./RenderAvatar";
import { CURRENCY } from "./pages/MenCatalog";

export const PaginatedProducts = () => {
  const below1200 = useMediaQuery(1200);
  const below700 = useMediaQuery(700);
  const { data, error, status, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["products/paginated"],
      queryFn: fetchPaginatedProducts,
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage.nextPage,
    });
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);
  return status === "pending" ? (
    <div>Loading...</div>
  ) : status === "error" ? (
    <div>{error.message}</div>
  ) : (
    <div>
      {data.pages.map((page) => {
        return (
          <Grid container key={page.currentPage}>
            {page.data.map((item, index) => {
              return (
                <Grid
                  item
                  key={index}
                  lg={3}
                  md={below1200 ? 4 : 3}
                  xs={below700 ? 12 : 6}
                  xl={3}
                >
                  <Card
                    elevation={0}
                    sx={{
                      width: "fit-content",
                      height: "fit-content",
                      padding: "8px",
                    }}
                  >
                    <Link href={`/members/${item.user.id}`}>
                      <CardContent
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          cursor: "pointer",
                        }}
                      >
                        <RenderAvatar
                          width="24px"
                          height="24px"
                          user={item.user}
                        />
                        <Typography
                          sx={{
                            fontSize: "12px",
                            color: "#757575",
                            paddingLeft: "8px",
                          }}
                        >
                          {item.user.username}
                        </Typography>
                      </CardContent>
                    </Link>
                    <Link href={`products/${item.id}-${item.title}`}>
                      <CardMedia
                        alt={item.title}
                        component="img"
                        sx={{
                          width: "100%",
                          height: "330px",
                          cursor: "pointer",
                        }}
                        image={item.images[0].imageUrl}
                      ></CardMedia>
                    </Link>
                    <CardContent>
                      <Typography sx={{ fontSize: "14px", color: "#171717" }}>
                        {CURRENCY} {item.price}.00
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        );
      })}
      <div ref={ref}>{isFetchingNextPage && "Loading..."}</div>
    </div>
  );
};
