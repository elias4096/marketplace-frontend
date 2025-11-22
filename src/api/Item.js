import axios from "axios";
import { authenticatedUser } from "./Authentication.js";

function getItemById(itemId) {
    return axios.get(`http://localhost:8080/items/${itemId}`)
        .then(response => response.data);
}

function getItems() {
    return axios.get("http://localhost:8080/items")
        .then(response => response.data);
}

function getItemsByUserId(userId) {
    const token = sessionStorage.getItem('bearer-token');

    return axios.get(`http://localhost:8080/user/items/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
        }
    }).then(response => response.data);
}

function postItem(title, description, price, category, quality, location) {
    return authenticatedUser()
        .then(response => {
            return axios.post('http://localhost:8080/items', {
                sellerUserId: response.data.id,
                sellerDisplayName: response.data.displayName,
                title: title,
                description: description,
                price: price,
                category: category,
                quality: quality,
                location: location,
            });
        });
}

function deleteItem(itemId) {
    const token = sessionStorage.getItem('bearer-token');

    return axios.delete(`http://localhost:8080/user/items/${itemId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

export { getItemById, getItems, getItemsByUserId, postItem, deleteItem };
