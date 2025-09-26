import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {getCurrentUser} from '../api/Authentication';

function logout() {
    if (sessionStorage.getItem("bearer-token")) {
        sessionStorage.removeItem("bearer-token");
        window.location.reload();
    }
}

function Profile() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const user = await getCurrentUser();

            if (user == null) {
                logout();
            }

            setUser(user);
        }

        if (sessionStorage.getItem("bearer-token")) {
            fetchData().catch(e => console.log(e));
        }
    }, []);

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
                    <h1>{user ? `You are logged in as: ${user.displayName}` : "Loading..."}</h1>
                    <button onClick={logout}>Log out</button>
                </>
            )}
        </div>
    );
}

export default Profile;
