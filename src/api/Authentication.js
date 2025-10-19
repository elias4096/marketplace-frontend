import axios from "axios";

// Returns newly created user if signup is successful, throws exception otherwise.
async function signup(displayName, email, password) {
    const response = await axios.post("http://localhost:8080/signup", {
        displayName: displayName,
        email: email,
        password: password
    }).catch(e => { throw e; });

    return response.data;
}

// Returns bearer token if login is successful, throws exception otherwise.
async function login(email, password) {
    const response = await axios.post("http://localhost:8080/login", {
        email: email,
        password: password
    }).catch(e => { throw e; });

    return response.data;
}

// Returns current user if token is valid, null otherwise.
async function getCurrentUser() {
    const token = sessionStorage.getItem('bearer-token');

    const response = await axios.get("http://localhost:8080/user", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).catch(e => console.error(e));

    return response != null ? response : null;
}

export { signup, login, getCurrentUser };
