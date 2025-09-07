// loginApi.js
import BASE_URL from "../../config.js";
import LoginModel from "../../Model/LoginModel.js";
import fetchWithAuth from "../../Services/fetchWithAuth.js";
import fetchWithoutAuth from "../../Services/fetchWithoutAuth.js";

const userLogin = async ({ clientcode, password, totp, apiKey, apiSecret, code ,brokerName }) => {
  try {
    let response;
    // 🔹 Common request config
    const payload = {
      clientcode,
      password,
      totp,
      apiKey,
      apiSecret,
      code,
      brokerName,
    };

    // 🔹 For other brokers
    response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const result = await response.json();

    // Save tokens to model + sessionStorage
    LoginModel.jwtToken = result?.jwt || null;
    LoginModel.userName = result?.userName || null;
    LoginModel.clientcode = result?.clientcode || null;
    LoginModel.refreshToken = result?.refreshToken || null;
    LoginModel.brokerName = result?.brokerName || null;

    sessionStorage.setItem("jwt", LoginModel.jwtToken);
    sessionStorage.setItem("user", LoginModel.userName);
    sessionStorage.setItem("clientcode", clientcode);
    sessionStorage.setItem("apikey", apiKey);
    sessionStorage.setItem("refreshToken", LoginModel.refreshToken);
    sessionStorage.setItem("feedToken", result?.feedToken || null);
    sessionStorage.setItem("brokerName", brokerName || null);

    return result;
  } catch (error) {
    console.error("Login error:", error.message);
    throw error;
  }
};


const AngelOneApiCollection = {
  loginUser: (loginParams) => userLogin(loginParams),
  fetchUserProfile: () => fetchWithAuth("/portfolio/profile", { method: "GET" }),
  fetchUserHoldings: () => fetchWithAuth("/portfolio/holdings", { method: "GET" }),
  fetchUserOrders: () => fetchWithAuth("/portfolio/orders", { method: "GET" }),
  fetchStocks: (query) =>fetchWithoutAuth(`/stock/search?query=${encodeURIComponent(query)}`),
  cancelUserOrders: (cancelOrderRequestModel) =>
  fetchWithAuth("/portfolio/cancelOrder", {
    method: "POST",
    body: cancelOrderRequestModel, // 👈 raw object
  }),


  fetchUserPromtData: (prompt) =>{
    const encodedPrompt = encodeURIComponent(prompt);
    return fetchWithAuth(`/promtAnalyzer/processPrompt?prompt=${encodedPrompt}`, { method: "GET" });
  }, 
    placeOrder: (orderParams) =>
    fetchWithAuth("/portfolio/placeOrder", {
      method: "POST",
      body: orderParams
    })
};
 export default AngelOneApiCollection;
