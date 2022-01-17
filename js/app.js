window.addEventListener(
  "scroll",
  () => {
      const scrollOffset = window.pageYOffset / (document.body.offsetHeight - window.innerHeight)
      console.log("ScrollOffset ", scrollOffset)
    document.body.style.setProperty(
      "--scroll",
        scrollOffset
    );
  },
  false
);

