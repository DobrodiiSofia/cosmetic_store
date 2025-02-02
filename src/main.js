let currentPosition = 0;

function scrollProduct(direction) {
    const productsContainer = document.querySelector('.products');
    const productWidth = document.querySelector('.product-item').offsetWidth + 30; // враховуємо margin

    if (direction === 'right') {
        if (currentPosition > -productsContainer.scrollWidth + window.innerWidth) return;
        currentPosition -= productWidth;
    } else if (direction === 'left') {
        if (currentPosition === 0) return;
        currentPosition += productWidth;
    }

    productsContainer.style.transform = `translateX(${currentPosition}px)`;
}
