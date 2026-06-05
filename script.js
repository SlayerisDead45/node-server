// i am using this array to keep track of what is in the cart
var cartItems = [];
var totalAmount = 0;

// i am doing this to add a service to the cart
function addItem(name, price) {
  cartItems.push({ name: name, price: price });
  totalAmount = totalAmount + price;
  updateCart();
}

// i am doing this to remove a service from the cart
function removeItem(name, price) {
  var index = -1;
  for (var i = 0; i < cartItems.length; i++) {
    if (cartItems[i].name === name) {
      index = i;
      break;
    }
  }
  if (index !== -1) {
    cartItems.splice(index, 1);
    totalAmount = totalAmount - price;
    updateCart();
  } else {
    alert(name + " is not in your cart!");
  }
}

// i am using this function to refresh what shows in the cart
function updateCart() {
  var cartDiv = document.getElementById("cart-items");

  // clear the cart display first
  cartDiv.innerHTML = "";

  if (cartItems.length === 0) {
    cartDiv.innerHTML = '<p id="empty-msg">No items added yet</p>';
    totalAmount = 0;
  } else {
    // i am looping through cart items to show each one
    for (var i = 0; i < cartItems.length; i++) {
      var item = cartItems[i];
      var p = document.createElement("p");
      p.textContent = item.name + " - ₹" + item.price;
      p.style.padding = "5px 0";
      p.style.borderBottom = "1px solid #2a2a2a";
      p.style.color = "#f0f0f0";
      cartDiv.appendChild(p);
    }
  }

  document.getElementById("total").textContent = totalAmount;
}

// i am using emailjs to send the booking email
function bookNow() {
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var phone = document.getElementById("phone").value;

  // i am checking that the user filled all fields
  if (name === "" || email === "" || phone === "") {
    alert("Please fill in all fields!");
    return;
  }

  if (cartItems.length === 0) {
    alert("Please add at least one service to your cart!");
    return;
  }

  // i am building the order summary as a string
  var orderSummary = "";
  for (var i = 0; i < cartItems.length; i++) {
    orderSummary = orderSummary + cartItems[i].name + " - ₹" + cartItems[i].price + "\n";
  }

  // i learned that emailjs needs these parameters to send the email
  var templateParams = {
    from_name: name,
    user_email: email,
    user_phone: phone,
    order_details: orderSummary,
    total_amount: totalAmount
  };

  // i am keeping my existing emailjs keys here
  emailjs.init("agrNY7qKO0HwF4zFY");

  emailjs.send("service_x2ogmxn", "template_eumkl9w", templateParams)
    .then(function () {
      alert("Booking confirmed! Email sent successfully.");
      // i am resetting everything after booking
      cartItems = [];
      totalAmount = 0;
      updateCart();
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("phone").value = "";
    })
    .catch(function (error) {
      alert("Email sending failed. Please try again.");
      console.log("error:", error);
    });
}