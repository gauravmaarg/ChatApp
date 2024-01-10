import React, { FC } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Lobby, ChatPage } from "./pages";

const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Lobby />} />
      <Route path="/room/:roomCode" element={<ChatPage />} />
    </Routes>
  );
};

export default App;
