import axios from "axios";
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";

export function renderGallery(images) {
    const gallery = document.querySelector(".gallery");
    
 
  
  gallery.innerHTML = images.map(image => `
    <li class="gallery-item">
      <a href="${image.largeImageURL}" class="gallery-link">
        <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy">
      </a>
      <div class="info">
        <p><span class="matter">Likes</span> ${image.likes}</p>
        <p><span class="matter">Views</span> ${image.views}</p>
        <p><span class="matter">Comments</span> ${image.comments}</p>
        <p><span class="matter">Downloads</span> ${image.downloads}</p>
      </div>
    </li>
  `).join("");
    const lightbox = new SimpleLightbox(".gallery a", {
        captionsData: "alt", 
        captionDelay: 250 
    });

    lightbox.refresh();
}





