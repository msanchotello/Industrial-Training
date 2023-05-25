fetch('http://localhost:8000/products/categories/1')
  .then(response => response.json())
  .then(data => {
    const productContainer = document.getElementById('product_container');

    data.products.forEach(product => {
      const productElement = document.createElement('div');
      productElement.className = 'product';
      productElement.onclick = function() {
        getVariations(product.ID);
      };

      const productNameElement = document.createElement('h1');
      productNameElement.textContent = product.name;

      const productInfoElement = document.createElement('div');
      productInfoElement.className = 'product-info';

      const productImageElement = document.createElement('img');
      productImageElement.src = '../static/Frutero.webp';
      productImageElement.alt = 'Frutero';
      productImageElement.style.width = '200px';

      productInfoElement.appendChild(productImageElement);

      productElement.appendChild(productNameElement);
      productElement.appendChild(productInfoElement);
      productContainer.appendChild(productElement);
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });

function getVariations(productID) {
  fetch(`http://localhost:8000/products/variations/${productID}`)
    .then(response => response.json())
    .then(data => {
      const variationsBox = document.createElement('div');
      variationsBox.id = 'variationsBox';
      variationsBox.innerHTML = `<div id="variationsContainer"></div>
                                  <div class="close" onclick="cerrar()">&#x2715;</div>`;
      
      const variationsContainer = variationsBox.querySelector('#variationsContainer');

      data.variations.forEach(variation => {
        const variationElement = document.createElement('div');
        variationElement.textContent = `Price: ${variation.price}$, Supermarket: ${variation.supermarket.name}`;
        variationsContainer.appendChild(variationElement);
      });

      document.body.appendChild(variationsBox);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function cerrar() {
  const variationsBox = document.getElementById('variationsBox');
  variationsBox.remove();
}
