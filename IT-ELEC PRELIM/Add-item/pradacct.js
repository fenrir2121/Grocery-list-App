function addItem() {
    // Get values from the input fields
    const name = document.getElementById('product-name').value;
    const brand = document.getElementById('brand').value;
    const price = document.getElementById('price').value;
    const weightVolume = document.getElementById('weight-volume').value;
    const quantity = document.getElementById('quantity').value;
    const store = document.getElementById('store').value;
    const category = document.getElementById('category').value;
    
    // Get the image file 
    const productImage = document.getElementById('product-image').files[0];

    // Ensure all fields are filled 
    if (name && brand && price && weightVolume && quantity && store && category && productImage) {
        // Create a FileReader object to read the image file as a data URL 
        const reader = new FileReader();

        // when  file is loaded run the following function
        reader.onload = function (e) {
            const imageSrc = e.target.result;

            // Create an object f containing all the input 
            const product = {
                name: name,
                brand: brand,
                price: price,
                weightVolume: weightVolume,
                quantity: quantity,
                store: store,
                category: category,
                imageSrc: imageSrc // Add the img
            };

            // Retrieve existing products from local storage (if any) or initialize as an empty array
            const productList = JSON.parse(localStorage.getItem('productList')) || [];

            // Add the new product to the product list
            productList.push(product);

            // Save the updated product list back to local storage
            localStorage.setItem('productList', JSON.stringify(productList));

            // Notify the user that the item was successfully added
            alert('Item added! Check the product list on the index page.');

            // Clear the input fields after the product is added
            document.getElementById('product-name').value = '';
            document.getElementById('brand').value = '';
            document.getElementById('price').value = '';
            document.getElementById('weight-volume').value = '';
            document.getElementById('quantity').value = '';
            document.getElementById('store').value = '';
            document.getElementById('category').value = '';
            document.getElementById('product-image').value = ''; 
        };

        // Read the image file as a Data URL (base64 encoded string) and trigger the onload event
        reader.readAsDataURL(productImage);
    } else {
        // Show an alert if some required fields are missing
        alert('Please fill in all fields and upload an image.');
    }
}
