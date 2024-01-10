import { Button, Input } from "antd";
import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

export const Lobby = () => {
  const navigate = useNavigate();
  const [roomCode, setRoomCode] = useState<string>("");

  const handleJoinRoom = useCallback(() => {
    navigate(`/room/${roomCode}`);
  }, [navigate, roomCode]);
  return (
    <div className="lobby-container">
      <div>
        <h1>Please Enter Room Code</h1>
        <div className="control-style">
          <Input
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
            type="text"
            placeholder="Example: coders Hub"
          />
          <Button onClick={handleJoinRoom} disabled={roomCode === ""}>
            Join Room
          </Button>
        </div>
      </div>
    </div>
  );
};
