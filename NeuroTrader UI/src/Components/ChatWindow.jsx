import React, { useState, useRef, useEffect } from 'react';
import '../Styles/ChatWindow.css';
import AngelOneApiCollection from "../BrokerPages/AngelOneApi";
import ChatMessage from "./ChatMessage";
import GlobalConstant from '../Constants/constant';
import {  Send} from "lucide-react";

const ChatWindow = ({ open, onClose }) => {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Hello! I'm your AI assistant. How can I help you today?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

//   const simulateTypingEffect = (fullText) => {
//     let index = 0;
//     const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

//     const intervalId = setInterval(() => {
//       index++;
//       const partialText = fullText.slice(0, index);

//       setMessages(prev => {
//         const updated = [...prev];
//         if (index === 1) {
//           updated.push({ sender: 'bot', text: partialText, time });
//         } else {
//           updated[updated.length - 1].text = partialText;
//         }
//         return updated;
//       });

//       if (index >= fullText.length) {
//         clearInterval(intervalId);
//       }
//     }, 25); // adjust speed here
//   };

  const sendMessage = async () => {
    if (!input.trim()) return;
    debugger
    setInput('');

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMessage = {
      sender: 'user',
      text: input,
      time,
    };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await AngelOneApiCollection.fetchUserPromtData(input);
      console.log("AI Response:", response);

      const botTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      if (response.userIntent === GlobalConstant.HOLDINGS) {
        setMessages(prev => [...prev, {
          sender: 'bot',
          type: GlobalConstant.HOLDINGS,
          data: response.data,
          time: botTime,
        }]);
      } else if (response.userIntent === GlobalConstant.SELLORDER) {
        setMessages(prev => [...prev, {
          sender: 'bot',
          type: GlobalConstant.SELLORDER,
          data: response.data,
          time: botTime,
        }]);
      } else if (response.userIntent === GlobalConstant.BUYORDER  ) {
        setMessages(prev => [...prev, {
          sender: 'bot',
          type: GlobalConstant.BUYORDER,
          data: response.data,
          time: botTime,
        }]);
      } else if (response.userIntent === GlobalConstant.GETORDERS) {
        setMessages(prev => [...prev, {
          sender: 'bot',
          type: GlobalConstant.GETORDERS,
          data: response.data,
          time: botTime,
        }]);
      } else if(response.userIntent === GlobalConstant.UNKNOWN) {
        setMessages(prev => [...prev, {
          sender: 'bot',
          type: GlobalConstant.UNKNOWN,
          data: response.data,
          time: botTime,
        }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, {
        sender: 'bot',
        text: "❌ Something went wrong. Please try again.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }]);
    }

  };

  if (!open) return null;

  return (
    <div className="chat-window">
      <div className="chat-header">
        <div className="title-group">
          <div className="avatar">💼</div>
          <div>
            <div className="title">AI Assistant</div>
            <div className="subtitle">Always here to help</div>
          </div>
        </div>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>

      <div className="chat-body">
        {messages.map((msg, idx) => (
          <div key={idx} className={`chat-bubble ${msg.sender}`}>
            <ChatMessage message={msg} />
            <div className="bubble-time">{msg.time}</div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="chat-input-area">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button className="send-btn" onClick={sendMessage}>
        <Send className="w-4 h-4" /></button>
      </div>
    </div>
  );
};

export default ChatWindow;
