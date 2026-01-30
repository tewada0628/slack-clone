import { Server as NetServer } from "http";
import { NextApiRequest } from "next";
import { Server as ServerIO } from "socket.io";

import { NextApiResponseServerIo } from "@/types";

export const config = {
  api: {
    bodyParser: false,
  },
};

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
  if (!res.socket.server.io) {
    console.log("[SOCKET_IO_HANDLER] Initializing socket.io...");
    const path = "/api/socket/io";
    const httpServer: NetServer = res.socket.server as any;

    if (!httpServer) {
      console.log("[SOCKET_IO_HANDLER] HTTP Server not found");
      return res.end();
    }

    const io = new ServerIO(httpServer, {
      path: path,
      addTrailingSlash: false,
    });
    res.socket.server.io = io;
    console.log("[SOCKET_IO_HANDLER] Socket.io initialized");
  }
  res.end();
};

export default ioHandler;
