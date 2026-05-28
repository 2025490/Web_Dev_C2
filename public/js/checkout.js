// Load the order summary from the cart when the page opens
// This fetches the cart items from MySQL to show what the user is buying
function loadOrderSummary() {
    fetch("/api/cart")
        .then(function(response) {
            return response.json();
        })
        .then(function(items) {
            const summary = document.getElementById("checkout-summary");
            const totalElement = document.getElementById("checkout-total");

            // If cart is empty, warn the user
            if (items.length === 0) {
                summary.innerHTML = "<p>Your cart is empty. <a href='products.html'>Browse games</a></p>";
                return;
            }

            // Calculate total and display each item in the order summary
            let total = 0;
            let html = "";

            items.forEach(function(item) {
                total += parseFloat(item.price);
                html += `<p>${item.name} — €${parseFloat(item.price).toFixed(2)}</p>`;
            });

            summary.innerHTML = html;
            totalElement.textContent = "€" + total.toFixed(2);
        });
}

// Validate the checkout form and place the order
// Shows inline error messages next to each field instead of using alert()
// This fixes the validation issue flagged in CA1 feedback
function placeOrder() {
    // Get the values from each input field
    const fullname = document.getElementById("fullname").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;
    const card = document.getElementById("card").value;

    // Clear all previous error messages before validating again
    document.getElementById("fullname-error").textContent = "";
    document.getElementById("email-error").textContent = "";
    document.getElementById("address-error").textContent = "";
    document.getElementById("card-error").textContent = "";

    // Pattern to check that name contains only letters and spaces
    const namePattern = /^[A-Za-z\s]+$/;

    // Pattern to check that email is in a valid format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Pattern to check that card number contains only 16 digits
    const cardPattern = /^[0-9]{16}$/;

    let valid = true;

    // Validate full name field
    if (fullname === "") {
        document.getElementById("fullname-error").textContent = "Please enter your full name.";
        valid = false;
    } else if (!namePattern.test(fullname)) {
        document.getElementById("fullname-error").textContent = "Name must contain letters only.";
        valid = false;
    }

    // Validate email field
    if (email === "") {
        document.getElementById("email-error").textContent = "Please enter your email address.";
        valid = false;
    } else if (!emailPattern.test(email)) {
        document.getElementById("email-error").textContent = "Please enter a valid email address.";
        valid = false;
    }

    // Validate address field
    if (address === "") {
        document.getElementById("address-error").textContent = "Please enter your delivery address.";
        valid = false;
    }

    // Validate card number field
    if (card === "") {
        document.getElementById("card-error").textContent = "Please enter your card number.";
        valid = false;
    } else if (!cardPattern.test(card)) {
        document.getElementById("card-error").textContent = "Card number must be 16 digits.";
        valid = false;
    }

    // If all fields are valid, show success message
    if (valid) {
        document.getElementById("order-success").textContent = "Order placed successfully! Thank you for your purchase.";
    }
}

// Load the order summary when the page opens
loadOrderSummary();