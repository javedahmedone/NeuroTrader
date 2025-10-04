import { useState, useRef, useEffect } from 'react';
import AngelOneApiCollection from "../BrokerPages/AngelOne/AngelOneApi";
import ChatMessage from "./ChatMessage";
import GlobalConstant from '../Constants/constant';
import { Send } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import LoggedOutUser from "./Logout";
import Spinner from "../Components/Spinner"; // ✅ Loader component
import '../Styles/ChatWindow.css';

const ChatWindow = ({ open, onClose }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // ✅ Loader state
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

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      sender: 'user',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true); // ✅ Show loader overlay

    try {
      
      let response = await AngelOneApiCollection.fetchUserPromtData(userMessage.text);
      console.log("AI Response:", response);
    if (
      response === null ||    response.data === null || 
      (response.data.success === false && response.data.message === GlobalConstant.InvalidToken)
    ) {
      LoggedOutUser(navigate);
      return;
    }
    
      if(response.statusCode === 401){
        LoggedOutUser(navigate);
        return;
      }
    
    else if(response.userIntent === GlobalConstant.CANCELORDER){
      if(response.status === GlobalConstant.ERROR){
        response.userIntent = GlobalConstant.CANCELORDERERROR
      }
      else{
        const orderId =  response.data.data.orderid;
        let userOrdersData = await AngelOneApiCollection.fetchUserOrders();
        response.data =  userOrdersData.find((order) => order.orderid === orderId) || null;
      } 
    }
    const botTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    let newBotMessage = {
        sender: 'bot',
        time: botTime
    };

      switch (response?.userIntent) {
        case GlobalConstant.HOLDINGS:
          newBotMessage = { ...newBotMessage, type: GlobalConstant.HOLDINGS, data: response.data };
          break;
        case GlobalConstant.SELLORDER:
          newBotMessage = { ...newBotMessage, type: GlobalConstant.SELLORDER, data: response };
          break;
        case GlobalConstant.BUYORDER:
          newBotMessage = { ...newBotMessage, type: GlobalConstant.BUYORDER, data: response };
          break;
        case GlobalConstant.GETORDERS || GlobalConstant.CANCELALLORDERS:
          newBotMessage = { ...newBotMessage, type: GlobalConstant.GETORDERS, data: response };
          break;
        case  GlobalConstant.CANCELALLORDERS:
          newBotMessage = { ...newBotMessage, type: GlobalConstant.GETORDERS, data: response };
          break;
        case GlobalConstant.CANCELORDER:
          newBotMessage = { ...newBotMessage, type: GlobalConstant.CANCELORDER, data: response.data };
          break;
        case GlobalConstant.ANALYZEPORTFOLIO:
          newBotMessage = { ...newBotMessage, type: GlobalConstant.ANALYZEPORTFOLIO, data: response.data };
          break;
        case GlobalConstant.UNKNOWN:
          newBotMessage = { ...newBotMessage, type: GlobalConstant.UNKNOWN, data: response.data };
          break;
        case GlobalConstant.CANCELORDERERROR:
          newBotMessage = { ...newBotMessage, type: GlobalConstant.CANCELORDERERROR, data: response };
          break;
        case GlobalConstant.VALIDATIONERROR:
          newBotMessage = { ...newBotMessage, type: GlobalConstant.VALIDATIONERROR, data: response };
          break;
        default:
          newBotMessage = { ...newBotMessage, text: "🤔 I couldn't understand that." };
      }

      setMessages((prev) => [...prev, newBotMessage]);

    } catch (error) {
      if(error.message.includes('401')){
          LoggedOutUser(navigate);
      }
      setMessages(prev => [...prev, {
        sender: 'bot',
        text: "❌ Something went wrong. Please try again.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }]);
    } finally {
      setLoading(false); // ✅ Hide loader overlay
    }
  };

  if (!open) return null;

  return (
    <div className="overlay">
      <div className="chat-window">
        <div className="chat-header">
          <div className="title-group">
            <div className="avatar">💼</div>
            <div>
              <div className="title">AI Assistant</div>
              <div className="subtitle">Always here to help</div>
            </div>
          </div>
          <button className="close-btn" title="Close" onClick={onClose}>×</button>
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
        <div className="warning"> Note : AI can predict wrong stock name , so suggest you to use stock symbol instead of name , you can find symbol from Know Your Symbol button</div>

        <div className="chat-input-area">
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button className="send-btn" onClick={sendMessage}>
            <Send className="w-4 h-4" />
          </button>
        </div>

        {/* ✅ Full-screen loader overlay inside popup */}
        {loading && (
          <div style={loaderOverlayStyle}>
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
};

const loaderOverlayStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(255,255,255,0.9)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 10,
  opacity : "80%"
};

export default ChatWindow;
