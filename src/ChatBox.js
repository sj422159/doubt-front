import React, { useState } from "react";
import axios from "axios";
import "./styles.css";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = input.trim();
    const newMessages = [...messages, { text: userMessage, sender: "user" }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post("https://doubt-solver-back.onrender.com/chat", { 
        message: userMessage 
      });
      
      if (response.data && response.data.reply) {
        setMessages([...newMessages, { text: response.data.reply, sender: "ai" }]);
      } else {
        setMessages([...newMessages, { text: "Sorry, I received an empty response. Please try again.", sender: "ai" }]);
      }
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setMessages([
        ...newMessages, 
        { text: `Error: ${error.response?.data?.error || error.message || "Unknown error occurred"}`, sender: "ai" }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.length === 0 ? (
          <div className="empty-state">Start a conversation with the AI teacher!</div>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              {msg.text}
            </div>
          ))
        )}
        {loading && <div className="message ai loading">Typing...</div>}
      </div>
      <div className="input-box">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask me anything..."
          disabled={loading}
        />
        <button onClick={sendMessage} disabled={loading || !input.trim()}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;