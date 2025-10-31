import axios from "axios";
import { getCurrentUser } from "./Authentication.js";

function getItems() {
    return axios.get("http://localhost:8080/items")
        .then(response => response.data);
}

async function postItem(title, description, price) {
    const user = await getCurrentUser();

    if (user == null) {
        return {
            success: false,
            message: "Failed to upload item, user not logged in.",
            data: null,
        };
    }

    return axios.post('http://localhost:8080/items', {
        sellerUserId: user.id,
        sellerDisplayName: user.displayName,
        title: title,
        description: description,
        price: price
    }).then(function (response) {
        return {
            success: true,
            message: "Item uploaded successfully.",
            data: response.data,
        };
    }).catch(function () {
        return {
            success: false,
            message: "Failed to upload item, try again later.",
            data: null,
        };
    });
}

export { getItems, postItem };
