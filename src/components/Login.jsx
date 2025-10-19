import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Col, Row, Container, Alert } from "react-bootstrap";
import { login } from '../api/Authentication';

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');

    async function onSubmit(e) {
        e.preventDefault();

        login(email, password)
            .then(r => {
                sessionStorage.setItem('bearer-token', r.token);
                navigate("/profile");
            })
            .catch(e => {
                setError("Login failed. Please check your credentials and try again.");
                console.error(e);
            });
    }

    return (
        <Row className="justify-content-center">
            <Col md={4}>
                <h5 className="mt-3 text-center text-dark">Login to your marketplace account</h5>

                {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

                <Form onSubmit={onSubmit}>
                    <Form.Group controlId="formEmail">
                        <Form.Label column="sm">Email</Form.Label>
                        <Form.Control type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required />
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                        <Form.Label column="sm">Password</Form.Label>
                        <Form.Control type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required />
                    </Form.Group>

                    <Button variant="dark" type="submit" className="w-100 mt-3">Login</Button>
                </Form>

                <Container className="text-center mt-3">
                    <Link to="/signup" className="link-dark">Don't have an account?</Link>
                </Container>
            </Col>
        </Row>
    );
}

export default Login;
