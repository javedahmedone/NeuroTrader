// services/fetchWithAuth.js
import BASE_URL from "../config.js";

  const fetchWithAuth = async (endpoint, options = {}) => {
    const jwt = sessionStorage.getItem("jwt");
    const apiKey = sessionStorage.getItem("apikey");
    const clientcode = sessionStorage.getItem("clientcode");
    const refreshToken = sessionStorage.getItem("refreshToken");
    const brokerName = sessionStorage.getItem("brokerName");

    // Inject headers
    const headers = {
      "Content-Type": "application/json",
      "apiKey": apiKey || "",
      "Authorization": jwt || "",
      "clientcode": clientcode || "",
      "refresh": refreshToken || "",
      "brokername":brokerName || ""
    };

    const config = {
      headers,
    };

    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, config);

      if (!response.ok) {
        // Optional: handle 401 (token expired), etc.
        if (response.status === 401) {
          console.warn("🔐 Token expired or unauthorized.");
          // You could call a refresh-token endpoint here.
        }
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("❌ Fetch error:", error.message);
      throw error;
    }
  };

export default fetchWithAuth;
