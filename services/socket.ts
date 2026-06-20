import { API_BASE_URL } from "../constants";

const WS_URL = API_BASE_URL
    .replace("http", "ws");

let socket: WebSocket | null = null;

export const connectSocket = (
    matchId: number,
    onCommentary: (data: any) => void
) => {

    socket = new WebSocket(`${WS_URL}/ws`);

    socket.onopen = () => {
        console.log("Connected");

        socket?.send(
            JSON.stringify({
                type: "subscribe",
                matchId
            })
        );
    };

    socket.onmessage = (event) => {
        const message = JSON.parse(event.data);

        console.log("WS:", message);

        if (message.type === "commentary") {
            onCommentary(message.data);
        }
    };

    socket.onclose = () => {
        console.log("Disconnected");
    };

    return socket;
};

export const disconnectSocket = () => {
    socket?.close();
};