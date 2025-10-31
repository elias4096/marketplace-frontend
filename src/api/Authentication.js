import axios from "axios";

function signup(displayName, email, password) {
    return axios.post("http://localhost:8080/signup", {
        displayName: displayName,
        email: email,
        password: password
    }).then(function (response) {
        return {
            success: true,
            message: "Successful signup.",
            data: response.data,
        };
    }).catch(function () {
        return {
            success: false,
            message: "Failed to signup, email may already be in use.",
            data: null,
        };
    });
}

function login(email, password) {
    return axios.post("http://localhost:8080/login", {
        email: email,
        password: password
    }).then(function (response) {
        return {
            success: true,
            message: "Successful login.",
            data: response.data,
        };
    }).catch(function () {
        return {
            success: false,
            message: "Failed to login, check your credentials and try again.",
            data: null,
        };
    });
}

function getCurrentUser() {
    const token = sessionStorage.getItem('bearer-token');

    if (token == null) {
        return {
            success: false,
            message: "Failed to find current user, you are not authenticated.",
            data: null,
        };
    }

    return axios.get("http://localhost:8080/user", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(function (response) {
        return {
            success: true,
            message: "Found current user successfully.",
            data: response.data,
        };
    }).catch(function () {
        return {
            success: false,
            message: "Failed to find current user, please try again.",
            data: null,
        };
    });
}

export { signup, login, getCurrentUser };
