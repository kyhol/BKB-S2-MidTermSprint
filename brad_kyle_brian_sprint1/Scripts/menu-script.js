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
        </div>
      `;
        });

        // Addons HTML
        let addonsHtml = "";
        if (menuData.addons && menuData.addons.length > 0) {
          addonsHtml += `
        <div class="menu-card">
          <h2>Addons</h2>
          <ul class="addon-card">
      `;
          menuData.addons.forEach((addon) => {
            addonsHtml += `
          <li>${addon.addon_name} - $ ${addon.price.toFixed(2)}</li>
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
  
        ${html} <!-- Menu items -->
  
        ${addonsHtml} <!-- Addons (conditionally added) -->
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
    })
    .catch((error) => {
      console.error("Error fetching menu:", error);
    });
});
