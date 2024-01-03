/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useState } from "react";

const categories = ["Men", "Women", "Unisex"] as const;
const brands = [
  "Zara",
  "Reserved",
  "Nike",
  "House",
  "Adidas",
  "4F",
  "Calvin Klein",
  "unknown",
] as const;
type FormData = {
  title: string;
  description: string;
  brand: Brand | "";
  category: Category | "";
  price: string;
};
type Category = (typeof categories)[number];
type Brand = (typeof brands)[number];

export const AddProduct = () => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    brand: "",
    category: "",
    price: "",
  });
  const [formErrors, setFormErrors] = useState({
    titleError: false,
    descriptionError: false,
    brandError: false,
    categoryError: false,
    priceError: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [`${name}Error`]: false });
  };

  const handleProductUpload = () => {
    let hasErrors = false;
    const errors = { ...formErrors };
    if (!formData.title) {
      errors.titleError = true;
      hasErrors = true;
    }
    if (!formData.description) {
      errors.descriptionError = true;
      hasErrors = true;
    }
    if (!formData.brand) {
      errors.brandError = true;
      hasErrors = true;
    }
    if (!formData.category) {
      errors.categoryError = true;
      hasErrors = true;
    }
    if (!formData.price || +formData.price < 0) {
      errors.priceError = true;
      hasErrors = true;
    }
    if (hasErrors) {
      setFormErrors(errors);
      return;
    }
  };
  const below700 = useMediaQuery(700);
  return (
    <Box
      sx={{
        backgroundColor: "rgba(37,44,51,0.08)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "calc(100vh -81px)",
        height: "100%",
        padding: "24px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          maxWidth: "800px",
          flexDirection: "column",
          backgroundColor: "white",
        }}
      >
        <Box
          sx={{
            backgroundColor: "rgba(37,44,51,0.08)",
          }}
        >
          <Typography
            sx={{
              fontSize: "24px",
              fontFamily: "Arial",
              marginLeft: "auto",
            }}
          >
            Sell an item
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            borderBottom: "1px solid rgba(37,44,51,0.08)",
            padding: "24px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: below700 ? "column" : "row",
              justifyContent: "space-between",
              height: below700 ? "auto" : "45px",

              alignItems: below700 ? "flex-start" : "center",
            }}
          >
            {below700 ? (
              <Typography
                color={"grey"}
                sx={{
                  fontSize: "14px",
                }}
              >
                Title
              </Typography>
            ) : (
              <Typography sx={{ fontSize: "16px" }}>Title</Typography>
            )}

            <TextField
              name="title"
              value={formData.title}
              onChange={(e) => handleChange(e)}
              fullWidth={below700 ? true : false}
              error={formErrors.titleError}
              helperText={
                formErrors.titleError ? "Fill in  title to continue" : null
              }
              sx={{ padding: "4px", width: below700 ? "100%" : "50%" }}
              placeholder="e.g. White COS Jumper"
              id="standard-basic"
              variant="standard"
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: below700 ? "column" : "row",
            borderBottom: "24px solid rgba(37,44,51,0.08)",

            justifyContent: "space-between",
            alignItems: below700 ? "flex-start" : "center",
            padding: "24px",
          }}
        >
          {below700 ? (
            <Typography
              color={"grey"}
              sx={{
                fontSize: "14px",
              }}
            >
              Describe your item
            </Typography>
          ) : (
            <Typography sx={{ fontSize: "16px" }}>
              Describe your item
            </Typography>
          )}
          <TextField
            name="description"
            value={formData.description}
            onChange={handleChange}
            multiline={true}
            error={formErrors.descriptionError}
            helperText={
              formErrors.descriptionError ? "Fill in description" : null
            }
            rows={5}
            sx={{ padding: "4px", width: below700 ? "100%" : "50%" }}
            placeholder="e.g. only worn a few times"
            id="standard-basic2"
            variant="standard"
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            borderBottom: "24px solid rgba(37,44,51,0.08)",

            flexDirection: below700 ? "column" : "row",
            justifyContent: "space-between",
            alignItems: below700 ? "flex-start" : "center",
            padding: "24px",
          }}
        >
          {below700 ? (
            <>
              <Typography
                color={"grey"}
                sx={{
                  fontSize: "14px",
                }}
              >
                Category
              </Typography>
              <TextField
                name="category"
                id="standard-select-currency4"
                select
                error={formErrors.categoryError}
                helperText={
                  formErrors.categoryError ? "Fill in category" : null
                }
                defaultValue={""}
                label={formData.category ? "" : "Select a category"}
                onChange={handleChange}
                variant="standard"
                fullWidth
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </TextField>
            </>
          ) : (
            <>
              <Typography>Category</Typography>
              <TextField
                id="standard-select-currency3"
                select
                name="category"
                error={formErrors.categoryError}
                helperText={
                  formErrors.categoryError ? "Fill in category" : null
                }
                defaultValue={""}
                label={formData.category ? "" : "Select a category"}
                variant="standard"
                onChange={handleChange}
                sx={{ width: "50%" }}
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </TextField>
            </>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            borderBottom: "24px solid rgba(37,44,51,0.08)",

            flexDirection: below700 ? "column" : "row",
            justifyContent: "space-between",
            alignItems: below700 ? "flex-start" : "center",
            padding: "24px",
          }}
        >
          {below700 ? (
            <>
              <Typography
                color={"grey"}
                sx={{
                  fontSize: "14px",
                }}
              >
                Brand
              </Typography>
              <TextField
                name="brand"
                id="standard-select-currency1"
                select
                error={formErrors.brandError}
                helperText={formErrors.brandError ? "Fill in brand" : null}
                defaultValue={""}
                label={formData.brand ? "" : "Select a brand"}
                onChange={handleChange}
                variant="standard"
                fullWidth
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </TextField>
            </>
          ) : (
            <>
              <Typography>Brand</Typography>
              <TextField
                name="brand"
                id="standard-select-currency1"
                select
                error={formErrors.brandError}
                helperText={formErrors.brandError ? "Fill in brand" : null}
                defaultValue={""}
                label={formData.brand ? "" : "Select a brand"}
                variant="standard"
                onChange={handleChange}
                sx={{ width: "50%" }}
              >
                {brands.map((brand) => (
                  <MenuItem key={brand} value={brand}>
                    {brand}
                  </MenuItem>
                ))}
              </TextField>
            </>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            borderBottom: "24px solid rgba(37,44,51,0.08)",
            padding: "24px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: below700 ? "column" : "row",
              justifyContent: "space-between",
              height: below700 ? "auto" : "45px",

              alignItems: below700 ? "flex-start" : "center",
            }}
          >
            {below700 ? (
              <Typography
                color={"grey"}
                sx={{
                  fontSize: "14px",
                }}
              >
                Price
              </Typography>
            ) : (
              <Typography sx={{ fontSize: "16px" }}>Price</Typography>
            )}

            <TextField
              name="price"
              error={formErrors.priceError}
              helperText={formErrors.priceError ? "Fill in price" : null}
              onChange={(e) => handleChange(e)}
              fullWidth={below700 ? true : false}
              sx={{ padding: "4px", width: below700 ? "100%" : "50%" }}
              placeholder="Please enter a price"
              id="standard-basic"
              variant="standard"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$ USD</InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            backgroundColor: "rgba(37,44,51,0.08)",
            justifyContent: "flex-end",
          }}
        >
          <Button
            onClick={handleProductUpload}
            disableElevation
            disableRipple
            variant="contained"
            sx={{
              width: below700 ? "100%" : "70px",
              backgroundColor: "#007782",
              "&:hover": {
                bgcolor: "#007782",
              },
            }}
          >
            Upload
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
