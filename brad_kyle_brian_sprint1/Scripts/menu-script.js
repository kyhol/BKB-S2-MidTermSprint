window.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded and parsed");

  // Fetching menu items from the data folder & parsing the JSON.
  fetch("../Data/menu.json")
    .then((response) => response.json())
    .then((data) => {
      const menu = data.menu;
      let output = "";
      menu.forEach((item) => {
        output += `
                <div class="menu-card">
                    <div class="name-and-price">
                        <h4>${item.item_name}</h4>
                        <span>$ ${item.price}</span>
                    </div>
                    <div class="image_desc">
                        <img src="${item.image}" alt=${item.description} class="menu-card-img" />
                        <p>${item.description}</p>
                    </div>
                </div>
      `;

        document.querySelector("#main-div").innerHTML = output;
      });
    })
    .catch((error) => {
      console.log("ERROR: ", error);
    });
});
