import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from '../api/Authentication';
import ResultBox from "./ResultBox";

function Profile() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const result = await getCurrentUser();

            if (result.success == false) {
                logout();
            } else {
                setUser(result.data);
            }
        }

        if (sessionStorage.getItem("bearer-token")) {
            fetchData();
        }
        else {
            navigate("/login");
        }
    }, []);

    function logout() {
        if (sessionStorage.getItem("bearer-token")) {
            sessionStorage.removeItem("bearer-token");
            window.location.reload();
        }
    }

    return (
        <div>
            {!sessionStorage.getItem("bearer-token") ? (
                <ResultBox result={{
                    success: false,
                    message: "You are not authenticated.",
                    data: null
                }} />
            ) : (
                user == null ? (<h1>Loading...</h1>) : (
                    <>
                        <h1>Display name: {user.displayName}</h1>
                        <button onClick={logout}>Log out</button>
                    </>
                )
            )}
        </div>
    );
}

export default Profile;
