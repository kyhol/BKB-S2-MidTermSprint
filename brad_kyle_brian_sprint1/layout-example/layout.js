window.addEventListener("scroll", function () {
  var headerHeight = document.querySelector("header").offsetHeight; // Get the height of the header
  var nav = document.querySelector("nav");

  if (window.scrollY > headerHeight) {
    // If scrolled past the header
    nav.classList.add("fixed-nav");
  } else {
    nav.classList.remove("fixed-nav");
  }
});
