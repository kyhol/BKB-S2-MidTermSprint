// Description:
// Name(s): Kyle Hollett Brian Janes Brad Avery
// Date Created: 2024-06-17
// Date finished: 2024-06-21?

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

showImage('review1', index1);

function showImage(carouselId, i) {
    if (carouselId === 'review1') {
        index1 += i;
        var images = document.getElementById('slider-container1').getElementsByClassName("reviewPics");
        var dots = document.getElementById('slider-container1').getElementsByClassName("dot");
    }

    for (var j = 0; j < images.length; j++) {
        images[j].style.display = "none";
    }

    for (var j = 0; j < dots.length; j++) {
        dots[j].className = dots[j].className.replace(" active", "");
    }

    if (carouselId === 'review1' && index1 > images.length - 1) {
        index1 = 0;
    }
    if (carouselId === 'review1' && index1 < 0) {
        index1 = images.length - 1;
    }

    images[carouselId === 'review1' ? index1 : index2].style.display = "flex";
}


document.addEventListener('DOMContentLoaded', function () {
    fetch('../Data/restaurant_data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Response failed');
            }
            return response.json();
        })
        .then(data => {
            console.log('Data fetched successfully:', data); // Log the fetched data

            const restaurant = data.restaurant;
            const addressElement = document.getElementById('address');
            const contactElement = document.getElementById('contact');
            const hoursOfOperationElement = document.getElementById('hours_of_operation');
            const detailsElement = document.getElementById('details');

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

                const listItem = document.createElement('li');
                listItem.textContent = hoursText;
                hoursOfOperationElement.appendChild(listItem);
            }

            // Display the details
            const details = restaurant.details.services;
            details.forEach(detail => {
                const listItem = document.createElement('li');
                listItem.textContent = detail;
                detailsElement.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
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

document.addEventListener('DOMContentLoaded', () => {
    const letters = document.querySelectorAll('.letter');
    letters.forEach((letter, index) => {
        setTimeout(() => {
            letter.classList.add('animate');
        }, index * 200); // Delay each letter by 100ms
    });
});
