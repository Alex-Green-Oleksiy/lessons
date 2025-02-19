// Строгий режим
"use strict";

// Задаємо обробник подій для елементів з класом .item
document.querySelectorAll(".item").forEach((item) => {
    item.addEventListener("click", function () {
        // Додаємо або видаляємо клас active при кліку
        this.classList.toggle("active");
    });
});

// Коли сторінка завантажується, додаємо клас loaded до body
window.addEventListener("load", function () {
    document.body.classList.add("loaded");
});

// Задаємо змінні для header та footer
const header = document.querySelector("header");
const footer = document.querySelector("footer");

// Додаємо та видаляємо клас hovered для footer при наведенні миші на header
header.addEventListener("mouseenter", function () {
    footer.classList.add("hovered");
});

header.addEventListener("mouseleave", function () {
    footer.classList.remove("hovered");
});

// Функція для перевірки, чи елемент у видимій області екрану
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
            (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <=
            (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Функція для запуску лічильника
function startCounter(item) {
    const maxCount = parseInt(item.dataset.maxCount, 10);
    const delay = parseInt(item.dataset.delay, 10);

    let count = 1;
    const interval = setInterval(() => {
        if (count > maxCount) {
            clearInterval(interval);
            return;
        }
        item.textContent = count;
        count++;
    }, delay);
}

// Знаходимо елемент з data-атрибутами
const item = document.querySelector(".item[data-max-count][data-delay]");

// Функція для перевірки видимості елемента та запуску лічильника
function checkAndStartCounter() {
    if (isElementInViewport(item)) {
        startCounter(item);
        window.removeEventListener("scroll", checkAndStartCounter);
    }
}

// Додаємо обробники подій для прокручування та завантаження сторінки
window.addEventListener("scroll", checkAndStartCounter);
window.addEventListener("load", checkAndStartCounter);
