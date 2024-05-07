"use client";
import Header from "../../components/Header";
import Game from "../../components/Game";

export default function Page() {
  return (
    <div className="flex flex-col">
      <Header mode="Pass and Play" />
      <Game nameX="player1" nameO="player2" isMultiplayer={false} isX={true} />
    </div>
  );
}