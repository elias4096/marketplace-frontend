import axios from "axios";

async function signup(displayName, email, password) {
    await axios.post("http://localhost:8080/api/signup", {
        displayName: displayName,
        email: email,
        password: password
    }).catch(e => console.log(e));
}

async function login(email, password) {
    const response = await axios.post("http://localhost:8080/api/login", {
        email: email,
        password: password
    }).catch(e => console.log(e));

    return response != null ? response.data : undefined;
}


async function getCurrentUser() {
    const token = sessionStorage.getItem('bearer-token');

    const response = await axios.get("http://localhost:8080/api/user", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).catch(e => console.log(e));

    return response != null ? response.data : undefined;
}

export {signup, login, getCurrentUser};
