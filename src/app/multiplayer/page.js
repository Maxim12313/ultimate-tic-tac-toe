"use client";
import { useEffect } from "react";
import { socket } from "../socket";
import Top from "../../components/top";
import ChatBox from "../../components/chat";


export default function Page() {
  useEffect(() => {
    const onJoin = (id1, id2) => {
      console.log(id1 + " vs " + id2);
    }
    
    socket.on("join", onJoin);
    
    return () => { //cleanup
      socket.off("join", onJoin);
    }

  }, []);

  return (
    <div>
      <Top mode="Multiplayer"/>
      <ChatBox />
    </div>
  );
}