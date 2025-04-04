import React, { useState } from 'react';
import './ShoppingAssistant.css';
const ShoppingAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { sender: 'assistant', text: "Hello! I'm your personal shopping assistant from THE EMPRE  T|E. How can I help you today?" }
  ]);

  const toggleAssistant = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    // Add user message to chat
    setChatHistory([...chatHistory, { sender: 'user', text: message }]);

    // Simulate assistant response
    setTimeout(() => {
      const responses = [
        "I can help you find the perfect outfit for that occasion!",
        "We have several items that match your description. Would you like to see them?",
        "That's a great choice! This item is available in several colors.",
        "I recommend checking our new collection that just launched this week.",
        "I can help you with sizing. Our items typically run true to size."
      ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setChatHistory(prev => [...prev, { sender: 'assistant', text: randomResponse }]);
    }, 1000);

    // Clear input
    setMessage('');
  };

  return (
    <>
      {/* Chat toggle button */}
      <button
        onClick={toggleAssistant}
        className="chat-toggle-button"
        aria-label="Shopping Assistant"
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {/* Chat window */}
      <div className={`chat-window ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="chat-header">
          <div className="header-content">
            <div className="avatar">
              <span>👤</span>
            </div>
            <div>
              <h3>Shopping Assistant</h3>
              <p>Online | Usually replies in minutes</p>
            </div>
          </div>
        </div>

        {/* Chat messages */}
        <div className="chat-messages">
          {chatHistory.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.sender === 'user' ? 'user-message' : 'assistant-message'}`}
            >
              <div className="message-content">
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input area */}
        <form onSubmit={handleSendMessage} className="chat-input">
          <div className="input-container">
            <div className="search-icon">🔍</div>
            <input
              type="text"
              placeholder="Ask about products, sizing, etc."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button type="submit" className="send-button">
              ➤
            </button>
          </div>

          <div className="input-footer">
            <div className="footer-buttons">
              <button type="button" className="footer-button">
                🛍️
              </button>
            </div>
            <div className="footer-text">
              Powered by T|E Assistant
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ShoppingAssistant;