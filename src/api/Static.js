import axios from "axios";

function getCategories() {
    return axios.get("http://localhost:8080/static/categories")
        .then(response => response.data);
}

function getConditions() {
    return axios.get("http://localhost:8080/static/conditions")
        .then(response => response.data);
}

export { getCategories, getConditions };