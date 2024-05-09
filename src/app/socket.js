import { io } from "socket.io-client";

const development = "http://localhost:8080";
const production = "https://ultimate-tic-tac-toe-backend-hmitsogtdq-ue.a.run.app";
const backEnd = process.env.NODE_ENV == "development" ? development : production;

export const socket = io(
  backEnd, {
    autoConnect: false,
});