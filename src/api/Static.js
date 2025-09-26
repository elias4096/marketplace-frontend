import axios from "axios";

async function getCategories() {
    const response = await axios
        .get("http://localhost:8080/api/static/categories")
        .catch((e) => console.log(e));

    return response.data;
}

async function getConditions() {
    const response = await axios
        .get("http://localhost:8080/api/static/conditions")
        .catch((e) => console.log(e));

    return response.data;
}

export {getCategories, getConditions};