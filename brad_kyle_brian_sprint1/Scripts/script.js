// Banner begins being fixed and hovering over the top of the page when the user scrolls. 
document.addEventListener('DOMContentLoaded', function() {
    const banner = document.querySelector('.bannertop');
    const bannerOffsetTop = banner.offsetTop;
  
    window.addEventListener('scroll', function() {
      if (window.scrollY > bannerOffsetTop) {
        banner.classList.add('fixed');
      } else {
        banner.classList.remove('fixed');
      }
    });
  });
  