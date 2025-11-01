import axios from "axios";

function signup(displayName, email, password) {
    return axios.post("http://localhost:8080/signup", {
        displayName: displayName,
        email: email,
        password: password
    });
}

function login(email, password) {
    return axios.post("http://localhost:8080/login", {
        email: email,
        password: password,
    });
}

function authenticatedUser() {
    const token = sessionStorage.getItem('bearer-token');

    return axios.get("http://localhost:8080/user", {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}

export { signup, login, authenticatedUser };
