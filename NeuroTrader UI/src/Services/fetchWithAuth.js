import BASE_URL from "../config.js";
import GlobalConstant from "../Constants/constant.js";

const fetchWithAuth = async (endpoint, options = {}) => {
  const jwt = sessionStorage.getItem(GlobalConstant.JWT);
  const apiKey = sessionStorage.getItem(GlobalConstant.APIKEY);
  const clientcode = sessionStorage.getItem("clientcode");
  const refreshToken = sessionStorage.getItem("refreshToken");
  const brokerName = sessionStorage.getItem(GlobalConstant.BROKERNAME);
  // const apiSecret =  sessionStorage.getItem(GlobalConstant.APISECRET)
  // Inject headers
  const headers = {
    "Content-Type": "application/json",
    "apiKey": apiKey || "",
    "Authorization": jwt || "",
    "clientcode": clientcode || "",
    "refresh": refreshToken || "",
    "brokername": brokerName || "",
    // "apiSecret" : apiSecret || ""
  };

  // Merge default headers with passed options
  const config = {
    method: options.method || "GET", // default GET
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);

    if (!response.ok) {
      if (response.status === 401) {
        console.warn("🔐 Token expired or unauthorized.");
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
