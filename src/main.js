document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.querySelector(".carousel-container");
    const slides = document.querySelectorAll(".carousel-slide");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");

    let index = 0;

    function showSlide(i) {
        if (i >= slides.length) index = 0;
        if (i < 0) index = slides.length - 1;
        let offset = -index * 100;
        carousel.style.transform = `translateX(${offset}%)`;
    }

    nextBtn.addEventListener("click", function () {
        index++;
        showSlide(index);
    });

    prevBtn.addEventListener("click", function () {
        index--;
        showSlide(index);
    });

    setInterval(() => {
        index++;
        showSlide(index);
    }, 5000);
});
let cart = [];

// Open cart modal
document.getElementById('cart-icon').addEventListener('click', function() {
    const cartModal = document.getElementById('cart-modal');
    cartModal.style.display = 'flex';
    setTimeout(() => {
        cartModal.classList.remove('close'); 
    }, 10); 
    updateCart();
});

// Close cart modal
document.getElementById('close-btn').addEventListener('click', function() {
    const cartModal = document.getElementById('cart-modal');
    cartModal.classList.add('close'); 
    setTimeout(() => {
        cartModal.style.display = 'none'; 
    }, 500);
});

// Add product to cart
function addToCart(productName, price, imgSrc) {
    const restrictedProducts = [];

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

// Update cart
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

// Change item quantity in cart
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

// Add to cart when "Buy Now" is clicked
document.querySelectorAll('.product-info button').forEach(button => {
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

// Proceed to checkout
document.getElementById('checkout-btn').addEventListener('click', function() {
    const checkoutModal = document.getElementById('checkout-modal');
    checkoutModal.style.display = 'flex';
    setTimeout(() => {
        checkoutModal.classList.remove('close');
    }, 10);
    updateCheckoutItems();
});

// Close checkout modal
document.getElementById('close-checkout-btn').addEventListener('click', function() {
    const checkoutModal = document.getElementById('checkout-modal');
    checkoutModal.classList.add('close');
    setTimeout(() => {
        checkoutModal.style.display = 'none';
    }, 500);
});

// Update checkout items
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
function setupBuyNowButtons() {
    document.querySelectorAll('.product-card button').forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').innerText;
            const price = parseFloat(productCard.querySelector('p').innerText.replace('$', ''));
            const imgSrc = productCard.querySelector('img').src;

            addToCart(productName, price, imgSrc);
        });
    });
}

// Proceed to checkout
document.getElementById('checkout-btn').addEventListener('click', function() {
    const checkoutModal = document.getElementById('checkout-modal');
    checkoutModal.style.display = 'flex';
    setTimeout(() => {
        checkoutModal.classList.remove('close');
    }, 10);
    updateCheckoutItems();
});

// Close checkout modal
document.getElementById('close-checkout-btn').addEventListener('click', function() {
    const checkoutModal = document.getElementById('checkout-modal');
    checkoutModal.classList.add('close');
    setTimeout(() => {
        checkoutModal.style.display = 'none';
    }, 500);
});

// Update checkout items
function updateCheckoutItems() {
    const checkoutItemsContainer = document.getElementById('checkout-items');
    checkoutItemsContainer.innerHTML = '';
    checkoutItemsContainer.style.display = 'flex';
    checkoutItemsContainer.style.flexWrap = 'wrap';
    checkoutItemsContainer.style.gap = '10px';

    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('checkout-item');
        itemDiv.style.display = 'flex';
        itemDiv.style.flexDirection = 'column';
        itemDiv.style.alignItems = 'center';

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

// Alert on registration completion
document.getElementById('register-btn').addEventListener('click', function() {
    alert('Дякуємо за замовлення, оплата при отриманні! Доставка 5-10 днів');
});

