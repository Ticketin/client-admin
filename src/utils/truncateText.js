export const truncateText = (text) => {
  if (text.length <= 160) {
    return text;
  } else {
    return text.substring(0, 160) + "...";
  }
};
