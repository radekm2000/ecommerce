export type ValidationError = {
  type: "validation";
  message: string;
  errors: { path: string[]; message: string }[];
};

export const isValidationError = (
  error: any | Error
): error is ValidationError => {
  return error.type === "validation";
};
