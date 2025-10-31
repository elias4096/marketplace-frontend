import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { signup } from '../api/Authentication';
import ResultBox from "./ResultBox.jsx";

function Signup() {
    const navigate = useNavigate();

    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [result, setResult] = useState(null);

    async function onSubmit(e) {
        e.preventDefault();

        const result = await signup(displayName, email, password);
        setResult(result);

        if (result.success) {
            navigate("/login");
        }
    }

    return (
        <Row className="justify-content-center">
            <Col lg={4}>
                <h5 className="mt-3 text-center text-dark">Join our marketplace community</h5>

                <ResultBox result={result} />

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

                    <Button type="submit" variant="dark" className="w-100 mt-3">Signup</Button>
                </Form>

                <div className="text-center mt-3">
                    <Link to="/login" className="link-dark">Already have an account?</Link>
                </div>
            </Col>
        </Row>
    );
}

export default Signup;
