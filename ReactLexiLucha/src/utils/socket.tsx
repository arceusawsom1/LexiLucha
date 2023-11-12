import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL =   'ws://192.168.105.204:8088/main';

export const socket = io(URL);
