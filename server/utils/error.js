export const handleError = (statusCode, errorMessage) => {
  const error = new Error();
  error.statusCode = statusCode || 500;
  error.message = errorMessage || "Internal server error";
  return error;
};
