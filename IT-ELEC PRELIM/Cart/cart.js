
function loadCart() {
    // Retrieve the cart from localStorage 
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartList = document.getElementById('cart-list'); // Where cart items are displayed
    const totalSection = document.querySelector('.total-section'); // Total price section

    // Clear the cart display before adding new items
    cartList.innerHTML = '';

    // function if there is no item in the cart hide the total section and if there is reveal it
    if (cart.length === 0) {
        totalSection.classList.add('hidden'); // Hide total price section
        document.getElementById('total-price').textContent = 'Total Price: ₱0'; // Set total price to 0
        return;
    }

    // If the cart is not empty, show the total section
    totalSection.classList.remove('hidden');

    // Loop through each item in the cart and create the structure
    cart.forEach(item => {
        const content = document.createElement('div');
        content.classList.add('cart-item'); // Add a class for styling
        content.setAttribute('data-name', item?.name || 'Unknown Item'); // Set item name as data attribute

        // Define the HTML structure for the cart item, including image, price, quantity, and buttons
        content.innerHTML = `
            <img src="${item?.imageSrc || 'default-image.jpg'}" alt="${item?.name || 'Unknown Item'}">
            <h3>${item?.name || 'Unknown Item'}</h3>
            <p>Price: ₱${item?.price || '0'}</p>
            <p>Quantity: ${item?.quantity || '1'}</p>
            <div class="quantity-controls">
                <button class="quantity-decrease" data-name="${item?.name}">-</button>
                <button class="quantity-increase" data-name="${item?.name}">+</button>
            </div>
            <div class="actions">
                <label><input type="checkbox" class="checkout-item" data-price="${item?.price}" data-quantity="${item?.quantity}"></label>
                <button onclick="removeFromCart('${item?.name}')">Remove</button>
            </div>
        `;

        // Add the item to the cart list on the page
        cartList.appendChild(content);
    });

    // Add event listeners to all the checkboxes to recalculate total when checked/unchecked
    document.querySelectorAll('.checkout-item').forEach(checkbox => checkbox.addEventListener('change', calculateTotal));

    // Function for  quantity decrease and increase buttons
    document.querySelectorAll('.quantity-decrease').forEach(button => button.addEventListener('click', () => updateQuantity(button, -1)));
    document.querySelectorAll('.quantity-increase').forEach(button => button.addEventListener('click', () => updateQuantity(button, 1)));

    // Recalculate the total price after loading the cart
    calculateTotal();
}

// Function to remove an item from the cart
function removeFromCart(name) {
    // Retrieve the cart from localStorage or use an empty array if not found
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Filter out the item with the matching name
    cart = cart.filter(item => item?.name !== name);

    // Save the updated cart back to localStorage and reload the cart display
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart(); // Reload cart items after removal
    alert(`${name} has been removed from the cart.`); 
}

// Function to calculate the total price on the selected items
function calculateTotal() {
    let total = 0;

    // Select all checkboxes that are checked
    document.querySelectorAll('.checkout-item:checked').forEach(checkbox => {
        const price = parseFloat(checkbox.getAttribute('data-price')) || 0;
        const quantity = parseInt(checkbox.getAttribute('data-quantity')) || 1;
        total += price * quantity; // Add the price multiplied by quantity 
    });

    // Display the total price on the page
    document.getElementById('total-price').textContent = `Total Price: ₱${total.toFixed(2)}`;
}

// Function to remove only checked items
function checkout() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Find all the checked checkboxes
    document.querySelectorAll('.checkout-item:checked').forEach(checkbox => {
        const itemName = checkbox.closest('.cart-item')?.getAttribute('data-name'); // Get the name of the item
        if (itemName) {
            // Remove the item from the cart array
            cart = cart.filter(item => item?.name !== itemName);
        }
    });

    // Save the updated cart and reload the display
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart(); // Reload cart after checkout
    calculateTotal(); // Recalculate the total after checkout
}

// Function to update the quantity of a cart item
function updateQuantity(button, change) {
    const itemName = button.getAttribute('data-name'); // Get the name of the item
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = cart.findIndex(item => item?.name === itemName); 

    if (itemIndex !== -1) {
        cart[itemIndex].quantity = Math.max(1, (parseInt(cart[itemIndex].quantity) || 1) + change); // Update the quantity
        localStorage.setItem('cart', JSON.stringify(cart)); // Save the updated cart
        loadCart(); // Reload the cart to the updated quantity
    }
}

// Automatically load the cart when the page loads
window.onload = loadCart;
