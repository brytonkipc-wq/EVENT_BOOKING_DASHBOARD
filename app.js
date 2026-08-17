const welcomeMessage = document.getElementById('welcome-msg');
welcomeMessage.innerText = "Select your preferred sessions below.";
const filterButtons = document.querySelectorAll('.filter-buttons');
const eventCards = document.querySelectorAll('.event-card');
const eventsContainer = document.getElementById('events-container');
const ticketCount = document.getElementById('ticket-count');
const subtotalPrice = document.getElementById('subtotal-price');
const totalPrice = document.getElementById('total-price');
const checkoutButton = document.getElementById('checkout-btn');

eventsContainer.addEventListener('click', (event) => {
    // Check if the clicked element is a book button
    if (event.target.matches('.book-btn')) {
        const bookBtn = event.target;
        const card = bookBtn.closest('.event-card');

        // Toggle card selected state
        card.classList.toggle('selected');

        // Toggle button styling
        bookBtn.classList.toggle('booked');

        // Toggle button text label
        if (card.classList.contains('selected')) {
            bookBtn.innerText = 'Cancel Booking';
        } else {
            bookBtn.innerText = 'Book Ticket';
        }

        // Recalculate cart state
        updateCartSummary();
    }
});

function updateCartSummary() {
    let count = 0;
    let total = 0;

    // Loop through cards to check selection state
    eventCards.forEach(card => {
        if (card.classList.contains('selected')) {
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
        checkoutButton.removeAttribute('disabled');
    } else {
        checkoutButton.setAttribute('disabled', 'true');
    }
}

filterButtonsContainer.addEventListener('click', (event) => {
    // 1. Check if a filter button was clicked
    if (event.target.matches('.filter-buttons')) {
        const selectedBtn = event.target;

        // 2. Remove .active class from all buttons, add to the clicked button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        selectedBtn.classList.add('active');

        // 3. Read dataset.category from the clicked button
        const categoryFilter = selectedBtn.dataset.category;

        // 4. Filter .event-card elements
        eventCards.forEach(card => {
            const cardCategory = card.dataset.category;

            if (categoryFilter === 'all' || cardCategory === categoryFilter) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    }
});