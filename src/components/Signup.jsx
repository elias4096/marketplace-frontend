import React, {useState} from 'react';
import {signup} from '../api/Authentication';
import ResultBox from "./ResultBox'.jsx";

function Signup() {
    const [result, setResult] = useState(null);

    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(e) {
        e.preventDefault();

        signup(displayName, email, password)
            .then(r => setResult(r))
            .catch(e => console.log(e));
    }

    return (
        <>
            <h2>Signup</h2>

            <ResultBox result={result}/>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Display Name"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    required
                />
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
                <button type="submit">Signup</button>
            </form>
        </>
    );
}

export default Signup;
