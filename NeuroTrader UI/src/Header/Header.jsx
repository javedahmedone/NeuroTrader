import {  useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Brain, Power } from 'lucide-react';
import ChatWindow from "../Components/ChatWindow";
import LogoutPopup from "../Components/LogoutPopup";
import LoggedOutUser from "../Components/Logout";
import StockTokenModel from "../Components/StockTokenModel";
import './Header.css';

const Header = () => {
  const userName  = sessionStorage.getItem("user");
  const [chatOpen, setChatOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchPopupOpen, setSearchPopupOpen] = useState(false);
  const navigate = useNavigate();

  function handleYes(){
    LoggedOutUser(navigate);
    setOpen(false);
    console.log('User confirmed logout');
  }

  function handleNo(){
    setOpen(false);
  }
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

      <StockTokenModel open={searchPopupOpen} onClose={() => setSearchPopupOpen(false)} />
      <button className="trade-button"  onClick={() => setSearchPopupOpen(true)}>
        Know Your Symbol

      </button>

      <ChatWindow open={chatOpen} onClose={() => setChatOpen(false)} />
      <button className="trade-button"  onClick={() => setChatOpen(true)}>
        Trade with AI
      </button>

      <div className="header-right">
        <div className="user-info">
          <span className="user-name">{userName}</span>
          <span className="user-role">Premium Trader</span>
        </div>
        <div title ="Click here to Logout user" className="pointer" onClick={() => setOpen(true)}>
          <Power ></Power>
        </div>
        <LogoutPopup open={open} onConfirm={handleYes} onCancel={handleNo} />

      </div>
    </div>
  );
};

export default Header;
