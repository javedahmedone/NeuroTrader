import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AngelOne from "../BrokerPages/AngelOne";
import AngelOneApiCollection from "../BrokerPages/AngelOneApi";
import tradingBackground from "../Assets/trading-background.jpg";
import { TrendingUp } from "lucide-react";
import "../Styles/LoginForm.css";

export default function LoginForm() {
  const [role, setRole] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [angelOneData, setAngelOneData] = useState({});
  const [showErrors, setShowErrors] = useState(false);
  const navigate = useNavigate();

  const roles = [{ label: "Angel One", value: "angelone" }];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowErrors(true); // force red borders

    if (!isFormValid) return;

    if (role === "angelone") {
      const { clientcode, password, totp, apiKey } = angelOneData;
      try {
        const result = await AngelOneApiCollection.loginUser({
          clientcode,
          password,
          totp,
          apiKey,
          brokerName: role,
        });
        console.log("✅ Login success:", result);
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
    <div
      className="login-container"
      style={{
        backgroundImage: `url(${tradingBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="login-box">
        <TrendingUp className="app_logo ml_35_p" />
        <h1 className="ml_30_p">Neuro Trader</h1>

        <form onSubmit={handleSubmit}>
          <h2 className="login-title">Please select your broker</h2>

          <select
            className={`login-input ${showErrors && !role ? "error" : ""}`}
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

          {role === "angelone" && (
            <AngelOne
              onFormChange={setIsFormValid}
              onFormDataChange={setAngelOneData}
              showErrors={showErrors}
            />
          )}

          {role && (
            <button className="login-button mt_20 pointer" type="submit">
              Login
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
