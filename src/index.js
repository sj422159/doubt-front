import React from "react";
import ReactDOM from "react-dom";
import ChatBox from "./ChatBox";
import "./styles.css";

const App = () => {
  return (
    <div>
      <h1 className="title">AI Teacher Chatbot</h1>
      <ChatBox />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));