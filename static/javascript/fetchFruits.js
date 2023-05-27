let container = document.getElementById("product_container");
let selection = document.getElementById("selection");
let priceSelection = document.getElementById("variations");
let currentPage = 1;
let currentSearchKeyword = '';

// Fetch products from the API
function fetchProducts(skip = 0, keyword = '') {
  var protocol = window.location.protocol;
  var currenthost = window.location.hostname;
  
  var port = window.location.port;
  if (port != '') {
    currenthost += ':' + port;
  }

  if (protocol == '') {
    protocol = 'http:';
  }
  
  currenthost = protocol + '//' + currenthost;
  let url = currenthost + `/products/categories/4?skip=${skip}`;

  if (keyword) {
    url += `&search=${keyword}`;
    currentSearchKeyword = keyword;
  }

  fetch(url)
    .then(response => response.json())
    .then(data => {
      updateProductContainer(data.products);
    })
    .catch(error => {
      console.error("Error fetching products:", error);
    });
}

// Get the search form and input element
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");

// Function to search products
function searchProducts(event) {
  event.preventDefault(); // Prevent form submission
  const keyword = searchInput.value;
  currentPage = 1; // Reset current page to 1
  fetchProducts(0, keyword);
  searchInput.value = ''; // Empty the search input
}

function updateProductContainer(products) {
  container.innerHTML = ""; // Clear previous products

  products.forEach(product => {
    // Create product element
    const productElement = document.createElement("div");
    productElement.classList.add("product");
    productElement.onclick = () => cargar(product.ID);

    // Create product name
    const productName = document.createElement("h1");
    productName.textContent = product.name;

    // Create product image
    const productImage = document.createElement("img");
    const randomImageIndex = Math.floor(Math.random() * 14) + 1; // Assuming 14 previous images
    productImage.src = `../img/fruit${randomImageIndex}.jpg`;
    productImage.style.width = "200px";
    productImage.style.height = "200px";

    // Append elements to product container
    productElement.appendChild(productName);
    productElement.appendChild(productImage);
    container.appendChild(productElement);
  });
}

function cargar(productID) {
  var protocol = window.location.protocol
  var currenthost = window.location.hostname;
  
  var port = window.location.port;
  if (port != '') {
    currenthost += ':' + port
  }

  if (protocol == '') {
    protocol = 'http:';
  }

  currenthost = protocol + '//' + currenthost

  let url = currenthost + `/products/variations/${productID}`
  fetch(url)
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
        supermarketImage.src = `../img/${imageName}.png`;
        supermarketImage.alt = variation.supermarket.name;

        const variationText = document.createElement("span");
        variationText.textContent = `${variation.price} €`;

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


// Pagination functions
function nextPage(event) {
  event.preventDefault();
  currentPage++;
  const skip = (currentPage - 1) * 25;
  fetchProducts(skip);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function previousPage(event) {
  event.preventDefault();
  if (currentPage > 1) {
    currentPage--;
    const skip = (currentPage - 1) * 25;
    fetchProducts(skip);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}


// Add event listener to search form
searchForm.addEventListener("submit", searchProducts);

// Add event listeners to pagination buttons
document.getElementById("previousPageTopBtn").addEventListener("click", previousPage);
document.getElementById("nextPageTopBtn").addEventListener("click", nextPage);

document.getElementById("previousPageBottomBtn").addEventListener("click", previousPage);
document.getElementById("nextPageBottomBtn").addEventListener("click", nextPage);



// Fetch initial set of products
fetchProducts();
