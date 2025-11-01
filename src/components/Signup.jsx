import { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { Form, Row, Col, Button, Container, Alert } from "react-bootstrap";
import { signup } from '../api/Authentication';

function Signup() {
    const navigate = useNavigate();
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    function onSubmit(e) {
        e.preventDefault();

        signup(displayName, email, password)
            .then(() => {
                navigate("/login");
            }).catch(() => {
                setError("Failed to sign up, email may already be in use.");
            });
    }

    return (
        <Container className='my-4'>
            <Row className="justify-content-center">
                <Col lg={4}>
                    <h2 className="fw-bold">Sign up</h2>
                    <h6 className="text-muted">Join our marketplace community</h6>

                    <Container className="my-4 border border-dark rounded">
                        {error && <Alert variant="danger" className='my-2'>{error}</Alert>}

                        <Form onSubmit={onSubmit}>
                            <Form.Label column="sm">Display name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your display name"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                                required />

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

                            <Button type="submit" variant="dark" className="w-100 mt-4">Signup</Button>
                        </Form>

                        <div className="text-center my-2">
                            <Link to="/login" className="link-dark">Already have an account?</Link>
                        </div>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
}

export default Signup;
