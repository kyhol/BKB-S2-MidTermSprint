window.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded and parsed: MENU PAGE");

  // Fetching menu items from the data folder & parsing the JSON.
  fetch("../Data/menu.json")
    .then((response) => response.json())
    .then((data) => {
      const menus = data.menu;

      // Function to generate HTML for each menu section
      function generateMenuHTML(menuData) {
        let html = "";

        // Iterate over menu items
        menuData.items.forEach((item) => {
          html += `
            <div class="menu-card">
              <div class="name-and-price">
                <h4>${item.item_name}</h4>
                <span>$ ${item.price.toFixed(2)}</span>
              </div>
              <div class="image_desc">
                <img src="${item.src}" alt="${
            item.item_name
          }" class="menu-card-img" />
                <p>${item.description}</p>
              </div>
              <button class="add-to-cart-btn"
                data-itemName="${item.item_name}"
                data-price="${item.price.toFixed(2)}"
                data-type="menu"
              >Add ${item.item_name} to Cart</button>
            </div>
          `;
        });

        // Addons HTML
        let addonsHtml = "";
        if (menuData.addons && menuData.addons.length > 0) {
          addonsHtml += `
            <div class="addon-card" id="addon-card">
              <h3>Addons</h3>
              <ul>
          `;
          menuData.addons.forEach((addon) => {
            addonsHtml += `
              <li>
                <span>${addon.addon_name} - $ ${addon.price.toFixed(2)}</span>
                <button class="add-to-cart-btn"
                  data-itemName="${addon.addon_name}"
                  data-price="${addon.price.toFixed(2)}"
                  data-type="addon"
                >Add to Cart</button>
              </li>
            `;
          });
          addonsHtml += `
              </ul>
            </div>
          `;
        }

        // Construct section HTML with subheader, time, items, and addons
        html = `
          <div class="menu-section">
            <div class="menu-section-info">
              <h2>${menuData.menu_name}</h2>
              <h3>${menuData.subHeader}</h3>
              ${menuData.time ? `<span>${menuData.time}</span>` : ""}
            </div>
      
            ${html}
      
            ${addonsHtml}
          </div>
        `;

        return html;
      }

      // Append menu sections to the DOM
      const menuContainer = document.querySelector("#main-div");

      // Append Breakfast section
      menuContainer.innerHTML += generateMenuHTML(menus.breakfast);

      // Append Lunch section
      menuContainer.innerHTML += generateMenuHTML(menus.lunch);

      // Append Dinner section
      menuContainer.innerHTML += generateMenuHTML(menus.dinner);

      // Append Dessert section
      menuContainer.innerHTML += generateMenuHTML(menus.dessert);

      // Function to add item to cart and store in localStorage
      function addToCart(name, price, type) {
        // Check if cart exists in localStorage
        let cart = localStorage.getItem("cart");
        if (cart === null) {
          // If cart does not exist, initialize it as an empty array
          cart = [];
        } else {
          // Parse existing cart items from localStorage
          cart = JSON.parse(cart);
        }

        // Check if the item already exists in the cart
        const existingItem = cart.find(
          (item) => item.name === name && item.type === type
        );
        if (existingItem) {
          // If item exists, increase its quantity
          existingItem.quantity++;
        } else {
          // If item does not exist, add it to the cart
          cart.push({
            name: name,
            price: price,
            type: type,
            quantity: 1, // Initialize quantity as 1 for new items
          });
        }

        // Store updated cart back into localStorage
        localStorage.setItem("cart", JSON.stringify(cart));

        // Show notification popup
        showPopup(`${name} added to cart!`);
      }

      // Event delegation to handle "Add to Cart" button clicks
      menuContainer.addEventListener("click", function (event) {
        if (event.target.classList.contains("add-to-cart-btn")) {
          const button = event.target;
          const itemName = button.dataset.itemname;
          const price = parseFloat(button.dataset.price);
          const type = button.dataset.type;

          addToCart(itemName, price, type);
        }
      });

      // Function to show popup notification
      function showPopup(message) {
        const popup = document.getElementById("cart-notification");
        popup.textContent = message; // Update the popup message
        popup.classList.add("show"); // Add the show class to make it visible

        // Hide the popup after 3 seconds
        setTimeout(() => {
          popup.classList.remove("show");
        }, 3000);
      }
    })
    .catch((error) => {
      console.error("Error fetching menu:", error);
    });
});
