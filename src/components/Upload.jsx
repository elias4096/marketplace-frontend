import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Row, Col, Button, Alert, Container } from "react-bootstrap";
import { postItem } from "../api/Item.js";
import { Loader } from "./Loader.jsx";
import { postImage } from "../api/Image.js";

function Upload() {
    const categories = ["Electronics", "Books", "Clothing", "Furniture", "Toys"];
    const qualities = ["New", "Like New", "Used", "Poor"];
    const locations = ["Amsterdam", "Rotterdam", "Utrecht", "Den Haag", "Eindhoven"];

    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(1);
    const [category, setCategory] = useState("");
    const [quality, setQuality] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        setCategory(categories[0] || '---');
        setQuality(qualities[0] || '---');
        setLocation(locations[0] || '---');
        setLoading(false);
    }, []);

    function onImageChange(e) {
        e.preventDefault();
        setImage(e.target.files[0]);
    }

    function onSubmit(e) {
        e.preventDefault();

        postItem(title, description, price, category, quality, location)
            .then(item => {
                postImage(item.data.id, image)
                    .catch(e => {
                        setError(e);
                        return;
                    });

                navigate("/profile");
            }).catch(() => {
                setError("Failed to post item.");
            });
    }

    if (loading) return <Loader />;
    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <Container className="my-4">
            <Row className="justify-content-center">
                <Col lg={4}>
                    <h2 className="fw-bold">Upload</h2>
                    <h6 className="text-muted">Fill in the fields below to upload an item</h6>

                    <Container className="my-4 border border-dark rounded">
                        <Form onSubmit={onSubmit}>
                            <Form.Label column="sm">Title</Form.Label>
                            <Form.Control type="text"
                                placeholder="Enter item title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required />

                            <Form.Label column="sm">Price €</Form.Label>
                            <Form.Control
                                type="number"
                                min="0"
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                                required />

                            <Form.Label column="sm">Category</Form.Label>
                            <Form.Control
                                as="select"
                                value={category}
                                onChange={e => setCategory(e.target.value)}
                                required>
                                {categories.map(x => <option key={x} value={x}>{x}</option>)}
                            </Form.Control>

                            <Form.Label column="sm">Quality</Form.Label>
                            <Form.Control
                                as="select"
                                value={quality}
                                onChange={e => setQuality(e.target.value)}
                                required>
                                {qualities.map(x => <option key={x} value={x}>{x}</option>)}
                            </Form.Control>

                            <Form.Label column="sm">Location</Form.Label>
                            <Form.Control
                                as="select"
                                value={location}
                                onChange={e => setLocation(e.target.value)}
                                required>
                                {locations.map(x => <option key={x} value={x}>{x}</option>)}
                            </Form.Control>

                            <Form.Label column="sm">Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder="Describe your item in detail"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required />

                            <Form.Label column="sm">Upload pictures of your item</Form.Label>
                            <Form.Control
                                type="file"
                                accept="image/*"
                                onChange={onImageChange} />

                            <Button type="submit" variant="dark" className="w-100 my-2">Upload</Button>
                        </Form>
                    </Container>
                </Col>
            </Row>
        </Container>
    )
}

export default Upload;
