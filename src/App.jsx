import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import Profile from "./components/Profile.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";

// npm run dev

function Home() {
    return <h1>Home</h1>;
}

function Upload() {
    return <h1>Upload</h1>;
}

function App() {
    return (
        <BrowserRouter>
            <nav>
                <Link to="/">Marketplace</Link>
                <Link to="/upload">Upload</Link>
                <Link to="/profile">Profile</Link>
            </nav>

            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/upload" element={<Upload/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
