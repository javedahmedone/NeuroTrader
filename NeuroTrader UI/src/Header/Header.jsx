import {  useState } from "react";
import { useNavigate } from 'react-router-dom';
import './Header.css';
import { Brain, Power } from 'lucide-react';
import ChatWindow from "../Components/ChatWindow";

const Header = () => {
  const userName  = sessionStorage.getItem("user");
  const [chatOpen, setChatOpen] = useState(false);
  const navigate = useNavigate();
  
  return (
    <div className="header-container">
      <div className="header-left">
        <div className ="to-neural-cyan bg-gradient-to-br">
          <Brain className ="to-neural-cyan pointer"></Brain>
          </div>
        
        <div className="ml_10p pointer"  onClick={() => navigate("/portfolio")}>
          <h1 className="brand-name">NeuroTrade</h1>
        </div>
      </div>

      <button className="trade-button"  onClick={() => setChatOpen(true)}>
        Trade with AI
      </button>
      <ChatWindow open={chatOpen} onClose={() => setChatOpen(false)} />


      <div className="header-right">
        <div className="user-info">
          <span className="user-name">{userName.replace(/^"|"$/g, '')}</span>
          <span className="user-role">Premium Trader</span>
        </div>
        <Power></Power>
      </div>
    </div>
  );
};

export default Header;
