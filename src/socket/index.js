import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import config from "../config/index.js";

let io;

/**
 * Initialize Socket.io on top of the HTTP server.
 * Every connecting client must authenticate with the same admin JWT
 * used for REST requests; authenticated sockets join the shared "admins" room.
 */
export const initSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: config.clientUrl
        ? config.clientUrl.split(",").map((origin) => origin.trim())
        : [
            "http://localhost:3000",
            "http://localhost:5173",
            "https://dashboard-for-kazi-rahat.vercel.app",
          ],
      credentials: true,
    },
  });

  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error("Authentication required"));

    try {
      socket.admin = jwt.verify(token, config.jwt.secret);
      next();
    } catch {
      next(new Error("Invalid or expired token"));
    }
  });

  io.on("connection", (socket) => {
    socket.join("admins");
    console.log(
      `[DEBUG socket] connected: admin=${socket.admin?.id} email=${socket.admin?.email} socketId=${socket.id}`,
    );

    socket.on("disconnect", () => {
      socket.leave("admins");
      console.log(
        `[DEBUG socket] disconnected: admin=${socket.admin?.id} socketId=${socket.id}`,
      );
    });
  });

  return io;
};

/** Broadcast a notification to every connected admin */
export const emitNotification = (notification) => {
  if (!io) return;
  const room = io.sockets.adapter.rooms.get("admins");
  console.log(
    `[DEBUG socket] emitNotification: admins in room=${room ? room.size : 0}`,
    notification,
  );
  io.to("admins").emit("notification:new", notification);
};

export default { initSocket, emitNotification };
