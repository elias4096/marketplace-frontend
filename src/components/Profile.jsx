import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Row, Col, Table, ButtonGroup, Button, Alert } from "react-bootstrap";
import { authenticatedUser } from '../api/Authentication';
import { getItemsByUserId, deleteItem } from '../api/Item.js';
import { formatDate, formatDateAndTime } from "../Utilities.js";
import { Loader } from "./Loader.jsx";

function Profile() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [userItems, setUserItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (sessionStorage.getItem("bearer-token")) {
            authenticatedUser().then(data => {
                setUser(data);
                updateUserItems(data.data.id);
            }).catch(() => {
                setError("Failed to get user.");
            }).finally(() => {
                setLoading(false);
            });
        }
        else {
            navigate("/login");
        }
    }, []);

    function updateUserItems(userId) {
        getItemsByUserId(userId).then(data => {
            setUserItems(data);
        }).catch(() => {
            setError("Failed to update user items.");
        });
    }

    function OnLogoutClick() {
        if (!sessionStorage.getItem("bearer-token")) return;

        sessionStorage.removeItem("bearer-token");
        window.location.reload();
    }

    function onDeleteItemClick(itemId) {
        deleteItem(itemId)
            .then(() => {
                updateUserItems(user.data.id);
            }).catch(() => {
                setError("Failed to delete item.");
            });
    }

    if (loading) return <Loader />;
    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <Container className="my-4">
            <Row className="justify-content-center">
                <Col lg={8}>
                    <h2 className="fw-bold">Account</h2>
                    <h6 className="text-muted">Manage account details here</h6>

                    <Container className="my-4 border border-dark rounded">
                        <Table borderless>
                            <thead>
                                <tr>
                                    <th className="text-muted">Display Name</th>
                                    <th className="text-muted">Email</th>
                                    <th className="text-muted">Member Since</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{user.data.displayName}</td>
                                    <td>{user.data.email}</td>
                                    <td>{formatDate(user.data.createdAt)}</td>
                                    <td className="text-end">
                                        <ButtonGroup size="sm">
                                            <Button onClick={() => OnLogoutClick()} variant="primary">Log out</Button>
                                        </ButtonGroup>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </Container>

                    <h2 className="fw-bold">Uploads</h2>
                    <h6 className="text-muted">Manage all your uploads here</h6>

                    <Container className="my-4 border border-dark rounded">
                        <Table className="m-0" borderless hover>
                            <thead>
                                <tr>
                                    <th className="text-muted">Title</th>
                                    <th className="text-muted">Price</th>
                                    <th className="text-muted">Upload Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userItems.map(i =>
                                    <tr key={i.id}>
                                        <td><Link to={`/item/${i.id}`} className="text-dark">{i.title}</Link></td>
                                        <td>{i.price}€</td>
                                        <td>{formatDateAndTime(i.createdAt)}</td>
                                        <td className="text-end">
                                            <ButtonGroup size="sm">
                                                <Button variant="dark">Edit</Button>
                                                <Button onClick={() => onDeleteItemClick(i.id)} variant="danger">Delete</Button>
                                            </ButtonGroup>
                                        </td>
                                    </tr>)}
                            </tbody>
                        </Table>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
}

export default Profile;
