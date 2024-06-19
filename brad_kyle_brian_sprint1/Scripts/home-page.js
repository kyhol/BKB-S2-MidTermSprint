var index = 0;

show_image(index);

function show_image(i) {
  index += i;

  var images = document.getElementsByClassName("foodImage");
  var dots = document.getElementsByClassName("dot");

  for (var j = 0; j < images.length; j++) {
    images[j].style.display = "none";
  }

  for (var j = 0; j < dots.length; j++) {
    dots[j].className = dots[j].className.replace(" active", "");
  }

  if (index > images.length - 1) {
    index = 0;
  }
  if (index < 0) {
    index = images.length - 1;
  }

  images[index].style.display = "flex";
  dots[index].className += " active";
}
var index1 = 0;
var index2 = 0;

showImage("review1", index1);
showImage("review2", index2);

function showImage(carouselId, i) {
  if (carouselId === "review1") {
    index1 += i;
    var images = document
      .getElementById("slider-container1")
      .getElementsByClassName("reviewPics");
    var dots = document
      .getElementById("slider-container1")
      .getElementsByClassName("dot");
  }

  for (var j = 0; j < images.length; j++) {
    images[j].style.display = "none";
  }

  for (var j = 0; j < dots.length; j++) {
    dots[j].className = dots[j].className.replace(" active", "");
  }

  if (carouselId === "review1" && index1 > images.length - 1) {
    index1 = 0;
  }
  if (carouselId === "review1" && index1 < 0) {
    index1 = images.length - 1;
  }
  if (carouselId === "review2" && index2 > images.length - 1) {
    index2 = 0;
  }
  if (carouselId === "review2" && index2 < 0) {
    index2 = images.length - 1;
  }

  images[carouselId === "review1" ? index1 : index2].style.display = "flex";
  dots[carouselId === "review1" ? index1 : index2].className += " active";
}
