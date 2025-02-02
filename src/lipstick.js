let cart = [];


document.getElementById('cart-icon').addEventListener('click', function() {
    const cartModal = document.getElementById('cart-modal');
    cartModal.style.display = 'flex';
    setTimeout(() => {
        cartModal.classList.remove('close'); 
    }, 10); 
    updateCart();
});


document.getElementById('close-btn').addEventListener('click', function() {
    const cartModal = document.getElementById('cart-modal');
    cartModal.classList.add('close'); 
    setTimeout(() => { 
        cartModal.style.display = 'none'; 
    }, 500);
});


function addToCart(productName, price, imgSrc) {
    const restrictedProducts = ['Peptid-Lippentönung in Espressoe', 'Peptide Lip Treatment Unscented'];

    if (restrictedProducts.includes(productName)) {
        alert(`${productName} is out of stock.`);
        return; 
    }

    let product = cart.find(item => item.name === productName);
    if (product) {
        product.quantity++;
    } else {
        cart.push({
            name: productName,
            price: price,
            imgSrc: imgSrc,
            quantity: 1
        });
    }
    updateCart();
}


function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    let totalPrice = 0;
    cart.forEach(item => {
        totalPrice += item.price * item.quantity;
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');

        itemDiv.innerHTML = `
            <img src="${item.imgSrc}" alt="${item.name}">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>$${item.price}</p>
            </div>
            <div class="quantity">
                <button class="minus" data-name="${item.name}">-</button>
                <span>${item.quantity}</span>
                <button class="plus" data-name="${item.name}">+</button>
            </div>
        `;

        cartItemsContainer.appendChild(itemDiv);

        itemDiv.querySelector('.minus').addEventListener('click', function() {
            changeQuantity(item.name, -1);
        });
        itemDiv.querySelector('.plus').addEventListener('click', function() {
            changeQuantity(item.name, 1);
        });
    });

    document.getElementById('total-price').innerText = `$${totalPrice}`;
}


function changeQuantity(productName, delta) {
    let product = cart.find(item => item.name === productName);
    if (product) {
        product.quantity += delta;
        if (product.quantity <= 0) {
            cart = cart.filter(item => item.name !== productName);
        }
    }
    updateCart();
}


document.querySelectorAll('.product-card button').forEach(button => {
    button.addEventListener('click', function() {
        const productName = this.parentElement.querySelector('h3').innerText;
        const price = parseFloat(this.parentElement.querySelector('p').innerText.replace('$', ''));
        const imgSrc = this.parentElement.querySelector('img').src;

        addToCart(productName, price, imgSrc);

        const cartModal = document.getElementById('cart-modal');
        cartModal.style.display = 'flex';
        setTimeout(() => {
            cartModal.classList.remove('close');
        }, 10);
    });
});


document.getElementById('checkout-btn').addEventListener('click', function() {
    const checkoutModal = document.getElementById('checkout-modal');
    checkoutModal.style.display = 'flex';
    setTimeout(() => {
        checkoutModal.classList.remove('close');
    }, 10);
    updateCheckoutItems();
});


document.getElementById('close-checkout-btn').addEventListener('click', function() {
    const checkoutModal = document.getElementById('checkout-modal');
    checkoutModal.classList.add('close');
    setTimeout(() => {
        checkoutModal.style.display = 'none';
    }, 500);
});


function updateCheckoutItems() {
    const checkoutItemsContainer = document.getElementById('checkout-items');
    checkoutItemsContainer.innerHTML = '';

    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('checkout-item');
        itemDiv.innerHTML = `
            <img src="${item.imgSrc}" alt="${item.name}">
            <div class="checkout-item-details">
                <h4>${item.name}</h4>
                <p>$${item.price}</p>
                <p>Quantity: ${item.quantity}</p>
            </div>
        `;
        checkoutItemsContainer.appendChild(itemDiv);
    });
}

