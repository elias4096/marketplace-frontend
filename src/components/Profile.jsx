import {Link, useNavigate} from "react-router-dom";

function Logout() {
    const navigate = useNavigate();

    if (sessionStorage.getItem("bearer-token")) {
        sessionStorage.removeItem("bearer-token");
        navigate("/profile");
    }
}

function Profile() {
    if (!sessionStorage.getItem("bearer-token")) {
        return (
            <nav>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
            </nav>
        );
    }
    else {
        return (
            <div>
            <h1>You are logged in!</h1>
                <button onClick={Logout}>Log out</button>
            </div>
        )
    }
}

export default Profile;
