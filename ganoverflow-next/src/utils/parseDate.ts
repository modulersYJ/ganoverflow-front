export const parseDate = (date: string) => {
  if (new Date(date).getFullYear != new Date().getFullYear) {
    return date?.slice(0, 10) + " " + date?.slice(11, 16);
  } else {
    return date?.slice(5, 10) + " " + date?.slice(11, 16);
  }
};

export const parseDateWithSeconds = (date: string) => {
  if (new Date(date).getFullYear != new Date().getFullYear) {
    return date?.slice(0, 10) + " " + date?.slice(11, 19);
  } else {
    return date?.slice(5, 10) + " " + date?.slice(11, 19);
  }
};

// ====
type Locale = "en-US" | "ko-KR";

export const parseDateYMDWithLocale = (
  date: string,
  locale: Locale = "en-US"
) => {
  const dateObject = new Date(date);

  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return dateObject.toLocaleDateString(locale, options);
};

export const formatTimeDifference = (
  timestamp: string,
  locale: Locale = "en-US"
) => {
  const currentTime = new Date();
  const targetTime = new Date(timestamp);
  const timeDifference = currentTime.getTime() - targetTime.getTime();

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (locale === "ko-KR") {
    if (seconds < 60) {
      return `${seconds}초 전`;
    }
    if (minutes < 60) {
      return `${minutes}분 전`;
    }
    if (hours < 24) {
      return `${hours}시간 전`;
    }
    return `${days}일 전`;
  } else {
    if (seconds < 60) {
      return `${seconds} seconds ago`;
    }
    if (minutes < 60) {
      return `${minutes} minutes ago`;
    }
    if (hours < 24) {
      return `${hours} hours ago`;
    }
    return `${days} days ago`;
  }
};
