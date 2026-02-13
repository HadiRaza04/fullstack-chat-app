import { Server } from 'socket.io';
import { FRONTEND_URL } from '../env.js';

const userSocketMap = {};
let io;

export const initSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: [FRONTEND_URL],
            methods: ["GET", "POST"]
        }
    });
    io.on("connection", (socket) => {
        console.log("A user connected to server", socket.id);

        const userId = socket.handshake.query.userId;
        if(userId) {
            userSocketMap[userId] = socket.id;
        }
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
        socket.on("disconnect", () => {
            console.log("A user disconnected from server", socket.id);
            delete userSocketMap[userId];
            io.emit("getOnlineUsers", Object.keys(userSocketMap));
        })
    })
};
export const getReceiverSocketId = (userId) => {
    return userSocketMap[userId];
};
export { io };