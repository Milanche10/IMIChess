  import React, { useState, useMemo, useCallback, useEffect } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import CustomDialog from "../Popup/CustomDialog/CustomDialog";
import socket from "../../services/socket";
import './Game.css';



function Game({ players, room, orientation, cleanup,ai }) {
  const chess = useMemo(() => new Chess(), []);
  const [fen, setFen] = useState(chess.fen());
  const [over, setOver] = useState("");

  const makeAMove = useCallback(
    (move) => {
      try {
        const result = chess.move(move);
        setFen(chess.fen());

        if (chess.isGameOver()) {
          if (chess.isCheckmate()) {
            setOver(`Checkmate! ${chess.turn() === "w" ? "black" : "white"} wins!`);
          } else if (chess.isDraw()) {
            setOver("Draw");
          } else {
            setOver("Game over");
          }
        }

        return result;
      } catch (e) {
        return null;
      }
    },
    [chess]
  );

  function onDrop(sourceSquare, targetSquare) {
    if (chess.turn() !== orientation[0]) return false;

    if (players.length < 2 && ai!='true' ) return false;

    const moveData = {
      from: sourceSquare,
      to: targetSquare,
      color: chess.turn(),
      promotion: "q",
    };

    const move = makeAMove(moveData);

    if (move === null) return false;
    if(ai == 'true'){
      socket.emit("moveAI",{move,room});
    }
    else{
      socket.emit("move", { move, room });
    }
    
    return true;
  }

  useEffect(() => {
      socket.on("moveAiRecive", (move) => {
        //alert("skubidu")
        makeAMove(move);
      });
    
    
      socket.on("move", (move) => {
        makeAMove(move);
      });
    
    
  }, [makeAMove]);

  useEffect(() => {
    socket.on('playerDisconnected', (player) => {
      setOver(`${player.username} has disconnected`);
    });
  }, []);

  useEffect(() => {
    socket.on('closeRoom', ({ roomId }) => {
      if (roomId === room) {
        socket.emit("closeRoom", { roomId: room });
        cleanup();
      }
    });
  }, [room, cleanup]);

  return (
    <div className="game-container">
      <div>
        <h2>Room ID: {room}</h2>
      </div>
      <div className="board-container">
        <div className="chessboard">
          <Chessboard
              position={fen}
              onPieceDrop={onDrop}
              boardOrientation={orientation}
              areArrowsAllowed
              arePiecesDraggable
              arePremovesAllowed
              clearPremovesOnRightClick
              customDarkSquareStyle={{
                backgroundColor: '#769656'
              }}
              customLightSquareStyle={{
                backgroundColor: '#EEEED2'
              }}
              id="Configurable Board"
              onArrowsChange={() => {}}
              onDragOverSquare={() => {}}
              onMouseOutSquare={() => {}}
              onMouseOverSquare={() => {}}
              onPieceClick={() => {}}
              onPieceDragBegin={() => {}}
              onPieceDragEnd={() => {}}
              onSquareClick={() => {}}
              onSquareRightClick={() => {}}
              dropOffBoardAction='snapback'
          />
        </div>
        {players.length > 0 && (
          <div className="players-container">
            <h3 className="players-header">Players</h3>
            <ul className="players-list">
              {players.map((p) => (
                <li className="player-item" key={p.id}>{p.username}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {over && (
        <CustomDialog
          open={Boolean(over)}
          title={over}
          contentText={over}
          handleContinue={() => {
            socket.emit("closeRoom", { roomId: room });
            cleanup();
          }}
        />
      )}
    </div>
  );
}

export default Game;

