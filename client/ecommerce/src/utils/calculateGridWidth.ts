import { ProductWithImageAndUser } from "../types/types";

export const calculateGridWidth = (
  products: ProductWithImageAndUser[] | undefined,
  below600?: boolean,
  below700?: boolean,
  below1050?: boolean,
  below1200?: boolean
) => {
  const totalProducts = products?.length;

  //   }
  if (below600) {
    if (totalProducts === 1) {
      return 12;
    } else {
      return 6;
    }
  } else if (below700) {
    if (totalProducts! > 4) {
      return 6;
    } else if (totalProducts === 1) {
      return 12;
    } else {
      return 6;
    }
  } else if (below1050) {
    if (totalProducts == 2) {
      return 6;
    } else if (totalProducts == 1) {
      return 12;
    } else {
      return 4;
    }
  } else if (below1200) {
    if (totalProducts === 2) {
      return 6;
    } else if (totalProducts === 3) {
      return 4;
    } else if (totalProducts === 1) {
      return 12;
    }
    return 4;
  } else {
    if (totalProducts === 3) {
      return 4;
    } else if (totalProducts === 2) {
      return 4;
    } else if (totalProducts === 1) {
      return 12;
    } else {
      return 3;
    }
  }
};
