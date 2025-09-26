import {useEffect, useState} from "react";
import {getCategories, getConditions} from "../api/Static.js";
import {createItem} from "../api/Item.js";

function Upload() {
    const [categories, setCategories] = useState([]);
    const [conditions, setConditions] = useState([]);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);

    useEffect(() => {
        async function fetchData() {
            setCategories(await getCategories());
            setConditions(await getConditions());
        }

        fetchData().catch(e => console.log(e));
    }, []);

    function onSubmit(e) {
        e.preventDefault();

        createItem(title, description, price)
            .catch((e) => console.log(e));
    }

    return (
        <>
            <h1>Upload a marketplace item</h1>
            <form onSubmit={onSubmit}>
                <label htmlFor="title">Title</label>
                <br/>
                <input type="text" id="title" value={title}
                       onChange={e => setTitle(e.target.value)}/>
                <br/>
                <label htmlFor="price">Price €</label>
                <br/>
                <input type="number" id="price" min="0" step="any" value={price}
                       onChange={e => setPrice(e.target.value)}/>
                <br/>
                <label htmlFor="category">Category</label>
                <br/>
                <select id="category">
                    {categories.map(x => (
                        <option key={x} value={x}>{x}</option>
                    ))}
                </select>
                <br/>
                <label htmlFor="condition">Condition</label>
                <br/>
                <select id="condition">
                    {conditions.map(x => (
                        <option key={x} value={x}>{x}</option>
                    ))}
                </select>
                <br/>
                <label htmlFor="description">Description</label>
                <br/>
                <textarea id="description" value={description}
                          onChange={e => setDescription(e.target.value)}></textarea>
                <br/>
                <input type="submit" value="Submit"/>
            </form>
        </>
    )
}

export default Upload;
