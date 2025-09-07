import { useState, useEffect } from "react";

export default function Upstox({ onCredentialsChange }) {
  const [credentials, setCredentials] = useState({
    apiKey: "",
    apiSecret: "",
  });

  useEffect(() => {
    onCredentialsChange(credentials);
  }, [credentials, onCredentialsChange]);

  return (
    <div>
      <div className="mb_6p">Api Key <span className="mandatory">*</span></div>
      <input
        type="text"
        placeholder="API Key"
        name = "upstox-apiKey"
        value={credentials.apiKey}
        onChange={(e) =>
          setCredentials({ ...credentials, apiKey: e.target.value })
        }
        className="login-input"
      />

      <div className="mb_6p">Api Secret <span className="mandatory">*</span></div>
      <input
        type="text"
        placeholder="API Secret"
        name = "upstox-apiSecret"
        value={credentials.apiSecret}
        onChange={(e) =>
          setCredentials({ ...credentials, apiSecret: e.target.value })
        }
        className="login-input"
      />
    </div>
  );
}
