import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const gallery = document.querySelector(".gallery");
let lightbox = null; // Зберігаємо lightbox для оновлення

export function renderGallery(images, append = false) {
  try {
    if (!append) {
      gallery.innerHTML = ""; // Очищаємо галерею тільки при новому пошуку
    }

    const markup = images.map(image => `
      <li class="gallery-item">
        <a href="${image.largeImageURL}" class="gallery-link">
          <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy">
        </a>
        <div class="info">
          <p><span class="matter">Likes:</span> ${image.likes}</p>
          <p><span class="matter">Views:</span> ${image.views}</p>
          <p><span class="matter">Comments:</span> ${image.comments}</p>
          <p><span class="matter">Downloads:</span> ${image.downloads}</p>
        </div>
      </li>
    `).join("");

    gallery.insertAdjacentHTML("beforeend", markup); // Додаємо нові зображення

    if (!lightbox) {
      lightbox = new SimpleLightbox(".gallery a", {
        captionsData: "alt",
        captionDelay: 250
      });
    } else {
      lightbox.refresh(); // Оновлюємо lightbox при додаванні нових картинок
    }
  } catch (error) {
    console.error("Error rendering gallery:", error);
  }
}
