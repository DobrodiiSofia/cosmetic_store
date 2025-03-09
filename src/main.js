document.addEventListener("DOMContentLoaded", function () {
    setTimeout(() => {
        const modal = document.getElementById("discount-modal");
        modal.style.display = "block";
    }, 2000); 
    document.querySelector(".close-modal").addEventListener("click", function () {
        document.getElementById("discount-modal").style.display = "none";
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const shopNowButtons = document.querySelectorAll(".text-4-overlay, .text-2-container button");
    const carouselSection = document.getElementById("carousel");

    shopNowButtons.forEach(button => {
        button.addEventListener("click", function () {
            const offset = 230;
            const carouselPosition = carouselSection.getBoundingClientRect().top + window.scrollY - offset;

            window.scrollTo({ top: carouselPosition, behavior: "smooth" });
        });
    });
});


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
const MAX_QUANTITY = 10;


// Відкриття кошика
document.getElementById('cart-icon').addEventListener('click', function() {
    const cartModal = document.getElementById('cart-modal');
    if (cartModal) {
        cartModal.style.display = 'flex';
        setTimeout(() => {
            cartModal.classList.remove('close'); 
        }, 10);
    } else {
        console.error("cart-modal не знайдено!");
    }
    updateCart();
});

// Закриття кошика
document.getElementById('close-btn').addEventListener('click', function() {
    const cartModal = document.getElementById('cart-modal');
    if (cartModal) {
        cartModal.classList.add('close'); 
        setTimeout(() => {
            cartModal.style.display = 'none'; 
        }, 500);
    }
});

// Додавання товару в кошик
function addToCart(productName, price, imgSrc) {
    let product = cart.find(item => item.name === productName);
    
    if (product) {
        if (product.quantity >= MAX_QUANTITY) {
            alert(`Максимальна кількість ${productName} у кошику – ${MAX_QUANTITY}`);
            return;
        }
        product.quantity++;
    } else {
        cart.push({
            name: productName,
            price: price,
            imgSrc: imgSrc,
            quantity: 1
        });
    }

    console.log("Оновлений кошик:", cart);
    updateCart();

    // Відкриваємо кошик при додаванні товару
    const cartModal = document.getElementById('cart-modal');
    if (cartModal) {
        cartModal.style.display = 'flex';
        setTimeout(() => {
            cartModal.classList.remove('close');
        }, 10);
    } else {
        console.error("cart-modal не знайдено!");
    }
}

// Оновлення кошика
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    let totalPrice = 0;
    let totalQuantity = 0;

    cart.forEach(item => {
        totalPrice += item.price * item.quantity;
        totalQuantity += item.quantity;

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

    // Перевіряємо, чи більше 15 товарів, і застосовуємо знижку
    if (totalQuantity > 5) {
        totalPrice *= 0.85; // Мінус 15%
        document.getElementById('discount-message').innerText = "Знижка 15% застосована!";
    } else {
        document.getElementById('discount-message').innerText = "";
    }

    document.getElementById('total-price').innerText = `$${totalPrice.toFixed(2)}`;
}

function changeQuantity(productName, delta) {
    let product = cart.find(item => item.name === productName);
    if (product) {
        if (product.quantity + delta > MAX_QUANTITY) {
            alert(`Максимальна кількість ${productName} у кошику – ${MAX_QUANTITY}`);
            return;
        }
        product.quantity += delta;
        if (product.quantity <= 0) {
            cart = cart.filter(item => item.name !== productName);
        }
    }
    updateCart();
}

// Додавання товару при натисканні "Buy Now"
document.addEventListener('click', function (event) {
    if (event.target.classList.contains('buy-btn')) {
        const productCard = event.target.closest('.product');
        if (!productCard) return;

        const productName = productCard.querySelector('h3').innerText;
        const priceText = productCard.querySelector('.product-info p:last-of-type').innerText;
        const price = parseFloat(priceText.replace('$', '').trim());
        const imgSrc = productCard.querySelector('.default-img').src;

        console.log(`Додаємо товар: ${productName}, Ціна: ${price}, Зображення: ${imgSrc}`);

        addToCart(productName, price, imgSrc);
    }
});

// Оформлення замовлення
document.getElementById('checkout-btn').addEventListener('click', function() {
    const checkoutModal = document.getElementById('checkout-modal');
    checkoutModal.style.display = 'flex';
    setTimeout(() => {
        checkoutModal.classList.remove('close');
    }, 10);
    updateCheckoutItems();
});

// Закриття вікна оформлення замовлення
document.getElementById('close-checkout-btn').addEventListener('click', function() {
    const checkoutModal = document.getElementById('checkout-modal');
    checkoutModal.classList.add('close');
    setTimeout(() => {
        checkoutModal.style.display = 'none';
    }, 500);
});

// Оновлення списку товарів при оформленні замовлення
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



document.getElementById('registration-form').addEventListener('submit', function(event) {
    // Отримуємо значення з полів
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var location = document.getElementById('location').value;

    // Перевірка на мінімальну кількість символів і обов'язковість полів
    if (name.length < 10 || email.length < 10 || location.length < 10) {
        alert("кожне поле має мати щонайменше 10 символів");
        event.preventDefault(); // Зупиняє відправку форми
        return; // Після цього форма не буде відправлена
    }

    // Якщо перевірка пройшла успішно, відправляємо повідомлення про успіх
    alert("Дякуємо за замовлення! Менеджер зв'яжеться з вами через пів години.");
});

