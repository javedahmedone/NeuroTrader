import  { useEffect, useState } from "react";
import "../../Styles/AngelOne.css";

const AngelOne = ({ onFormChange, onFormDataChange, showErrors }) => {
  const [clientcode, setClientcode] = useState("");
  const [password, setPassword] = useState("");
  const [totp, setTotp] = useState("");
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    const allFilled =
      clientcode.trim() && password.trim() && totp.trim() && apiKey.trim();
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
        <label>Client Code <span className="mandatory">*</span></label>
        <input
          type="text"
          value={clientcode}
          autoComplete="on"
          name="angel-clientcode"
          onChange={(e) => setClientcode(e.target.value)}
          className={showErrors && !clientcode.trim() ? "error" : ""}
        />
      </div>

      <div className="angelone-field">
        <label>PIN <span className="mandatory">*</span></label>
        <input
          type="password"
          name="angel-password"
          autoComplete="on"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={showErrors && !password.trim() ? "error" : ""}
        />
      </div>

      <div className="angelone-field">
        <label>
          TOTP <span className="mandatory">*</span>
        </label>
        <input
          type="text"
          name="angel-totp"
          value={totp}
          autoComplete="on"
          onChange={(e) => setTotp(e.target.value)}
          className={showErrors && !totp.trim() ? "error" : ""}
        />
      </div>

      <div className="angelone-field">
        <label>API Key <span className="mandatory">*</span></label>
        <input
          type="text"
          value={apiKey}
          name="angel-apikey"
          autoComplete="on"
          onChange={(e) => setApiKey(e.target.value)}
          className={showErrors && !apiKey.trim() ? "error" : ""}
        />
      </div>

    <div className="angelone-links">
      <a href="/angelonesetupguide" target="_blank" rel="noopener noreferrer"> 
        ➕ Don't have an account? Click here for Setup Guide
      </a>
    </div>
    </div>
  );
};

export default AngelOne;
