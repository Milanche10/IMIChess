
import React, { useEffect, useState, useCallback } from "react";
import Container from "react";
import Game from "./Game";
import InitGame from "./InitGame";
import CustomDialog from "../Popup/CustomDialog/CustomDialog";
import socket from "../../services/socket";
import './Online.css';

export default function Online({ai}) {
  const [username, setUsername] = useState("");
  const [usernameSubmitted, setUsernameSubmitted] = useState(false);

  const [room, setRoom] = useState("");
  const [orientation, setOrientation] = useState("");
  const [players, setPlayers] = useState([]);

  // Resets the states responsible for initializing a game
  const cleanup = useCallback(() => {
    setRoom("");
    setOrientation("");
    setPlayers("");
  }, []);

  useEffect(() => {
    socket.on("opponentJoined", (roomData) => {
      console.log("roomData", roomData);
      setPlayers(roomData.players);
    });
  }, []);

  return (
    <div>
      {!usernameSubmitted && (
        <CustomDialog
          open={!usernameSubmitted}
          handleContinue={() => {
            if (!username) return;
            socket.emit("username", username);
            setUsernameSubmitted(true);
          }}
        >
          <label htmlFor="username">Username</label>
          <input
            autoFocus
            id="username"
            name="username"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
            type="text"
          />
        </CustomDialog>
      )}

      {room ? (
        <Game
          room={room}
          orientation={orientation}
          username={username}
          players={players}
          cleanup={cleanup}
          ai = {ai}
        />
      ) : (
        <InitGame
          setRoom={setRoom}
          setOrientation={setOrientation}
          setPlayers={setPlayers}
          ai = {ai}
        />
      )}
    </div>
  );
}
