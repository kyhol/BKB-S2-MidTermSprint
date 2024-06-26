// Description: Javascript for the home page of the mid-term sprint project. "Gary Blue's Diner".
// Name(s): Kyle Hollett Brian Janes Brad Avery
// Date Created: 2024-06-17
// Date content done: 2024-06-20
// Date polish finished: 2024-06-27

var index = 0;

show_image(index); // Function to display the image carousel on the home page. with the dots at the bottom to show which image is currently being displayed. It goes left and right one, with the images hidden unless you press the onclick button hard coded in the html.

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

    images[index].style.display = "flex";
    dots[index].className += " active";
  }
  var index1 = 0;
  var index2 = 0;

  showImage("review1", index1);

  function showImage(carouselId, i) {
    //Image carousel function copied and edited from above.
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

    images[carouselId === "review1" ? index1 : index2].style.display = "flex";
  }

  images[carouselId === "review1" ? index1 : index2].style.display = "flex";
}

document.addEventListener('DOMContentLoaded', function () { // display list of hours of operation, address, contact, and details.
    fetch('../Data/restaurant_data.json') //fetch from .json file I created. 
        .then(response => {
            if (!response.ok) {
                throw new Error('Response failed'); //No errors!
            }
            return response.json();
        })
        .then(data => {
            console.log('Data fetched successfully:', data); // Log the fetched data

      const restaurant = data.restaurant;
      const addressElement = document.getElementById("address");
      const contactElement = document.getElementById("contact");
      const hoursOfOperationElement =
        document.getElementById("hours_of_operation");
      const detailsElement = document.getElementById("details");

      // Display the address
      const address = restaurant.address;
      addressElement.textContent = `${address.street}, ${address.city}, ${address.province}, ${address.country}, ${address.postal_code}`;

      // Display the contact
      contactElement.textContent = `Phone: ${restaurant.contact.phone}`;

      // Display the hours of operation
      const hoursOfOperation = restaurant.hours_of_operation;
      for (const day in hoursOfOperation) {
        const openHours = hoursOfOperation[day].open;
        const closeHours = hoursOfOperation[day].close;

        let hoursText;
        if (Array.isArray(openHours)) {
          hoursText = `${day}: ${openHours[0]} - ${closeHours[0]}, ${openHours[1]} - ${closeHours[1]}`;
        } else {
          hoursText = `${day}: ${openHours} - ${closeHours}`;
        }

        const listItem = document.createElement("li");
        listItem.textContent = hoursText;
        hoursOfOperationElement.appendChild(listItem);
      }

      // Display the details
      const details = restaurant.details.services;
      details.forEach((detail) => {
        const listItem = document.createElement("li");
        listItem.textContent = detail;
        detailsElement.appendChild(listItem);
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
});

document.addEventListener("DOMContentLoaded", () => {
  //function used in conjunction with CSS to animate the letters starting on the left and going through to the right at .2s intervals
  const letters = document.querySelectorAll(".letter");
  letters.forEach((letter, index) => {
    setTimeout(() => {
      letter.classList.add("animate");
    }, index * 200);
  });
});

  //Cycles through 3 images in the deliverMenuContainer div every 5 seconds.
  document.addEventListener("DOMContentLoaded", function () {
    const deliverMenuContainer = document.querySelector(
      ".deliverMenuContainer"
    );
    const image = document.createElement("img"); // Create an img element
    deliverMenuContainer.appendChild(image); // Append the img element to the container

    const imagePaths = [
      "../Images/MenuAd/MenuAd.svg",
      "../Images/MenuAd/MenuAd2.svg",
      "../Images/MenuAd/MenuAd3.svg",
    ];
    let currentIndex = 0;

    function showNextImage() {
      image.classList.remove("active"); // Remove the active class to start the fade-out transition

      setTimeout(() => {
        image.src = imagePaths[currentIndex]; // Change the image source
        image.classList.add("active"); // Add the active class to start the fade-in transition
        currentIndex = (currentIndex + 1) % imagePaths.length; // Wrap around using modulo
      }, 1000); // Wait for the fade-out transition to complete
    }

    setInterval(showNextImage, 5000); // 5 seconds interval to show the next image
    showNextImage(); // Show the first image immediately
});

// fetch('../Data/restaurant_data.json')
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Response failed');
//         }
//         return response.json();
//     })
//     .then(data => {
//         console.log('Data fetched successfully:', data); // Log the fetched data

//         // Your existing code for displaying the JSON data
//     })
//     .catch(error => console.error('Error fetching data:', error)); // Log any errors that occur during the fetch
