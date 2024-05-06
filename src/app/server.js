import { createServer } from "http";
import next from "next";
import { Server } from "socket.io";
import { hostname } from "os";

const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 3000;

// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();


app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer, {
    connectionStateRecovery: {}
  }
  );
  
  let queue = [];

  io.on("connection", (socket) => {
    if (queue.length == 0) queue.push(socket);
    else {
      const other = queue.pop();
      socket.gameId = other.gameId = socket.id + other.id;
      socket.join(socket.gameId);
      other.join(socket.gameId);
      io.to(socket.gameId).emit("join", socket.id, other.id);
    }

    socket.on("disconnect", () => {
      queue = queue.filter((x) => {
        return x.id != socket.id;
      });
    });

    socket.on("msg", (msg, id) => {
      io.to(socket.gameId).emit("msg", msg, id);
    });
  });
  
  

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});