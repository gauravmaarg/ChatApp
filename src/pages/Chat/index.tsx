import React, { FC, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Input, Button } from "antd";
import Pubnub from "pubnub";
import "../Lobby/style.css";
import "./style.css";

const myID = `${Date.now()}`;
const pubnub = new Pubnub({
  publishKey: "pub-c-27e4e1bb-fee7-426c-bb0d-7d60ffbfa7f5",
  subscribeKey: "sub-c-afb7395b-dedb-428d-959d-ebcfd141a8ac",
  secretKey: "sec-c-NTAwOGFiNGQtNmNmNi00NTAzLThkNjAtYTk3MzJjNjZjOTBj",
  userId: myID,
});

export const ChatPage: FC = () => {
  const { roomCode } = useParams();
  const [typedMessage, setTypedMessage] = useState<string>("");
  const [messages, setMessages] = useState<Pubnub.MessageEvent[]>([]);

  useEffect(() => {
    if (roomCode) {
      pubnub.subscribe({
        channels: [roomCode],
      });

      return () => {
        pubnub.unsubscribe({
          channels: [roomCode],
        });
      };
    }
  }, [roomCode]);
  const handleSendMessage = useCallback(() => {
    if (typedMessage && roomCode) {
      pubnub.publish({
        channel: roomCode,
        message: typedMessage,
      });
      setTypedMessage("");
    }
  }, [roomCode, typedMessage]);

  useEffect(() => {
    if (roomCode) {
      const listner = {
        message: (messageEvent: Pubnub.MessageEvent) => {
          setMessages((prevMessages) => [...prevMessages, messageEvent]);
        },
      };
      pubnub.addListener(listner);

      return () => {
        pubnub.removeListener(listner);
      };
    }
  }, [roomCode]);
  return (
    <div>
      <h1>Chat App {roomCode}</h1>
      <div className="messages">
        {messages.map((message) => (
          <div
            className={message.publisher === myID ? "my-message" : ""}
            key={message.timetoken}
          >
            {message.message}
          </div>
        ))}
      </div>
      <div className="control-style">
        <Input
          value={typedMessage}
          onChange={(e) => setTypedMessage(e.target.value)}
          type="text"
          placeholder="Type your message here...."
        />
        <Button
          disabled={typedMessage === ""}
          onClick={handleSendMessage}
          type="primary"
        >
          Submit
        </Button>
      </div>
    </div>
  );
};
