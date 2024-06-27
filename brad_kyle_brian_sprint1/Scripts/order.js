function orderAlert(msg) {
  var confirmBox = document.getElementById("orderContainer");

  confirmBox.querySelector("#message").textContent = msg;

  confirmBox.querySelector("#closeButton").onclick = function () {
    confirmBox.style.display = "none";
    localStorage.removeItem("cart");
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
        "Thank you for your order!\nHang tight, Gary is getting your goodies\nready to GO!"
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
      let tip = 0;
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
              <div>
                <p>${quantity}</p>
              </div>
              <div>
                <button class="increment" data-index="${i}">
                  <img src="../Images/OrderPics/add.svg" alt="+">
                </button>
              </div>
            </div>
            <div class="itemtotal">
              <div>
                <p>  = &nbsp;</p>
              </div>
              <div>
                <p>\$${itemTotal.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
        `;
      }

      function updateTipAndTotal() {
        const tipType = document.querySelector('input[name="tip"]:checked').value;
        let tip = 0;
        if (tipType === 'percent') {
          const percentValue = document.querySelector('input[name="percent"]:checked').value;
          tip = (subTotal * percentValue) / 100;
        } else if (tipType === 'amount') {
          const fixedAmount = document.getElementById('fixedAmount').value;
          if (!isNaN(fixedAmount) && fixedAmount.trim() !== '') {
            tip = parseFloat(fixedAmount);
          } else {
            tip = 0;
          }
        }
        document.querySelector(".order-cost-info span.tip-amount").textContent = `$${tip.toFixed(2)}`;
        document.querySelector(".order-cost-info span.total-amount").textContent = `$${((subTotal * 1.15) + tip).toFixed(2)}`;
      }

      orderInnerHtml.innerHTML += `
        <div class="order-cost-info">
          <p>Subtotal:&nbsp;<span>$${subTotal.toFixed(2)}</span> </p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tax:&nbsp;<span>$${(subTotal * 0.15).toFixed(2)}</span></p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tip:&nbsp;<span class="tip-amount">$${tip.toFixed(2)}</span></p>
          <hr>
          <p>&nbsp;&nbsp;&nbsp;Total:&nbsp;<span class="total-amount">$${((subTotal * 1.15) + tip).toFixed(2)}</span></p>
        </div>
      `;

      // Attach event listeners to tip inputs
      document.querySelectorAll('input[name="tip"], input[name="percent"], #fixedAmount').forEach(input => {
        input.addEventListener('change', updateTipAndTotal);
        input.addEventListener('input', updateTipAndTotal);
      });

      updateTipAndTotal();

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

    // Update the cart count
    const cartCount2 = cartItems.reduce((total, item) => total + item.quantity, 0);
    document.getElementById("cart-count").innerText = cartCount2;

    // Re-render the cart items
    renderCart();
  }
  renderCart();
});
