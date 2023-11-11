import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL =   'ws://192.168.1.47:8088/main'; 

export const socket = io(URL);
