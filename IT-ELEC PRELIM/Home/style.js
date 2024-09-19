// When the window loads, execute the following function
window.onload = function() {
    // Get the product list from localStorage 
    const productList = JSON.parse(localStorage.getItem('productList')) || [];
    // Get the HTML element where the product list will be displayed
    const productContainer = document.getElementById('product-list');
    const categoryFilter = document.getElementById('category-filter');
    const searchBar = document.getElementById('search-bar');

    // Function to display products in the HTML container
    const displayProducts = (products) => {
        // Clear the container and populate it with the products passed in as the argument
        productContainer.innerHTML = products.map((product, index) => `
            <div class="content">
                <img src="${product.imageSrc}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Price: ₱${product.price}</p>
                <p>Weight/Volume: ${product.weightVolume}</p>
                <p>Quantity: ${product.quantity}</p>
                <!-- Buttons to add the product to the cart and remove the product from the list -->
                <div class="button-container">
                    <button name="add-to-cart" onclick="addToCart(${index})">Add to Cart</button>
                    <button name="remove-item" class="remove" onclick="removeItem(${index})">Remove</button>
                </div>
            </div>
        `).join(''); // Use .join('') to convert the array of HTML into a single string
    };

    // Function to filter products based on category and search query
    const filterProducts = () => {
        // Get the selected category from the dropdown
        const selectedCategory = categoryFilter.value;
        // Get the search query from the search bar and convert it 
        const searchQuery = searchBar.value.toLowerCase();

        // Filter the products based on category and search query
        const filteredProducts = productList.filter(product => 
            // Check if the product's category matches the selected category or shows all the product
            (selectedCategory === 'all' || product.category.toLowerCase() === selectedCategory) &&
            // Check if the product's name includes the search query
            product.name.toLowerCase().includes(searchQuery)
        );

        // Display the filtered products
        displayProducts(filteredProducts);
    };

    //  display all products when the page loads
    displayProducts(productList);
    // Function the category filter dropdown to trigger filtering when the category is changed
    categoryFilter.addEventListener('change', filterProducts);
    // Function for search bar to filter products as the user input
    searchBar.addEventListener('input', filterProducts);
};

// Function to add a product to the cart
const addToCart = (index) => {
    // Get the product list from localStorage
    const productList = JSON.parse(localStorage.getItem('productList')) || [];
    // Get the cart from localStorage 
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Add the product at the given index to the cart array
    cart.push(productList[index]);
    // Update the cart in localStorage with the new product added
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${productList[index].name} has been added to the cart.`);
};

// Function to remove a product from the product list
const removeItem = (index) => {
    // Get the product list from localStorage
    const productList = JSON.parse(localStorage.getItem('productList')) || [];

    // Remove the product index from the productList array
    productList.splice(index, 1);
    // Update the productList in localStorage to the removed product
    localStorage.setItem('productList', JSON.stringify(productList));
    // Reload the page to  the updated product list after removal
    window.location.reload();
};
