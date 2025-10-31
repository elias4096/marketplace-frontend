import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Button, Row, Col, Form } from "react-bootstrap";
import { login } from '../api/Authentication';
import ResultBox from "./ResultBox.jsx";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [result, setResult] = useState(null);

    async function onSubmit(e) {
        e.preventDefault();

        const result = await login(email, password);
        setResult(result);

        if (result.success) {
            sessionStorage.setItem('bearer-token', result.data.token);
            navigate("/profile");
        }
    }

    return (
        <Row className="justify-content-center">
            <Col lg={4}>
                <h5 className="mt-3 text-center text-dark">Login to your marketplace account</h5>

                <ResultBox result={result} />

                <Form onSubmit={onSubmit}>
                    <Form.Label column="sm">Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required />

                    <Form.Label column="sm">Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required />

                    <Button type="submit" variant="dark" className="w-100 mt-3">Login</Button>
                </Form>

                <div className="text-center mt-3">
                    <Link to="/signup" className="link-dark">Don't have an account?</Link>
                </div>
            </Col>
        </Row>
    );
}

export default Login;
