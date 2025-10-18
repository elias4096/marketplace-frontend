import React, {useEffect, useState} from "react";
import {getCategories, getConditions} from "../api/Static.js";
import {createItem} from "../api/Item.js";
import {Button, Col, Form, Row} from "react-bootstrap";

function Upload() {
    const [categories, setCategories] = useState([]);
    const [conditions, setConditions] = useState([]);

    const [title, setTitle] = useState('');
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState(0);
    const [condition, setCondition] = useState(0);
    const [description, setDescription] = useState('');

    useEffect(() => {
        async function fetchData() {
            setCategories(await getCategories());
            setConditions(await getConditions());
        }

        fetchData().catch(e => console.log(e));
    }, []);

    function onSubmit(e) {
        e.preventDefault();

        createItem(title, description, price)
            .catch((e) => console.log(e));
    }

    return (
        <Row className="justify-content-center">
            <Col md={4}>
                <h5 className="mt-3 text-center text-dark">
                    Fill out the details below to upload your item to the marketplace
                </h5>

                <Form onSubmit={onSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label column="sm">Title</Form.Label>
                        <Form.Control type="text"
                                      placeholder="Enter item title"
                                      value={title}
                                      onChange={(e) => setTitle(e.target.value)}
                                      required/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label column="sm">Price €</Form.Label>
                        <Form.Control
                            type="number"
                            min="0"
                            step="any"
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label column="sm">Category</Form.Label>
                        <Form.Control
                            as="select"
                            value={category}
                            onChange={e => setCategory(e.target.value)}
                            required>
                            {categories.map(x => (
                                <option key={x} value={x}>{x}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label column="sm">Condition</Form.Label>
                        <Form.Control
                            as="select"
                            value={condition}
                            onChange={e => setCondition(e.target.value)}
                            required>
                            {conditions.map(x => (
                                <option key={x} value={x}>{x}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label column="sm">Description</Form.Label>
                        <Form.Control as="textarea"
                                      placeholder="Describe your item in detail"
                                      value={description}
                                      onChange={(e) => setDescription(e.target.value)}
                                      required/>
                    </Form.Group>

                    <Button variant="dark" type="submit" className="w-100">Upload</Button>
                </Form>
            </Col>
        </Row>
    )
}

export default Upload;
