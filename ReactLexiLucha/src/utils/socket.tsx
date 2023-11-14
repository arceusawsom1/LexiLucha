import { io } from 'socket.io-client';

const URL = import.meta.env.VITE_SOCKET_BUILD; 

console.log(URL)
export const socket = io(URL,{
    path:"/api/socket/socket.io"  //Change this to only be used in prod
});
