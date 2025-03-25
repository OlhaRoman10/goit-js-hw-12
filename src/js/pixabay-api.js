import axios from "axios";
const API_KEY = "49321124-d9248d4be3ea0dc21aad93268";
const BASE_URL = "https://pixabay.com/api/";

export async function fetchImages(query, page) {
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
 
        return { images: response.data.hits || [],
            totalHits: response.data.totalHits || 0
        };
    } catch (error) {
        console.error("Error fetching images:", error);
        return { images: [], totalHits: 0 };
    }
}
            
      


