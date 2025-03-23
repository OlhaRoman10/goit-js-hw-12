import { fetchImages } from "./js/pixabay-api.js";
import { renderGallery } from "./js/render-functions.js"

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");
const loader = document.querySelector(".loader");
const input = form.querySelector("input[name='search-text']");
const gallery = document.querySelector(".gallery");
const loadMoreBtn = document.querySelector(".btn");

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

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const query = input.value.trim();

        if (!query) {
        iziToast.error({ message: "Please enter a search query!" })
        return;
    }
    gallery.innerHTML = ""; // Очищаємо галерею перед новим пошуком

    hideLoadMoreBtn(); // Ховаємо кнопку "Load more" перед новим пошуком
    
    showLoader();

    try {
        const images = await fetchImages(query, true);
        if (images.length === 0) {
            iziToast.error({
                message: "Sorry, there are no images matching your search query. Please try again!", position: "topRight",
            });
        } else {
            renderGallery(images);
            showLoadMoreBtn(); // Показуємо кнопку "Load more", якщо є результати
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
    const images = await fetchImages(input.value.trim());
    
    if (images.length === 0) {
      iziToast.info({ message: "No more images to load." });
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
