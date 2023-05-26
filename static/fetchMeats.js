let container = document.getElementById("product_container");
let selection = document.getElementById("selection");
let priceSelection = document.getElementById("variations");

// Fetch products from the API
fetch(`http://localhost:8000/products/categories/2`)
  .then(response => response.json())
  .then(data => {
    // Generate the product elements dynamically
    data.products.forEach(product => {
      const productElement = document.createElement("div");
      productElement.classList.add("product");
      productElement.onclick = () => cargar(product.ID);
      //productElement.style.padding = "10px 10px";

      const productName = document.createElement("h1");
      productName.textContent = product.name;

      const productImage = document.createElement("img");
      const randomImageIndex = Math.floor(Math.random() * 7) + 1; // Generate a random image index between 1 and 7
      productImage.src = `meat${randomImageIndex}.jpg`;
      productImage.style.width = "200px";

      productElement.appendChild(productName);
      productElement.appendChild(productImage);

      container.appendChild(productElement);
    });
  })
  .catch(error => {
    console.error("Error fetching products:", error);
  });



// Get the search form and input element
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");


// Function to search products
function searchProducts(event) {
  event.preventDefault(); // Prevent form submission

  const keyword = searchInput.value;

  // Clear the product container
  container.innerHTML = "";

  // Fetch products based on the keyword
  fetch(`http://localhost:8000/products/categories/2?search=${keyword}`)
    .then(response => response.json())
    .then(data => {
      const products = data.products;


      if (products.length === 0) {
        container.innerHTML = "<p>No products found.</p>";
      } else {
        // Clear the product container
        container.innerHTML = "";
        products.forEach(product => {
            const productElement = document.createElement("div");
            productElement.classList.add("product");
            productElement.onclick = () => cargar(product.ID);
      
            const productName = document.createElement("h1");
            productName.textContent = product.name;
      
            const productImage = document.createElement("img");
            const randomImageIndex = Math.floor(Math.random() * 7) + 1; // Generate a random image index between 1 and 7
            productImage.src = `meat${randomImageIndex}.jpg`;
            productImage.style.width = "200px";
      
            productElement.appendChild(productName);
            productElement.appendChild(productImage);
      
            container.appendChild(productElement);
          });
      }
    })
    .catch(error => {
      console.error("Error fetching products:", error);
    });

  // Reset the search input
  searchInput.value = "";

  return false;
}
  



function cargar(productID) {
  fetch(`http://localhost:8000/products/variations/${productID}`)
    .then(response => response.json())
    .then(data => {
      selection.style.visibility = "visible";
      container.style.opacity = "0.3";
      selection.style.width = "35%";
      selection.style.top = "23%";
      selection.style.left = "32.5%";

      // Clear previous variation prices
      while (priceSelection.firstChild) {
        priceSelection.removeChild(priceSelection.firstChild);
      }

      // Append each variation to a new line
      data.variations.forEach(variation => {
        const variationDiv = document.createElement("div");
        variationDiv.classList.add("variation");

        const supermarketImage = document.createElement("img");
        supermarketImage.classList.add("supermarket-image");
        const imageName = variation.supermarket.name.toLowerCase();
        supermarketImage.src = `${imageName}.png`;
        supermarketImage.alt = variation.supermarket.name;

        const variationText = document.createElement("span");
        variationText.textContent = `${variation.price}€`; //${variation.supermarket.name} redundant

        variationDiv.appendChild(supermarketImage);
        variationDiv.appendChild(variationText);
        priceSelection.appendChild(variationDiv);
      });

      if (data.variations.length === 0) {
        // If no variations are available, display a message
        const noVariationsMessage = document.createElement("span");
        noVariationsMessage.classList.add("prices");
        noVariationsMessage.innerHTML = "No prices available.";
        priceSelection.appendChild(noVariationsMessage);
      }
    })
    .catch(error => {
      console.error("Error fetching variations:", error);
    });
}

function cerrar() {
  selection.style.visibility = "hidden";
  container.style.opacity = "1";
}