let products = [];
let cart = [];
let addresses = [];

window.onload = () => {
    fetchProducts();
};

const fetchProducts = async () => {
    const response = await fetch('/api/products');
    products = await response.json();
    displayProducts(products);
};

const displayProducts = (products) => {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    for (const category in products) {
        const categorySection = document.createElement('div');
        categorySection.innerHTML = `<h2>${category}</h2>`;
        products[category].forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <h3>${product.name}</h3>
                <p>Price: ₹${product.price}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            `;
            categorySection.appendChild(productDiv);
        });
        productList.appendChild(categorySection);
    }
};

const addToCart = (productId) => {
    const product = findProduct(productId);
    cart.push(product);
    displayCart();
};

const findProduct = (id) => {
    for (const category in products) {
        const product = products[category].find(prod => prod.id === id);
        if (product) return product;
    }
};

const displayCart = () => {
    const cartSummary = document.getElementById('cart-summary');
    cartSummary.innerHTML = '<h2>Cart</h2>';
    let totalPrice = 0;
    cart.forEach(item => {
        cartSummary.innerHTML += `<p>${item.name} - ₹${item.price}</p>`;
        totalPrice += item.price;
    });
    cartSummary.innerHTML += `<h3>Total: ₹${totalPrice}</h3>`;
    document.getElementById('placeOrder').style.display = cart.length > 0 ? 'block' : 'none';
};

const filterProducts = (category) => {
    const filteredProducts = {};
    filteredProducts[category] = products[category];
    displayProducts(filteredProducts);
};

const searchProducts = () => {
    const query = document.getElementById('search').value.toLowerCase();
    const filteredProducts = {};
    for (const category in products) {
        const matchingProducts = products[category].filter(product => product.name.toLowerCase().includes(query));
        if (matchingProducts.length > 0) {
            filteredProducts[category] = matchingProducts;
        }
    }
    if (Object.keys(filteredProducts).length === 0) {
        document.getElementById('product-list').innerHTML = '<h3>No products available</h3>';
    } else {
        displayProducts(filteredProducts);
    }
};

const addAddress = () => {
    const address = document.getElementById('address-input').value;
    const email = document.getElementById('email-input').value;
    const phone = document.getElementById('phone-input').value;

    if (address && email && phone.match(/^\+91[0-9]{10}$/)) {
        addresses.push({ address, email, phone });
        displayAddresses();
    } else {
        alert('Please fill all fields correctly.');
    }
};

const displayAddresses = () => {
    const addressList = document.getElementById('address-list');
    addressList.innerHTML = '<h3>Saved Addresses:</h3>';
    addresses.forEach(addr => {
        addressList.innerHTML += `<p>${addr.address}, ${addr.email}, ${addr.phone}</p>`;
    });
};

// Order placement functionality
document.getElementById('placeOrder').addEventListener('click', () => {
    document.getElementById('orderForm').style.display = 'block';
});

document.getElementById('submitOrder').addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const addressContainer = document.getElementById('addressContainer');
    
    if (email && phone.match(/^\+91[0-9]{10}$/)) {
        const address = document.createElement('div');
        address.innerHTML = `Email: ${email}, Phone: ${phone}`;
        addressContainer.appendChild(address);
        cart = [];
        updateCart();
        alert('Order placed successfully!');
        document.getElementById('orderForm').style.display = 'none';
    } else {
        alert('Please enter valid email and phone number.');
    }
});




  








