"use client";

import { io } from "socket.io-client";
export const socket = io({
  autoConnect: false,
  cors: {
    origin:"http://localhost:3000"
  }
});