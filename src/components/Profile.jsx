import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser } from '../api/Authentication';

function logout() {
    if (sessionStorage.getItem("bearer-token")) {
        sessionStorage.removeItem("bearer-token");
        window.location.reload();
    }
}

function Profile() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const user = await getCurrentUser();

            console.log("Fetched current user:", user);

            if (user == null) {
                logout();
            }

            setUser(user);
        }

        if (sessionStorage.getItem("bearer-token")) {
            fetchData().catch(e => console.log(e));
        }
        else {
            navigate("/login");
        }
    }, [navigate]);

    const authenticated = sessionStorage.getItem("bearer-token");

    return (
        <div>
            {!authenticated ? (
                <nav>
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Signup</Link>
                </nav>
            ) : (
                <>
                    <h1>{user ? `You are logged in as: ${user.data.displayName}` : "Loading..."}</h1>
                    <button onClick={logout}>Log out</button>
                </>
            )}
        </div>
    );
}

export default Profile;
