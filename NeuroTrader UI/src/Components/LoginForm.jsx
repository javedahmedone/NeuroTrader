// src/components/LoginForm.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AngelOne from "../BrokerPages/AngelOne";
import AngelOneApiCollection from "../BrokerPages/AngelOneApi";
import "../Styles/LoginForm.css";

export default function LoginForm() {
  const [role, setRole] = useState(""); // role is used as brokerName
  const [isFormValid, setIsFormValid] = useState(false);
  const [angelOneData, setAngelOneData] = useState({});
  const navigate = useNavigate();

  const roles = [
    { label: "Angel One", value: "angelone" },
    { label: "Trader", value: "trader" },
    { label: "Hacker", value: "investor" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (role === "angelone") {
      const { clientcode, password, totp, apiKey } = angelOneData;

      const payload = {
        clientcode,
        password,
        totp,
        apiKey,
        brokerName: role, // ✅ Use role as brokerName
      };

      try {
        debugger
        console.log("🔐 Sending login payload:", payload);
        const result = await AngelOneApiCollection.loginUser(payload);
        console.log("✅ Login success:", result);
        alert("Login successful!");
        navigate("/portfolio");
      } catch (error) {
        console.error("❌ Login failed:", error);
        alert("Login failed. Please check your credentials.");
      }
    } else {
      alert("Login not implemented for selected role.");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-box">
        <h2 className="login-title">Please select your broker</h2>

        <select
          className="login-input"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">Select Broker</option>
          {roles.map((r) => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </select>

        <p>Form is {isFormValid ? "valid ✅" : "invalid ❌"}</p>

        {role === "angelone" && (
          <AngelOne
            onFormChange={setIsFormValid}
            onFormDataChange={setAngelOneData}
          />
        )}

        <button
          className="login-button"
          type="submit"
          disabled={!isFormValid}
        >
          Move next
        </button>
      </form>
    </div>
  );
}
