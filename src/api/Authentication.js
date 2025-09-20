export async function AccountSignup(email, password) {
    const response = await fetch('http://localhost:8080/api/signup', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    });

    return await response.text();
}

export async function AccountLogin(email, password) {
    const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    });

    return await response.text();
}
