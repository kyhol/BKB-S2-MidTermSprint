// Banner begins being fixed and hovering over the top of the page when the user scrolls.
document.addEventListener("DOMContentLoaded", function () {
  const banner = document.querySelector(".bannertop");
  const bannerOffsetTop = banner.offsetTop;

  window.addEventListener("scroll", function () {
    if (window.scrollY > bannerOffsetTop) {
      banner.classList.add("fixed");
    } else {
      banner.classList.remove("fixed");
    }
  });
});

//CART COUNT
document.addEventListener("DOMContentLoaded", function () {
  // I want to get the cart from local storage, find out how many items are on it and append the number to the cart button in the header
  const cart = JSON.parse(localStorage.getItem("cart"));
  let cartCount = 0;
  if (cart) {
    cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  }
  document.getElementById("cart-count").innerText = cartCount;
});
