// Yogev Bar

"use strict";
function addProduct() {

    // Calls the 'saveToLocalStorage' function to save the product data
    const isValid = saveToLocalStorage();
    if (isValid === false)
        return;
    loadDataFromStorage();
}


function saveToLocalStorage() {
    // Finding the HTML:
    const productNameTextBox = document.getElementById("productName");
    const productPriceTextBox = document.getElementById("productPrice");
    const productCategoryTextBox = document.getElementById("productCategory");
    const imageLinkTextBox = document.getElementById("imageLink");


    // Extracts the values from the HTML input fields
    let productName = productNameTextBox.value;
    let productPrice = + productPriceTextBox.value;
    let productCategory = productCategoryTextBox.value;
    let imageLink = imageLinkTextBox.value;

    const isValid = validator(productName, productPrice, productCategory, imageLink);

    // Checks if the values ​​are valid, if not returns false and exits the function
    if (isValid === false)
        return false;

    // Creating an object from the current data of the product

    const product = { productName, productPrice, productCategory, imageLink };

    // Finding current array, if not exist I open a new:
    /**

    Initializes the products array from JSON data.
    Parses the JSON string 'json' into an array using JSON.parse().
    If the 'json' string is valid (for example null), it assigns the parsed array to 'productsArr'.
    Otherwise, an empty array is assigned to 'productsArr'.
    */

    let json = localStorage.getItem("products");
    const productsArr = json ? JSON.parse(json) : [];

    //push the new object to the array:
    productsArr.push(product);

    // Stringify the new array to be able save in local storage
    const productsArrString = JSON.stringify(productsArr);

    // Return the string to the local storage
    localStorage.setItem("products", productsArrString);

    // Resets the fields so that the user can conveniently insert the following product:

    productNameTextBox.value = "";
    productPriceTextBox.value = "";
    // return the selection to the first value:
    productCategoryTextBox.selectedIndex = 0;
    imageLinkTextBox.value = "";



}

function validator(productName, price,productCategory, imageLink) {
    //This function get the product name, price and imageLink
    // return True if the values are valid, else False



    // Finding the again the HTML textBox (for focus on them if the value not valid):
    const productNameTextBox = document.getElementById("productName");
    const productPriceTextBox = document.getElementById("productPrice");
    const productCategoryTextBox = document.getElementById("productCategory");
    const imageLinkTextBox = document.getElementById("imageLink");

    // Checks if the product name has a valid length
    if (productName.length < 3 || productName.length > 35) {
        alert("Please insert a valid product name which contains at least 3 characters and maximum 34 chars");
        productNameTextBox.focus();
        return false;
    }

    //if the price is not a number , or a negative number or 0
    //or bigger than  10000 so return false
    // because its not valid
    if (isNaN(price) || price <= 0 || price > 10000) {
        alert("Please insert a valid price value that contain a positive number that smaller than 10000");
        productPriceTextBox.focus();
        return false;
    }

    if(productCategory==="Select product")
        {
            alert("You must select a category");
            productCategoryTextBox.focus();
            return false;
        }

    // Checks if the image link is a valid URL (min 8 chars):

    if (imageLink.length < 8) {
        alert("Please insert a valid url link that include minimum 8 chars");
        imageLinkTextBox.focus();
        return false;
    }


    // I don`t check the category because the user select her from list of valid values

    // If we pass all the check successfully return true:
    return true;
}

function loadDataFromStorage() {
    // Finding the table container:
    const cartContainer = document.getElementById("cartContainer");

    //Loading local storage
    const productString = localStorage.getItem("products");
    // Parses a JSON string into a JavaScript object:
    const products = JSON.parse(productString);


    /*
    Checks if the 'products' variable is null.
    If 'products' is null, returns from the function.
    Used to handle the case when no products are stored in the local storage.
    */
    if (products === null)
        return;

    // Start to build a table in dynamic HTML:

    let html = `
    
    <table class="table table-hover">
        <thead>
            <tr>
                <th>Product Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Image</th>
                <th>Actions</th>

            </tr>
        </thead>
        <tbody>
    
    `;


    // Build table rows for each item in 'products' using a for...of loop
    for (const item of products) {

        html +=
            `
        <tr>
        <td>${item.productName}</td>
        <td>${item.productPrice}</td>
        <td>${item.productCategory}</td>
        <td><img src=${item.imageLink} alt="Invalid link"></img></td>
        <td>
        <button onclick="deleteProduct('${item.productName}')">Delete</button>
      </td>
        </tr>`;

    }

    // Closing the HTML Container:
    html += `</tbody></table>`;

    // Insert the dynamic HTML table to the container:
    cartContainer.innerHTML = html;

}

function deleteProduct(productName) {
    // Retrieve the JSON string representing the products from the local storage
    const productString = localStorage.getItem("products");

    // Parse the JSON string into an array of products
    const products = JSON.parse(productString);

    // Create an empty array to store the updated products
    const updatedProducts = [];

    // Iterate over each product in the products array
    for (let i = 0; i < products.length; i++) {
        // Check if the current product's name does not match the specified productName
        if (products[i].productName !== productName)
            // If the name doesn't match, add the product to the updatedProducts array
            updatedProducts.push(products[i]);
    }


    // Convert the updatedProducts array back into a JSON string
    const updatedProductsString = JSON.stringify(updatedProducts);
    // Update the "products" key in the local storage with the updated products string
    localStorage.setItem("products", updatedProductsString);

    loadDataFromStorage(); // Reload the table after deleting the product

}