import { Container, Navbar, Nav } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home.jsx";
import Item from "./components/Item.jsx";
import Upload from "./components/Upload.jsx";
import Profile from "./components/Profile.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import Chat from "./components/Chat.jsx";

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <BrowserRouter>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="/">Marketplace</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/upload">Upload</Nav.Link>
                            <Nav.Link href="/profile">Profile</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <main>
                <Container>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/item/:id" element={<Item />} />
                        <Route path="/upload" element={<Upload />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/chat" element={<Chat />} />
                    </Routes>
                </Container>
            </main>
        </BrowserRouter>
    );
}

export default App;
