import axios from "axios";
import {getCurrentUser} from "./Authentication.js";

async function getItems() {
    const response = await axios.get("http://localhost:8080/api/items")
        .catch((e) => console.log(e));

    return response.data;
}

async function createItem(title, description, price) {
    const user = await getCurrentUser();

    await axios.post("http://localhost:8080/api/items", {
        sellerUserId: user.id,
        sellerDisplayName: user.displayName,
        title: title,
        description: description,
        price: price
    }).catch(e => console.log(e));
}

export {getItems, createItem};
