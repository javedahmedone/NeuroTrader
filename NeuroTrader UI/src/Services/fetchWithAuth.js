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
    "brokername": brokerName || ""
  };

  // Merge default headers with passed options
  const config = {
    method: options.method || "GET", // default GET
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined
  };

  try {
    debugger
    const response = await fetch(`${BASE_URL}${endpoint}`, config);

    if (!response.ok) {
      if (response.status === 401) {
        console.warn("🔐 Token expired or unauthorized.");
        // Optional: handle refresh token here
      }
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("❌ Fetch error:", error.message);
    throw error;
  }
};

export default fetchWithAuth;
