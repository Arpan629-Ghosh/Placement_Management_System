export const formatDate = (date) => {
  if (!date) return "";

  return new Date(date).toLocaleDateString("en-IN", {
    month: "short",
    year: "numeric",
  });
};
