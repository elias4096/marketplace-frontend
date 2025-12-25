import { useEffect, useState } from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";
import { getItemById, putItem } from "../../api/Item";

function EditItemModal({ show, onClose, itemId }) {
    const categories = ["Electronics", "Books", "Clothing", "Furniture", "Toys"];
    const qualities = ["New", "Like New", "Used", "Poor"];
    const locations = ["Amsterdam", "Rotterdam", "Utrecht", "Den Haag", "Eindhoven"];

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(1);
    const [category, setCategory] = useState("");
    const [quality, setQuality] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (itemId == null) return;

        getItemById(itemId)
            .then(data => {
                setTitle(data.title);
                setPrice(data.price);
                setCategory(data.category);
                setQuality(data.quality);
                setLocation(data.location);
                setDescription(data.description);
            }).catch(() => {
                setError("Failed to load item data.");
            });
    }, [itemId]);

    if (error) return <Alert variant="danger">{error}</Alert>;

    function onSubmit(e) {
        e.preventDefault();

        putItem(itemId, title, description, price, category, quality, location)
            .then(() => {
                onClose();
            }).catch(error => {
                setError("Failed to save item.");
                console.error("Error saving item:", error);
            });
    }

    if (!show) return null;

    return (
        <Modal show={show} onHide={() => onClose()}>
            <Modal.Header closeButton>
                <Modal.Title>Edit item</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onSubmit}>
                    <Form.Label column="sm">Title</Form.Label>
                    <Form.Control type="text"
                        placeholder="Enter item title"
                        data-testid="title"
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
                        data-testid="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required />

                    <Button type="submit" variant="dark" className="w-100 my-2" data-testid="saveButton">Save</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default EditItemModal;
