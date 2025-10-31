import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { getItems } from "../api/Item.js";

function Home() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        async function fetchData() {
            setItems(await getItems());
        }

        fetchData().catch(e => console.log(e));
    }, []);

    return (
        <Container className="py-4">
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                    gap: '1rem',
                    justifyItems: 'center'
                }}
            >
                {items.map((item, index) => (
                    <Card as={Link} to={`/item/${item.id}`}
                        key={item.id ?? index}
                        style={{ width: '100%', maxWidth: 400 }}>
                        <Card.Img
                            variant="top"
                            src={item.imageUrl || 'src/assets/react.svg'}
                            style={{ objectFit: 'contain', height: 300 }}
                        />

                        <Card.Body>
                            <Card.Title>{item.title}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">2025-10-20</Card.Subtitle>

                            <div className="d-flex justify-content-between align-items-start">
                                <Card.Text><b>{item.price}€</b></Card.Text>
                                <Card.Text className="text-end">Eindhoven</Card.Text>
                            </div>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </Container>
    );
}

export default Home;
