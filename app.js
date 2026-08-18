const welcomeMessage = document.getElementById("welcome-msg");
welcomeMessage.innerText = "Select your preferred sessions below.";
const filterButtons = document.querySelectorAll(".filter-btn");
const eventCards = document.querySelectorAll(".event-card");
const eventsContainer = document.getElementById("events-container");
const ticketCount = document.getElementById("ticket-count");
const subtotalPrice = document.getElementById("subtotal-price");
const totalPrice = document.getElementById("total-price");
const checkoutButton = document.getElementById("checkout-btn");

eventsContainer.addEventListener("click", (event) => {
  // Check if the clicked element is a book button
  if (event.target.matches(".book-btn")) {
    const bookBtn = event.target;
    const card = bookBtn.closest(".event-card");

    // Toggle card selected state
    card.classList.toggle("selected");

    // Toggle button styling
    bookBtn.classList.toggle("booked");

    // Toggle button text label
    if (card.classList.contains("selected")) {
      bookBtn.innerText = "Cancel Booking";
    } else {
      bookBtn.innerText = "Book Ticket";
    }

    // Recalculate cart state
    updateCartSummary();
  }
});

function updateCartSummary() {
  let count = 0;
  let total = 0;

  // Loop through cards to check selection state
  eventCards.forEach((card) => {
    if (card.classList.contains("selected")) {
      count++;
      total += Number(card.dataset.price);
    }
  });

  // Update UI Elements
  ticketCount.innerText = count;
  subtotalPrice.innerText = total;
  totalPrice.innerText = total;

  // Enable/Disable Checkout Button
  if (count > 0) {
    checkoutButton.removeAttribute("disabled");
  } else {
    checkoutButton.setAttribute("disabled", "true");
  }
}

filterButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    // Remove active from all buttons
    filterButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    // Add active to the clicked button
    event.currentTarget.classList.add("active");

    selected_filter = event.currentTarget.dataset.category;
    eventCards.forEach((card) => {
card_category = card.dataset.category;
if(card_category===selected_filter){
    card.style.display="block"
}
else if(selected_filter === "all"){
    card.style.display = "block";
}
else {
card.style.display = "none";
}
      //   // alert("You clicked: "+ event.currentTarget.innerText +"===" +card.querySelector(".badge").innerText)
      //   if (card.querySelector(".badge").innerText === filter) {
      //     card.style.display = "block";
      //   } else if (filter === "All") {
      //     card.style.display = "block";
      //   } else {
      //     card.style.display = "none";
      //   }
    });
  });
});
