function orderAlert(msg, gfg) {
  var confirmBox = document.getElementById("orderContainer");

  confirmBox.querySelector("#message").textContent = msg;

  confirmBox.querySelector("#closeButton").onclick = function () {
    confirmBox.style.display = "none";
  };

  confirmBox.style.display = "flex";
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const nameInput = document.getElementById("name");
  const addrInput = document.getElementById("address");
  const phoneInput = document.getElementById("phone");
  const emailInput = document.getElementById("email");
  const cardInput = document.getElementById("card");
  const cvvInput = document.getElementById("cvv");
  const expDateInput = document.getElementById("expdate");
  const nowRadio = document.getElementById("now");
  const laterRadio = document.getElementById("later");
  const orderTimeInput = document.getElementById("ordertime");

  document.getElementById("feedMe").addEventListener("click", function (event) {
    event.preventDefault();
    let valid = true;

    // Validations
    const namePattern = /^[a-zA-Z\s]+$/;
    if (!namePattern.test(nameInput.value)) {
      valid = false;
      alert("Name contains invalid characters.");
    }

    if (addrInput.value === "") {
      valid = false;
      alert("Address cannot be empty.");
    }

    const phonePattern = /^\d{10}$/;
    if (!phonePattern.test(phoneInput.value)) {
      valid = false;
      alert("Phone number must be 10 digits.");
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value)) {
      valid = false;
      alert("Email must be valid.");
    }

    const cardPattern = /^\d{16}$/;
    if (!cardPattern.test(cardInput.value)) {
      valid = false;
      alert("Card number must be 16 digits.");
    }

    const cvvPattern = /^\d{3}$/;
    if (!cvvPattern.test(cvvInput.value)) {
      valid = false;
      alert("CVV must be 3 digits.");
    }

    const expDate = new Date(expDateInput.value);
    const today = new Date();
    if (expDate < today) {
      valid = false;
      alert("Expiry date cannot be in the past.");
    }

    if (laterRadio.checked) {
      const orderTime = new Date(orderTimeInput.value);
      if (orderTime < today) {
        valid = false;
        alert("Order time cannot be in the past.");
      }
    }

    if (valid) {
      orderAlert(
      "Thank you for your order!\nHang tight, Gary is getting your goodies\nready to GO!",
      function () {
        console.log("Alert confirmed");
        localStorage.removeItem("cart");
      }
      );
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  function renderCart() {
    const data = localStorage.getItem("cart");
    const orderInnerHtml = document.getElementById("orderinnerhtml");
    orderInnerHtml.innerHTML = ""; // Clear previous content

    if (data) {
      const cartItems = JSON.parse(data);
      let subTotal = 0;
      for (let i = 0; i < cartItems.length; i++) {
        let item = cartItems[i]["name"];
        let price = cartItems[i]["price"];
        let quantity = cartItems[i]["quantity"];
        let itemTotal = price * quantity;
        subTotal += itemTotal;
        orderInnerHtml.innerHTML += `
        <div class="orderItem">  
          <div class="itemname">
            <p>${item}:</p>
          </div>
          <div class="quantity-and-cost">
           <div class="itemtotal">
          <div>
            <p>\$${price.toFixed(2)}</p>
          </div>
          <div>
            <p>&nbsp;x </p>
          </div>
        </div> 
        <div class="buttons">
          <div>
          <button class="decrement" data-index="${i}">
            <img src="../Images/OrderPics/sub.svg" alt="-">
          </button>
          </div>
            <div><p>${quantity}</p></div>
            <div>
            <button class="increment" data-index="${i}">
            <img src="../Images/OrderPics/add.svg" alt="+">
            </button></div></div>
            <div class="itemtotal"><div><p>  = &nbsp;</p></div><div><p>\$${itemTotal.toFixed(2)}</p>
            </div>
            </div>
          </div>
        </div>
        `;
      }
      orderInnerHtml.innerHTML += `
        <hr>
        <div class="order-cost-info">
          <p>Subtotal: <span>$${subTotal.toFixed(2)}</span> </p>
          <p>Tax: <span>$${(subTotal * 0.15).toFixed(2)}</span></p>
          <p>Total: <span>$${(subTotal * 1.15).toFixed(2)}</span></p>
        </div>

      `;
    } else {
      orderInnerHtml.innerHTML =
        "<p>Why don't you treat yourself to one of Gary's special treats?</p>";
    }

    // Attach event listeners to increment and decrement buttons
    const incrementButtons = document.querySelectorAll(".increment");
    incrementButtons.forEach((button) => {
      button.addEventListener("click", function () {
        updateQuantity(this.dataset.index, 1);
      });
    });

    const decrementButtons = document.querySelectorAll(".decrement");
    decrementButtons.forEach((button) => {
      button.addEventListener("click", function () {
        updateQuantity(this.dataset.index, -1);
      });
    });
  }

  function updateQuantity(index, change) {
    // Retrieve the cart from localStorage
    let cartItems = JSON.parse(localStorage.getItem("cart"));

    // Update the quantity
    cartItems[index].quantity += change;

    // Ensure quantity doesn't go below 1
    if (cartItems[index].quantity < 1) {
      cartItems.splice(index, 1);
    }

    // Save the updated cart back to localStorage
    localStorage.setItem("cart", JSON.stringify(cartItems));

    // Re-render the cart items
    renderCart();
  }
  renderCart();
});
