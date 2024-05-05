import { socket } from "../app/socket";
import { useEffect, createElement } from "react";

export default function ChatBox() {
  useEffect(() => {
    const onMsg = (msg) => {
      const div = document.querySelector("#chat-box");
      const message = document.createElement("h1");
      message.className = "bg-white odd:bg-slate-50 p-1 text-sm";
      message.innerText = msg;
      div.appendChild(message);
    }
    socket.on("msg", onMsg);
    
    return () => {
      socket.off("msg", onMsg);
    }
  }, []);


  const onSubmit = (event) => {
    const input = event.target.querySelector("input");
    if (input.value) {
      event.preventDefault();
      socket.emit("msg", input.value);
      input.value = '';
    }
  } 

  return (
    <div className="flex flex-col w-96 h-48 p-5 bg-yellow-200">
      <div id="chat-box" className="flex flex-col mb-2">

      </div>
      <form onSubmit={onSubmit}>
        <input autoComplete="off" className="w-full px-1 border-2"></input>        
      </form>
    </div>
  );
}