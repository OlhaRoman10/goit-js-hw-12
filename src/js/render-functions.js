import axios from "axios";
const API_KEY = "49321124-d9248d4be3ea0dc21aad93268";
const BASE_URL = "https://pixabay.com/api/";



export function fetchImages(query) {

    return axios.get(BASE_URL, {
        params: {
            key: API_KEY,
            q: query,
            image_type: "photo",
            orientation: "horizontal",
            safesearch: true,
        },
    })
        .then(response => {
            return response.data.hits
        })
        .catch(error => {
            console.error("Error fetching images:", error);
            return [];
        });
}



