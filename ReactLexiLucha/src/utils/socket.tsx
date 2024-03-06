import { io } from 'socket.io-client';
import { SOCKET_PATH, SOCKET_URL } from './constants';

const URL = SOCKET_URL;
const PATH = SOCKET_PATH;
export const socket = io(URL,{
    path:PATH  //This sets the handshake url (which is used to setup the duplex connection)
});
