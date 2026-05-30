// Store all products fetched from the database
let allProducts = [];

// Fetch all products from the server when the page loads
fetch("/api/products")
    .then(function(response) {
        return response.json();
    })
    .then(function(products) {
        allProducts = products;
        displayProducts(products);
    });

// Display products in the products grid
function displayProducts(products) {
    const container = document.getElementById("products-container");

    if (products.length === 0) {
        container.innerHTML = "<p>No games found for this platform.</p>";
        return;
    }

    let html = "<div class='products-grid'>";

    products.forEach(function(product) {
        html += `
            <div class="product-card" data-platform="${product.platform}">
                <img src="images/${product.image}" alt="${product.name}" onerror="this.src='images/default.jpg'">
                <h3>${product.name}</h3>
                <span class="platform">${product.platform}</span>
                <p>${product.description}</p>
                <div class="price">€${parseFloat(product.price).toFixed(2)}</div>
                <button onclick="addToCart(${product.id}, this)">Add to Cart</button>
            </div>
        `;
    });

    html += "</div>";
    container.innerHTML = html;
}

// Filter products by platform
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

// Add product to cart
function addToCart(productId, btn) {
    console.log("Add to cart clicked!", productId);

    // Find the product in allProducts array
    const product = allProducts.find(function(p) {
        return p.id === productId;
    });

    if (!product) {
        console.log("Product not found!");
        return;
    }

    fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            product_id: product.id, 
            name: product.name, 
            price: product.price 
        })
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log("Cart response:", data);

        const notification = document.createElement("div");
        notification.classList.add("notification");
        notification.textContent = "✅ " + product.name + " added to cart!";
        document.body.appendChild(notification);

        setTimeout(function() {
            notification.classList.add("show");
        }, 100);

        setTimeout(function() {
            notification.classList.remove("show");
            setTimeout(function() {
                notification.remove();
            }, 300);
        }, 2000);
    })
    .catch(function(err) {
        console.log("Error:", err);
    });
}