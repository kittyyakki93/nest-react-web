import { io } from "socket.io-client";

// nest 서버
export const socket = io("http://localhost:10000");
