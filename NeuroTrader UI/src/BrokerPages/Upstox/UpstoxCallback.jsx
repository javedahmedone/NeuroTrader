// src/BrokerPages/Upstox/UpstoxCallback.jsx
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AngelOneApiCollection from "../AngelOne/AngelOneApi";
import BrokerConstant from "../../Constants/BrokerConstants";
import GlobalConstant from "../../Constants/constant";

export default function UpstoxCallback() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const params = new URLSearchParams(window.location.search);
    const paramsCode = params.get("code");

    if (!paramsCode) {
      setError("No authorization code found.");
      setLoading(false);
      return;
    }

    console.log("✅ Upstox Auth Code:", paramsCode);

    const fetchTokenAndData = async () => {
      try {
        const loginParams = {
          apiSecret: sessionStorage.getItem(GlobalConstant.APISECRET),
          apiKey: sessionStorage.getItem(GlobalConstant.APIKEY),
          code: paramsCode,
          brokerName: BrokerConstant.Upstox,
        };

        const response = await AngelOneApiCollection.loginUser(loginParams);

        if (response.jwt) {
          console.log("✅ Backend response (token + portfolio):", response);
          localStorage.setItem("upstox_token", response.access_token); // Adjust if needed

          // Optionally fetch user profile
          await AngelOneApiCollection.fetchUserProfile();

          navigate("/portfolio");
        } else {
          throw new Error("JWT not returned from backend");
        }
      } catch (err) {
        console.error("❌ Error in Upstox callback:", err);
        setError("Failed to complete login.");
      } finally {
        setLoading(false);
      }
    };

    fetchTokenAndData();
  }, [navigate]);

  if (loading) return <div>Processing login...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  return <div>Login successful! Redirecting...</div>;
}
