import { socket } from "../app/socket";
import { useEffect, createElement } from "react";

export default function ChatBox() {
  useEffect(() => {
    const onMsg = (msg, id) => {
      const div = document.querySelector("#chat-box");
      const message = document.createElement("h1");
      message.className = "bg-white odd:bg-slate-50 p-1 text-sm";
      message.innerText = id + ": " + msg;
      div.appendChild(message);
      div.scrollTop = div.scrollHeight;
    }
    socket.on("msg", onMsg);
    
    return () => {
      socket.off("msg", onMsg);
    }
  }, []);


  const onSubmit = (event) => {
    const input = event.target.querySelector("input");
    event.preventDefault();
    if (input.value) {
      socket.emit("msg", input.value, socket.id.substring(0, 4));
      input.value = '';
    }
  } 

  return (
    <div className="flex flex-col w-96 h-48 justify-between border-2 border-black rounded-md">
      <div id="chat-box" className="flex flex-col mb-2 overflow-y-scroll">

      </div>
      <form onSubmit={onSubmit}>
        <input autoComplete="off" className="w-full px-1 border-t-2 border-black rounded-sm"></input>        
      </form>
    </div>
  );
}