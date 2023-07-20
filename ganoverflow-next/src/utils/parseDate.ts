export const parseDate = (date: string) => {
  if (new Date(date).getFullYear != new Date().getFullYear) {
    return date.slice(0, 10) + " " + date.slice(11, 16);
  } else {
    return date.slice(5, 10) + " " + date.slice(11, 16);
  }
};

export const parseDateWithSeconds = (date: string) => {
  if (new Date(date).getFullYear != new Date().getFullYear) {
    return date.slice(0, 10) + " " + date.slice(11, 19);
  } else {
    return date.slice(5, 10) + " " + date.slice(11, 19);
  }
};
