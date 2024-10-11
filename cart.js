let cart = [];

// Function to add a product to the cart
function addToCart(productId) {
    fetch('/api/products') // Ensure this URL matches your backend API
        .then(response => response.json())
        .then(data => {
            for (const category in data) {
                const product = data[category].find(p => p.id === productId);
                if (product) {
                    cart.push(product);
                    updateCart();
                    break;
                }
            }
        });
}

// Function to update the cart display
function updateCart() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const div = document.createElement('div');
        div.innerHTML = `${item.name} - ₹${item.price} <button onclick="removeFromCart(${index})">Remove</button>`;
        cartItems.appendChild(div);
        total += item.price;
    });

    document.getElementById('totalPrice').innerText = `Total: ₹${total}`;
    document.getElementById('placeOrder').style.display = cart.length > 0 ? 'block' : 'none';
}

// Function to remove an item from the cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Event listener to show the order form
document.getElementById('placeOrder').addEventListener('click', () => {
    document.getElementById('orderForm').style.display = 'block';
});

// Event listener to submit the order
document.getElementById('submitOrder').addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    if (!phone.match(/^\+91[0-9]{10}$/)) {
        alert('Please enter a valid Indian phone number.');
        return;
    }

    const addressContainer = document.getElementById('addressContainer');
    const address = document.createElement('div');
    address.innerHTML = `Email: ${email}, Phone: ${phone}`;
    addressContainer.appendChild(address);
    cart = []; // Clear the cart after placing the order
    updateCart(); // Update the cart display
    alert('Order placed successfully!');
    document.getElementById('orderForm').style.display = 'none'; // Hide the order form
});





   







