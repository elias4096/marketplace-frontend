import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {login} from '../api/Authentication';

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        const token = await login(email, password);
        sessionStorage.setItem('bearer-token', token);

        navigate("/profile");
    }

    return (
        <>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </>
    );
}

export default Login;
