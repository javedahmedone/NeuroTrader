// src/BrokerPages/AngelOne.jsx
import React, { useEffect, useState } from "react";
import "../Styles/AngelOne.css";

const AngelOne = ({ onFormChange, onFormDataChange }) => {
  const [clientcode, setClientcode] = useState("");
  const [password, setPassword] = useState("");
  const [totp, setTotp] = useState("");
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    const allFilled =
      clientcode.trim() &&
      password.trim() &&
      totp.trim() &&
      apiKey.trim();

    onFormChange(!!allFilled);

    if (allFilled) {
      onFormDataChange({ clientcode, password, totp, apiKey });
    } else {
      onFormDataChange({});
    }
  }, [clientcode, password, totp, apiKey, onFormChange, onFormDataChange]);

  return (
    <div className="angelone-container">
      <h3 className="angelone-title">Angel One Credentials</h3>

      <div className="angelone-field">
        <label>Client Code</label>
        <input
          type="text"
          name="angel-clientcode"
          autoComplete="on"
          value={clientcode}
          onChange={(e) => setClientcode(e.target.value)}
        />
      </div>

      <div className="angelone-field">
        <label>Password</label>
        <input
          type="password"
          name="angel-password"
          autoComplete="on"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="angelone-field">
        <label>TOTP</label>
        <input
          type="text"
          name="angel-totp"
          autoComplete="on"
          value={totp}
          onChange={(e) => setTotp(e.target.value)}
        />
      </div>

      <div className="angelone-field">
        <label>API Key</label>
        <input
          type="text"
          name="angel-apikey"
          autoComplete="on"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />
      </div>

      <div className="angelone-links">
        <a
          href="https://www.angelone.in/open-demat-account"
          target="_blank"
          rel="noopener noreferrer"
        >
          ➕ Don't have an account? Sign up here
        </a>
        <a
          href="https://www.youtube.com/watch?v=YOUR_VIDEO_ID"
          target="_blank"
          rel="noopener noreferrer"
        >
          ▶️ Watch Setup Tutorial on YouTube
        </a>
      </div>
    </div>
  );
};

export default AngelOne;
