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


