import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL =   'ws://${SOCKET_HOST:localhost}:8088/main';

export const socket = io(URL);
