import { useEffect, useState } from "react";
import { Button, Row, Col, Form } from "react-bootstrap";
import { getCategories, getConditions } from "../api/Static.js";
import { postItem } from "../api/Item.js";
import ResultBox from "./ResultBox.jsx";

function Upload() {
    const [categories, setCategories] = useState([]);
    const [conditions, setConditions] = useState([]);

    const [title, setTitle] = useState('');
    const [price, setPrice] = useState(1);
    const [category, setCategory] = useState('');
    const [condition, setCondition] = useState('');
    const [description, setDescription] = useState('');

    const [result, setResult] = useState(null);

    useEffect(() => {
        async function fetchData() {
            setCategories(await getCategories());
            setConditions(await getConditions());
        }

        fetchData();
    }, []);

    async function onSubmit(e) {
        e.preventDefault();

        const result = await postItem(title, description, price);
        setResult(result);
    }

    return (
        <Row className="justify-content-center">
            <Col lg={4}>
                <h5 className="mt-3 text-center text-dark">
                    Fill out the details below to upload your item to the marketplace
                </h5>

                <ResultBox result={result} />

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

                    <Form.Label column="sm">Condition</Form.Label>
                    <Form.Control
                        as="select"
                        value={condition}
                        onChange={e => setCondition(e.target.value)}
                        required>
                        {conditions.map(x => <option key={x} value={x}>{x}</option>)}
                    </Form.Control>

                    <Form.Label column="sm">Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        placeholder="Describe your item in detail"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required />

                    <Button type="submit" variant="dark" className="w-100 mt-3">Upload</Button>
                </Form>
            </Col>
        </Row>
    )
}

export default Upload;
