import { io } from 'socket.io-client';

const URL = import.meta.env.VITE_SOCKET_BUILD; 
const PATH = import.meta.env.VITE_PATH;
console.log(URL)
export const socket = io(URL,{
    path:PATH  //Change this to only be used in prod
});
