import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AngelOne from "../BrokerPages/AngelOne/AngelOne";
import AngelOneApiCollection from "../BrokerPages/AngelOne/AngelOneApi";
import tradingBackground from "../Assets/trading-background.jpg";
import { TrendingUp } from "lucide-react";
import Spinner from "../Components/Spinner"; // ✅ Loader component
import "../Styles/LoginForm.css";
import "../App.css"; 
import BrokerConstant from "../Constants/BrokerConstants";
import Upstox from "../BrokerPages/Upstox/Upstox";

export default function LoginForm() {
  const [role, setRole] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [angelOneData, setAngelOneData] = useState({});
  const [showErrors, setShowErrors] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // ✅ Loader state
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

  const roles = [
    { label: "Angel One", value: BrokerConstant.AngelOne },
    { label: "Upstox", value: BrokerConstant.Upstox }
  ];

const handleSubmit = async (e) => {
  e.preventDefault();
  setShowErrors(true); // force red borders
  if (!isFormValid) return;

  setLoading(true); // ✅ Show loader at the very beginning

  try {
    let result;
    if (role === BrokerConstant.AngelOne) {
      const { clientcode, password, totp, apiKey } = angelOneData;
      result = await AngelOneApiCollection.loginUser({
        clientcode,
        password,
        totp,
        apiKey,
        brokerName: role,
      });
    } else if (role === BrokerConstant.Upstox) {
      const { apiSecret, password, totp, apiKey } = angelOneData;
      result = await AngelOneApiCollection.loginUser({
        apiSecret,
        password,
        totp,
        apiKey,
        brokerName: role,
      });
    } else {
      alert("Login not implemented for selected role.");
      return;
    }

    console.log("✅ Login success:", result);
    navigate("/portfolio");

  } catch (error) {
    console.error("❌ Login failed:", error);
    alert("Login failed. Please check your credentials.");
  } finally {
    setLoading(false); // ✅ Always hide loader when done
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

          {role === BrokerConstant.AngelOne && (
            <AngelOne
              onFormChange={setIsFormValid}
              onFormDataChange={setAngelOneData}
              showErrors={showErrors}
            />
          )}

           {role === BrokerConstant.Upstox && (
            <Upstox
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
          {loading && (
                    <div style={loaderOverlayStyle}>
                      <Spinner />
                    </div>
          )}
        </form>
      </div>
    </div>
  );
}
