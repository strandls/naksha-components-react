export const formatDate = (date) => {
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 101).toString().substring(1);
  const day = (date.getDate() + 100).toString().substring(1);
  return `${year}-${month}-${day}`;
};
