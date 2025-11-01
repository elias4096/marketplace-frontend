import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import ListGroup from 'react-bootstrap/ListGroup';
import Stack from 'react-bootstrap/Stack';
import { getItems } from "../api/Item.js";
import { formatDate } from "../Utilities.js";

function Home() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        async function fetchData() {
            setItems(await getItems());
        }

        fetchData();
    }, []);

    const listItems = items.map(i =>
        <ListGroup.Item key={i.id} as={Link} to={`/item/${i.id}`}>
            <Stack direction="horizontal" gap={3}>
                <img
                    width={100}
                    src={"src/assets/react.svg"}
                    alt={"src/assets/react.svg"}
                />

                <Stack>
                    <div className="d-flex justify-content-between">
                        <p className="fw-light fst-italic"><b>Category: </b>{i.category} ‣ <b>Quality: </b>{i.quality}</p>
                        <p className="text-end fw-light">{formatDate(i.createdAt)}</p>
                    </div>

                    <p>{i.title}</p>

                    <div className="d-flex justify-content-between">
                        <p><b>{i.price}€</b></p>
                        <p className="text-end fw-light">{i.location}</p>
                    </div>
                </Stack>
            </Stack>
        </ListGroup.Item>
    );

    return (
        <Row className="justify-content-center">
            <Col lg={8}>
                <ListGroup>{listItems}</ListGroup>
            </Col>
        </Row>
    )
}

export default Home;
