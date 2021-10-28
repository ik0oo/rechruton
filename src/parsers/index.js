export const parseDropdownData = (data) => {
  return data.summary.names.filter((item) => item).map((label, id) => ({ label, id }));
};