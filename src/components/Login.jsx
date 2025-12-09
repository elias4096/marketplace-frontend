import { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { Form, Row, Col, Button, Container, Alert } from "react-bootstrap";
import { login } from '../api/Authentication';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    function onSubmit(e) {
        e.preventDefault();

        login(email, password)
            .then(response => {
                sessionStorage.setItem('bearer-token', response.data.token);
                navigate("/profile");
            }).catch(() => {
                setError("Failed to login, check your credentials.");
            });
    }

    return (
        <Container className="my-4">
            <Row className="justify-content-center">
                <Col lg={4}>
                    <h2 className="fw-bold">Log in</h2>
                    <h6 className="text-muted">Log in to access your profile</h6>

                    <Container className="my-4 border border-dark rounded">
                        {error && <Alert variant="danger" className='my-2'>{error}</Alert>}

                        <Form onSubmit={onSubmit}>
                            <Form.Label column="sm">Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter your email"
                                data-testid="loginEmail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required />

                            <Form.Label column="sm">Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter your password"
                                data-testid="loginPassword"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required />

                            <Button type="submit" variant="dark" className="w-100 mt-4" data-testid="loginButton">Log in</Button>
                        </Form>

                        <div className="text-center my-2">
                            <Link to="/signup" className="link-dark">Don't have an account?</Link>
                        </div>
                    </Container>
                </Col>
            </Row>
        </Container>
    )
}

export default Login;
