import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Table, Carousel, Image, Badge, Button, Alert } from "react-bootstrap";
import { Loader } from "./Loader.jsx";
import { getItemById } from "../api/Item.js";
import { formatDate } from "../Utilities.js";

function Item() {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getItemById(id).then(data => {
            setItem(data);
        }).catch(() => {
            setError("Failed to fetch item.");
        }).finally(() => {
            setLoading(false);
        });
    }, [id]);

    if (loading) return <Loader />;
    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <Container className="py-4">
            <Row className="justify-content-center">
                <Col lg={8}>
                    <Row>
                        <Carousel>
                            <Carousel.Item
                                className="d-flex justify-content-center bg-dark"
                                style={{ height: 512 }}>
                                <Image
                                    src="../src/assets/images.jpg"
                                    alt="../src/assets/react.svg"
                                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                />
                            </Carousel.Item>
                        </Carousel>
                    </Row>
                    <Row>
                        <Col>
                            <div className="d-flex justify-content-between">
                                <h1 className="fw-light">{item.title}</h1>
                                <h3 className="fw-bold">{item.price}€</h3>
                            </div>

                            <Table hover>
                                <tbody>
                                    <tr>
                                        <td className="text-muted">Seller</td>
                                        <td>{item.sellerDisplayName}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-muted">Category</td>
                                        <td>{item.category}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-muted">Quality</td>
                                        <td><Badge bg="dark">{item.quality}</Badge></td>
                                    </tr>
                                    <tr>
                                        <td className="text-muted">Location</td>
                                        <td>{item.location}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-muted">Date</td>
                                        <td>{formatDate(item.createdAt)}</td>
                                    </tr>
                                </tbody>
                            </Table>

                            <Button variant="dark" className="w-100">
                                Chat with {item.sellerDisplayName}
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <div className="mt-2">
                            <h5 className="fw-bold">Description</h5>
                            <p>{item.description}</p>
                        </div>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default Item;
