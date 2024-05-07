import { socket } from "../app/socket";
import { useEffect } from "react";

export default function ChatBox({ thisName, otherName }) {
  useEffect(() => {
    if (!socket.connected) return;

    const div = document.querySelector("#chat-box");
    const styling = "bg-white odd:bg-slate-50 p-1 text-sm"
    
    const onMsg = (msg, name) => {
      const message = document.createElement("h1");
      message.className = styling;
      message.innerText = name + ": " + msg;
      div.appendChild(message);
      div.scrollTop = div.scrollHeight;
    }
    
    const onPlayerDisconnect = () => {
      const message = document.createElement("h1");
      message.className = styling + " text-red-500";
      message.innerText = otherName + " disonnected";
      div.appendChild(message);
      div.scrollTop = div.scrollHeight;
    }
    
    const onPlayAgain = (name) => {
      const message = document.createElement("h1");
      message.className = styling + " text-yellow-500";
      message.innerText = name + " wants to play again";
      div.appendChild(message);
      div.scrollTop = div.scrollHeight;
    }

    socket.on("msg", onMsg);
    socket.on("player disconnect", onPlayerDisconnect);
    socket.on("play again", onPlayAgain);
    
    return () => {
      socket.off("msg", onMsg);
      socket.off("player disconnect", onPlayerDisconnect);
      socket.off("play again", onPlayAgain);
    }
  }, [thisName, otherName]);


  const onSubmit = (event) => {
    const input = event.target.querySelector("input");
    event.preventDefault();
    if (input.value) {
      socket.emit("msg", input.value, thisName);
      input.value = '';
    }
  } 

  return (
    <div className="flex flex-col w-full h-48 justify-between border-2 border-black rounded-md">
      <div id="chat-box" className="flex flex-col mb-2 overflow-y-scroll">

      </div>
      <form onSubmit={onSubmit}>
        <input autoComplete="off" className="w-full px-1 border-t-2 border-black rounded-sm"></input>        
      </form>
    </div>
  );
}