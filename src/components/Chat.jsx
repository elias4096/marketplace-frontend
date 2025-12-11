import { useEffect, useState } from "react";

function Chat() {
    useEffect(() => {
        const socket = new WebSocket("ws://127.0.0.1:8080/websocket");

        socket.onopen = function (event) {
            console.log('WebSocket connection established');
            // socket.send('Hello server!');
        };

        socket.onmessage = function (event) {
            console.log('Message from server ', event.data);
        };

        socket.onclose = function (event) {
            console.log('WebSocket connection closed');
        };

        socket.onerror = function (error) {
            console.error('WebSocket error: ', error);
        }
    }, []);

    return (
        <h1>Chat</h1>
    );
}


export default Chat;
