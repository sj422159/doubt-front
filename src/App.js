import React from "react";
import ChatBox from "./ChatBox";
import "./styles.css";

const App = () => {
  return (
    <div className="app-container">
      <h1 className="title">AI Teacher Chatbot</h1>
      <ChatBox />
    </div>
  );
};

export default App;
