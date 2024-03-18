import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useState } from "react";
import { ProductWithImageAndUser, Review } from "../types/types";
import {
  Avatar,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Rating,
} from "@mui/material";
import { useMediaQuery } from "../hooks/useMediaQuery";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import { BasicRating } from "./ratingSystem/BasicRating";
import { AccountCircle } from "@mui/icons-material";
import { Link } from "wouter";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  memberproducts?: ProductWithImageAndUser[];
  reviews?: Review[];
}

function CustomTabPanel(props: TabPanelProps) {
  const below700 = useMediaQuery(700);
  const below1200 = useMediaQuery(1200);
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && props.memberproducts && (
        <Box
          sx={{
            maxWidth: "1260px",
            width: "100%",
            display: "column",
            padding: "20x",
          }}
        >
          {props.memberproducts && (
            <Typography
              sx={{ fontSize: "16px", color: "#171717", padding: "16px" }}
            >
              {props.memberproducts?.length} items
            </Typography>
          )}
          <Grid container>
            {props.memberproducts?.map((product, index) => (
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
        </Box>
      )}
      {props.reviews && props.reviews.length === 0 ? (
        <Box
          sx={{
            maxWidth: "1260px",
            width: "100%",
            display: "flex",
            marginTop: "20px",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <StarBorderOutlinedIcon sx={{ height: "64px", width: "64px" }} />
          <Typography sx={{ fontWeight: "600", fontSize: "24px" }}>
            No reviews yet
          </Typography>
          <Typography
            sx={{ fontWeight: "400", fontSize: "16px", color: "#4D4D4D" }}
          >
            Collecting reviews takes time, so check back soon
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            maxWidth: "1260px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          {props.reviews?.map((review, index) => (
            <Box
              key={index}
              sx={{
                gap: "5px",
                width: "100%",
                display: "flex",
                borderBottom: "1px solid rgba(23, 23, 23, 0.1)",
                marginTop: "10px",
              }}
            >
              <Box sx={{ display: "flex" }}>
                {review.reviewCreator.avatar ? (
                  <Avatar
                    src={review.reviewCreator.avatar}
                    sx={{ width: "48px", height: "48px" }}
                  />
                ) : (
                  <AccountCircle
                    sx={{ width: "48px", height: "48px", color: "grey" }}
                  />
                )}
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Link href={`/members/${review.reviewCreator.id}`}>
                    <Typography
                      sx={{
                        color: "#007782",
                        fontSize: "16px",
                        cursor: "pointer",
                      }}
                    >
                      {review.reviewCreator.username}
                    </Typography>
                  </Link>
                  <Rating value={review.rating} size="small" readOnly />
                  <Typography sx={{ color: "#4D4D4D", fontSize: "16px" }}>
                    {review.comment}
                  </Typography>
                  <Divider sx={{ my: 2, borderColor: "white" }} />
                </Box>
              </Box>
              <Box sx={{ marginLeft: "auto" }}>
                <Typography sx={{ color: "#1212125A", fontSize: "14px" }}>
                  {review.createdAt}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({
  memberproducts,
  setTab,
  reviews,
}: {
  reviews: Review[];
  setTab: React.Dispatch<React.SetStateAction<string>>;
  memberproducts: ProductWithImageAndUser[];
}) {
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  console.log(reviews);
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          sx={{
            "&& .Mui-selected": {
              color: "black",
            },
          }}
          TabIndicatorProps={{ style: { background: "#007782" } }}
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            onClick={() => setTab("wardrobe")}
            sx={{
              textTransform: "none",
            }}
            label="Wardrobe"
            {...a11yProps(0)}
          />
          <Tab
            onClick={() => setTab("reviews")}
            sx={{ textTransform: "none" }}
            label="Reviews"
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>
      <CustomTabPanel
        value={value}
        index={0}
        memberproducts={memberproducts}
      ></CustomTabPanel>
      <CustomTabPanel
        reviews={reviews}
        value={value}
        index={1}
      ></CustomTabPanel>
    </Box>
  );
}
