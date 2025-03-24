import { fetchImages } from "./js/pixabay-api.js";
import { renderGallery } from "./js/render-functions.js"

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");
const loader = document.querySelector(".loader");
const input = form.querySelector("input[name='search-text']");
const gallery = document.querySelector(".gallery");
const loadMoreBtn = document.querySelector(".btn");

let totalHits = 0; // Загальна кількість знайдених зображень
let loadedImages = 0; // Кількість вже завантажених зображень
let currentQuery = ""; // Змінна для збереження поточного запиту

loader.classList.add("hidden");
loadMoreBtn.classList.add("hidden"); // Ховаємо кнопку "Load more" на старті

function showLoader() {
  loader.classList.remove("hidden");
}

function hideLoader() {
  loader.classList.add("hidden");
}

function showLoadMoreBtn() {
  loadMoreBtn.classList.remove("hidden");
}

function hideLoadMoreBtn() {
  loadMoreBtn.classList.add("hidden");
}
function smoothScroll() {
  const cardHeight = document.querySelector(".gallery-item")?.getBoundingClientRect().height || 0;
  window.scrollBy({
    top: cardHeight * 2,
    behavior: "smooth",
  });
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const query = input.value.trim();

        if (!query) {
        iziToast.error({ message: "Please enter a search query!" })
        return;
    }
     if (query !== currentQuery) {
    currentQuery = query;
         loadedImages = 0; // Скидаємо кількість завантажених зображень для нового запиту
         page = 1; // ВАЖЛИВО! Скидаємо пагінацію до першої сторінки
    }
    
    gallery.innerHTML = ""; // Очищаємо галерею перед новим пошуком
    hideLoadMoreBtn(); // Ховаємо кнопку "Load more" перед новим пошуком
    showLoader();

    try {
        const response = await fetchImages(query, true);
        if (!response || !response.images) throw new Error("Invalid response from API");

    const { images, totalHits: newTotalHits } = response;
        totalHits = newTotalHits; // Оновлюємо загальну кількість знайдених зображень
        loadedImages = images.length; // Оновлюємо кількість завантажених зображень
        
        if (images.length === 0) {
            iziToast.error({
                message: "Sorry, there are no images matching your search query. Please try again!", position: "topRight",
            });
        } else {
            renderGallery(images);
            if (loadedImages < totalHits) {
        showLoadMoreBtn(); // Показуємо кнопку "Load more", якщо є ще зображення
            }
        }
    } catch (error) {
        iziToast.error({ message: "Something went wrong. Please try again later." });
    } finally {
        hideLoader();
    }
});

loadMoreBtn.addEventListener("click", async () => {
  showLoader(); // Показуємо loader під час завантаження нової сторінки
        
  try {
      const response = await fetchImages(input.value.trim());
    if (!response || !response.images) throw new Error("Invalid response from API");

      const { images } = response;
      loadedImages += images.length; // Додаємо кількість завантажених зображень
    
    if (images.length === 0 || loadedImages >= totalHits) {
      iziToast.info({ message: "We're sorry, but you've reached the end of search results." });
      hideLoadMoreBtn(); // Ховаємо кнопку, якщо більше немає зображень
    } else {
      renderGallery(images, true); // Додаємо нові зображення до галереї
    }
  } catch (error) {
    iziToast.error({ message: "Something went wrong. Please try again later." });
  } finally {
    hideLoader(); // Завжди ховаємо loader після завантаження
  }
});
