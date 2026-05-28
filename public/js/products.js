// Store all products fetched from the database
// This variable is used by the filter function to avoid re-fetching
let allProducts = [];

// Fetch all products from the server when the page loads
// The server queries the MySQL database and returns the results as JSON
fetch("/api/products")
    .then(function(response) {
        return response.json();
    })
    .then(function(products) {
        allProducts = products;
        displayProducts(products);
    });

// Display products in the products grid
// This function dynamically creates HTML cards for each product
function displayProducts(products) {
    const container = document.getElementById("products-container");

    // If no products found, show a message
    if (products.length === 0) {
        container.innerHTML = "<p>No games found for this platform.</p>";
        return;
    }

    // Create the grid container
    let html = "<div class='products-grid'>";

    // Loop through each product and create a card
    products.forEach(function(product) {
        html += `
            <div class="product-card" data-platform="${product.platform}">
                <img src="images/${product.image}" 
                     alt="${product.name}"
                     onerror="this.src='images/default.jpg'">
                <h3>${product.name}</h3>
                <span class="platform">${product.platform}</span>
                <p>${product.description}</p>
                <div class="price">€${parseFloat(product.price).toFixed(2)}</div>
                <button onclick="addToCart(${product.id}, '${product.name}', ${product.price})">
                    Add to Cart
                </button>
            </div>
        `;
    });

    html += "</div>";
    container.innerHTML = html;
}

// Filter products by platform without re-fetching from the database
// Uses the allProducts array stored in memory
function filterProducts(platform) {
    if (platform === "All") {
        displayProducts(allProducts);
    } else {
        const filtered = allProducts.filter(function(product) {
            return product.platform === platform;
        });
        displayProducts(filtered);
    }
}

// Send a POST request to the server to add a product to the cart
// The server then inserts the item into the cart table in MySQL
function addToCart(productId, name, price) {
    fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_id: productId, name: name, price: price })
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        // Show confirmation message to the user without using alert()
        const container = document.getElementById("products-container");
        const message = document.createElement("p");
        message.style.color = "#44ff88";
        message.style.fontWeight = "bold";
        message.textContent = `${name} added to cart!`;
        container.insertBefore(message, container.firstChild);

        // Remove the message after 2 seconds
        setTimeout(function() {
            message.remove();
        }, 2000);
    });
}
