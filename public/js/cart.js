// Load cart items when the page opens
// Fetches all items currently stored in the cart table in MySQL
function loadCart() {
    fetch("/api/cart")
        .then(function(response) {
            return response.json();
        })
        .then(function(items) {
            const container = document.getElementById("cart-container");
            const totalElement = document.getElementById("cart-total");

            // If cart is empty, show a message instead of an empty page
            if (items.length === 0) {
                container.innerHTML = "<p>Your cart is empty. <a href='products.html'>Browse games</a></p>";
                totalElement.textContent = "€0.00";
                return;
            }

            // Calculate the total price of all items in the cart
            let total = 0;
            let html = "";

            // Loop through each cart item and create a row
            items.forEach(function(item) {
                total += parseFloat(item.price);
                html += `
                    <div class="cart-item">
                        <h3>${item.name}</h3>
                        <span class="price">€${parseFloat(item.price).toFixed(2)}</span>
                        <button onclick="removeFromCart(${item.id})">Remove</button>
                    </div>
                `;
            });

            container.innerHTML = html;

            // Display the total price formatted to 2 decimal places
            totalElement.textContent = "€" + total.toFixed(2);
        });
}

// Send a DELETE request to the server to remove an item from the cart
// The server then deletes the row from the cart table in MySQL
function removeFromCart(id) {
    fetch("/api/cart/" + id, {
        method: "DELETE"
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        // Reload the cart after removing the item
        loadCart();
    });
}

// Load the cart automatically when the page opens
loadCart();
