

import React, { useState } from "react";
import CustomDialog from "../Popup/CustomDialog/CustomDialog";
import socket from "../../services/socket";
import './InitGame.css';

export default function InitGame({ setRoom, setOrientation, setPlayers,ai }) {
  const [roomDialogOpen, setRoomDialogOpen] = useState(false);
  const [roomInput, setRoomInput] = useState("");
  const [roomError, setRoomError] = useState("");

  return (
    <div className="init-game-container">
      {roomDialogOpen && (
        <CustomDialog
          open={roomDialogOpen}
          handleContinue={() => {
            if (!roomInput) return;
            socket.emit("joinRoom", { roomId: roomInput }, (r) => {
              if (r.error) return setRoomError(r.message);
              console.log("response:", r);
              setRoom(r?.roomId);
              setPlayers(r?.players);
              setOrientation("black");
              setRoomDialogOpen(false);
            });
          }}
        >
          <label htmlFor="room">Room ID</label>
          <input
            autoFocus
            id="room"
            name="room"
            value={roomInput}
            required
            onChange={(e) => setRoomInput(e.target.value)}
            type="text"
            className={`room-input ${roomError ? "error" : ""}`}
          />
          {roomError && <p className="error">Invalid room ID: {roomError}</p>}
        </CustomDialog>
      )}

      <button
        className="start-button"
        onClick={() => {
          socket.emit("createRoom", (r) => {
            console.log(r);
            setRoom(r);
            setOrientation("white");
            if(ai=='true'){
              //alert("nigger")
            }
          });
        }}
      >
        Start a game
      </button>
      {/*
      {ai === false && (
        <button className="join-button" onClick={() => setRoomDialogOpen(true)}>
        Join a game
        </button>
      )}
      */}
      <button className="join-button" onClick={() => setRoomDialogOpen(true)}>
        Join a game
        </button>
      
    </div>
  );
}


