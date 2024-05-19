/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  CardMedia,
  Input,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { ChangeEvent, useEffect, useState } from "react";
import { addProduct } from "../../api/axios";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Redirect } from "wouter";
import { useUserContext } from "../../contexts/UserContext";
import { useAddAdminNotification } from "../../hooks/useAddAdminNotification";

//important note --------------
// change button component prop to label if you want to upload files

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
  const [selectedFile, setSelectedFile] = useState<File | "">("");
  const formDataToBackend = new FormData();
  const [success, setSuccess] = useState(false);
  const { user } = useUserContext();
  const productMutation = useMutation({
    mutationFn: addProduct,
    mutationKey: ["products/upload"],
    onSuccess: () => {
      setSuccess(true);
      toast.success("Product added");
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message);
    },
  });
  const adminNotificationMutation = useAddAdminNotification();
  const { mutate: mutateAdminNotification } = adminNotificationMutation;
  const { mutate } = productMutation;
  const handlePhotoInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const uploadedFiles = (e.target as HTMLInputElement).files;
    if (!uploadedFiles) {
      return;
    }
    const file = uploadedFiles[0];
    setSelectedFile(file);
    setFormErrors({ ...formErrors, photoError: false });
  };
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
    photoError: false,
  });

  useEffect(() => {
    if (success) {
      mutateAdminNotification({
        username: user.username,
        action: `added new product ${formData.title} for ${formData.price} USD `,
        createdAt: "",
      });
    }

    return () => {
      setSuccess(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  const handleFormChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [`${name}Error`]: false });
  };

  const handleProductUpload = async () => {
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
    if (!selectedFile) {
      errors.photoError = true;
      hasErrors = true;
    }

    if (hasErrors) {
      setFormErrors(errors);
      return;
    }
    formDataToBackend.append("file", selectedFile);
    formDataToBackend.append("data", JSON.stringify(formData));

    mutate(formDataToBackend);
    // mutateAdminNotification({
    //   username: user.username,
    //   action: `added new product ${formData.title} for ${formData.price} USD `,
    //   createdAt: "",
    // });
  };
  const below700 = useMediaQuery(700);
  if (success) {
    return <Redirect to="/" />;
  }
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
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            borderBottom: "24px solid rgba(37,44,51,0.08)",
            minHeight: "170px",
          }}
        >
          <Typography
            color={"grey"}
            sx={{
              fontSize: "14px",
            }}
          >
            Add one photo
          </Typography>

          <Box
            sx={{
              border: "1px dashed rgba(37,44,51,0.1)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "170px",
              width: "100%",
            }}
          >
            <Box sx={{ marginRight: selectedFile ? "auto" : "" }}>
              <CardMedia
                component="img"
                height="150px"
                image={selectedFile ? URL.createObjectURL(selectedFile) : ""}
              />
            </Box>
            <Button
              component="label"
              disableElevation
              startIcon={!selectedFile ? <AddIcon /> : ""}
              disableRipple
              sx={{
                alignItems: "center",
                padding: "14px",
                textTransform: "none",
                fontSize: "14px",
                color: "#007782",
                border: "1px solid #007782",
              }}
            >
              <Typography sx={{ fontSize: "16px" }}>
                {selectedFile ? <AddIcon /> : "Upload photo"}
              </Typography>
              <Input
                id="upload-photo"
                name="upload-photo"
                type="file"
                style={{ display: "none" }}
                onChange={(e) => handlePhotoInputChange(e)}
              />
            </Button>
            {/* <label htmlFor="upload-photo">
                <input
                  name="upload-photo"
                  id="upload-photo"
                  type="file"
                  style={{ display: "none" }}
                />
              </label> */}
          </Box>
          {formErrors.photoError ? (
            <Typography color="error" fontSize={"14px"}>
              Please upload a photo
            </Typography>
          ) : (
            ""
          )}
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
              spellCheck={false}
              value={formData.title}
              onChange={(e) => handleFormChange(e)}
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
            onChange={handleFormChange}
            spellCheck={false}
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
                spellCheck={false}
                id="standard-select-currency4"
                select
                error={formErrors.categoryError}
                helperText={
                  formErrors.categoryError ? "Fill in category" : null
                }
                defaultValue={""}
                label={formData.category ? "" : "Select a category"}
                onChange={handleFormChange}
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
                spellCheck={false}
                error={formErrors.categoryError}
                helperText={
                  formErrors.categoryError ? "Fill in category" : null
                }
                defaultValue={""}
                label={formData.category ? "" : "Select a category"}
                variant="standard"
                onChange={handleFormChange}
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
                onChange={handleFormChange}
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
                onChange={handleFormChange}
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
              onChange={(e) => handleFormChange(e)}
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
