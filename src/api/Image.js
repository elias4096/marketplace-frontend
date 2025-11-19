import axios from "axios";

/*
function getImage(fileName) {
    return axios.get(`http://localhost:8080/images/${fileName}`, {
        responseType: 'blob',
    });
}
*/

function postImage(itemId, imageFile) {
    return axios.postForm('http://localhost:8080/images', {
        itemId: itemId,
        image: imageFile,
    });
}

export { postImage }
