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
                  lg={below1200 ? 3 : 12 / 5}
                  md={below1200 ? 3 : 3}
                  xs={below700 ? 6 : 4}
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
                    <Link href={`/members/${item.user.id}`}>
                      <CardContent
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          cursor: "pointer",
                        }}
                      >
                        {item.user.avatar ? (
                          <Avatar
                            sx={{ width: "24px", height: "24px" }}
                            alt="user-avatar"
                            src={item.user.avatar}
                          />
                        ) : (
                          <AccountCircle
                            sx={{
                              color: "grey",
                              width: "24px",
                              height: "24px",
                            }}
                          />
                        )}
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
                        PLN {item.price}.00
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
  //   return (
  //     <Grid container>
  //       {products.map((product, index) => (
  //         <Grid item key={index} xl={12 / 5}>
  //           <Card
  //             elevation={0}
  //             sx={{
  //               width: "fit-content",
  //               height: "fit-content",
  //               padding: "8px",
  //             }}
  //           >
  //             <Link href={`/members/${product.user.id}`}>
  //               <CardContent
  //                 sx={{
  //                   display: "flex",
  //                   alignItems: "center",
  //                   justifyContent: "flex-start",
  //                   cursor: "pointer",
  //                 }}
  //               >
  //                 {product.user.avatar ? (
  //                   <Avatar
  //                     sx={{ width: "24px", height: "24px" }}
  //                     alt="user-avatar"
  //                     src={product.user.avatar}
  //                   />
  //                 ) : (
  //                   <AccountCircle
  //                     sx={{ color: "grey", width: "24px", height: "24px" }}
  //                   />
  //                 )}
  //                 <Typography
  //                   sx={{
  //                     fontSize: "12px",
  //                     color: "#757575",
  //                     paddingLeft: "8px",
  //                   }}
  //                 >
  //                   {product.user.username}
  //                 </Typography>
  //               </CardContent>
  //             </Link>
  //             <Link href={`products/${product.id}-${product.title}`}>
  //               <CardMedia
  //                 alt={product.title}
  //                 component="img"
  //                 sx={{ width: "100%", height: "330px", cursor: "pointer" }}
  //                 image={product.images[0].imageUrl}
  //               ></CardMedia>
  //             </Link>
  //             <CardContent>
  //               <Typography sx={{ fontSize: "14px", color: "#171717" }}>
  //                 PLN {product.price}.00
  //               </Typography>
  //             </CardContent>
  //           </Card>
  //         </Grid>
  //       ))}
  //     </Grid>
  //   );
};
