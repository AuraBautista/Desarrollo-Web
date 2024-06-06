// Esta función se ejecuta cuando la ventana ha cargado completamente.
window.onload = function() {
    // Comprueba si hay un contenedor de lista de productos en la página.
    if (document.getElementById('product-list')) {
        // Realiza una solicitud para obtener la lista de productos disponibles.
        fetch('get_products.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            // Obtiene el contenedor de lista de productos.
            const productList = document.getElementById('product-list');
            // Si hay productos disponibles, los muestra en la página.
            if (data.length > 0) {
                data.forEach(product => {
                    // Crea un elemento para cada producto y lo agrega al contenedor.
                    const productElement = document.createElement('div');
                    productElement.className = 'producto-item';
                    productElement.innerHTML = `
                        <img src="${product.image}" alt="${product.name}">
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                        <p>$${product.price}</p>
                        <button onclick="addToCart(${product.id})">Agregar al Carrito</button>
                    `;
                    productList.appendChild(productElement);
                });
            } else {
                // Si no hay productos disponibles, muestra un mensaje.
                productList.innerHTML = '<p>No hay productos disponibles.</p>';
            }
        })
        .catch(error => {
            // En caso de error, muestra un mensaje de error.
            console.error('Error:', error);
            document.getElementById('product-list').innerHTML = '<p>Error al cargar los productos.</p>';
        });
    }

    // Comprueba si hay un contenedor de lista de carrito en la página.
    if (document.getElementById('cart-list')) {
        // Realiza una solicitud para obtener la lista actual de productos en el carrito.
        fetch('cart.php')
        .then(response => response.json())
        .then(data => {
            // Obtiene el contenedor de lista de carrito.
            const cartList = document.getElementById('cart-list');
            // Si hay productos en el carrito, los muestra en la página.
            if (data.length > 0) {
                data.forEach(item => {
                    // Crea un elemento para cada producto en el carrito y lo agrega al contenedor.
                    const cartItem = document.createElement('div');
                    cartItem.className = 'cart-item';
                    cartItem.innerHTML = `
                        <img src="${item.image}" alt="${item.name}">
                        <h3>${item.name}</h3>
                        <p>$${item.price}</p>
                        <button onclick="removeFromCart(${item.id})">Remove</button>
                    `;
                    cartList.appendChild(cartItem);
                });
            } else {
                // Si el carrito está vacío, muestra un mensaje.
                cartList.innerHTML = '<p>Your cart is empty.</p>';
            }
        })
        .catch(error => console.error('Error:', error));
    }
}

// Función para agregar un producto al carrito.
function addToCart(productId) {
    // Realiza una solicitud POST para agregar el producto al carrito.
    fetch('update_cart.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `action=add&product_id=${productId}`
    })
    .then(response => response.json())
    .then(data => {
        // Muestra una alerta indicando que el producto se ha agregado al carrito.
        alert('Product added to cart!');
    });
}

// Función para eliminar un producto del carrito.
function removeFromCart(productId) {
    // Realiza una solicitud POST para eliminar el producto del carrito.
    fetch('update_cart.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `action=remove&product_id=${productId}`
    })
    .then(response => response.json())
    .then(data => {
        // Muestra una alerta indicando que el producto se ha eliminado del carrito.
        alert('Product removed from cart!');
        // Recarga la página para actualizar la lista de productos en el carrito.
        location.reload();
    });
}
