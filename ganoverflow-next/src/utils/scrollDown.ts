const scrollDown = (scrollRef: any) => {
  if (scrollRef.current) {
    scrollRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }
};

export default scrollDown;
