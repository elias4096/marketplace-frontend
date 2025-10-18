import { useState } from 'react';
import { Link } from "react-router-dom";
import { Form, Button, Col, Row, Container } from "react-bootstrap";
import { signup } from '../api/Authentication';

function Signup() {
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function onSubmit(e) {
        e.preventDefault();

        signup(displayName, email, password)
            .then(r => setResult(r))
            .catch(e => console.log(e));
    }

    return (
        <Row className="justify-content-center">
            <Col md={4}>
                <h5 className="mt-3 text-center text-dark">Join our marketplace community</h5>

                <Form onSubmit={onSubmit}>
                    <Form.Group controlId="formDisplayName">
                        <Form.Label column="sm">Display name</Form.Label>
                        <Form.Control type="text"
                            placeholder="Enter your display name"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            required />
                    </Form.Group>

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

                    <Button variant="dark" type="submit" className="w-100 mt-3">Signup</Button>
                </Form>

                <Container className="text-center mt-3">
                    <Link to="/login" className="link-dark">Already have an account?</Link>
                </Container>
            </Col>
        </Row>
    );
}

export default Signup;
