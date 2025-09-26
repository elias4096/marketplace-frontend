import {useEffect, useState} from "react";
import {getItems} from "../api/Item.js";

function Home() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        async function fetchData() {
            setItems(await getItems());
        }

        fetchData().catch(e => console.log(e));
    }, []);

    return (
        <>
            {items.map((item, index) => (
                <div style={{backgroundColor: "orange"}}>
                    <h1>{item.title} ({index})</h1>
                    <p>{item.description}</p>
                    <p>{item.price}€</p>
                    <p>Seller: {item.sellerDisplayName} ({item.sellerUserId})</p>
                </div>
            ))}
        </>
    );
}

export default Home;
