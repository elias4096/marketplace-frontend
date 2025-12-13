import { useEffect, useState } from "react";
import { Client } from '@stomp/stompjs';
import { Form, Row, Col, Button, Alert, Container } from "react-bootstrap";
import { authenticatedUser } from '../api/Authentication';
import { Loader } from "./Loader.jsx";

function Chat() {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [client, setClient] = useState(null);

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (sessionStorage.getItem("bearer-token")) {
            authenticatedUser().then(data => {
                setUser(data);
                console.log(data);

                const client = new Client({
                    brokerURL: 'ws://127.0.0.1:8080/websocket',
                    onConnect: () => {
                        client.subscribe('/topic/public', handleMessageReceived);
                        client.publish({ destination: '/topic/public', body: `${data.data.displayName} connected` });
                    },
                });

                client.activate();
                setClient(client);
            }).catch(() => {
                setError("Failed to get user.");
            }).finally(() => {
                setLoading(false);
            })
        };
    }, []);

    function handleMessageReceived(message) {
        setMessages(prevMessages => [...prevMessages, message.body]);
    }

    function onSubmit(e) {
        e.preventDefault();
        // Send message via WebSocket
        client.publish({ destination: '/topic/public', body: `${user.data.displayName}: ${message}` });
        setMessage("");
    }

    if (loading) return <Loader />;
    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <Container className="my-4">
            <Row className="justify-content-center">
                <Col lg={4}>
                    <h2 className="fw-bold">Chat</h2>
                    <h6 className="text-muted">If this does not work, I will be very angry at Jessica!</h6>

                    {
                        messages.map((msg, index) => (
                            <div key={index} className="border border-dark rounded my-2 p-2">
                                {msg}
                            </div>
                        ))
                    }

                    <Container className="my-4 border border-dark rounded">
                        <Form onSubmit={onSubmit}>
                            <Form.Label column="sm">Message</Form.Label>
                            <Form.Control type="text"
                                placeholder="Enter your message"
                                data-testid="message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required />

                            <Button type="submit" variant="dark" className="w-100 my-2" data-testid="sendButton">Send</Button>
                        </Form>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
}


export default Chat;
