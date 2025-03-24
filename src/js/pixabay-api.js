import axios from "axios";
const API_KEY = "49321124-d9248d4be3ea0dc21aad93268";
const BASE_URL = "https://pixabay.com/api/";

let page = 1;
let currentQuery = ""; // Глобальна змінна для збереження запиту
let totalHits = 0;

export async function fetchImages(query, isNewSearch = false) {
    if (isNewSearch) {
        page = 1; // Якщо новий пошук — скидаємо сторінку
        currentQuery = query; // Оновлюємо збережений запит
         totalHits = 0; // Скидаємо загальну кількість результатів
    }
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                key: API_KEY,
                q: query,
                image_type: "photo",
                orientation: "horizontal",
                safesearch: true,
                per_page: 15,
                page: page, // Передаємо поточну сторінку
            }
        });
 if (isNewSearch) {
            totalHits = response.data.totalHits; // Отримуємо загальну кількість зображень
        }

 if (response.data.hits.length > 0) {
 page += 1; // Збільшуємо сторінку тільки якщо отримали результати
        }    
        return { images:response.data.hits, totalHits }; //не дуже тут зрозуміла
    } catch (error) {
        console.error("Error fetching images:", error);
        return { images: [], totalHits: 0 };
    }
}
            
      


