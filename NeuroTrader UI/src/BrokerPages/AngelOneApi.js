// loginApi.js
import BASE_URL from "../config.js";
import LoginModel from "../Model/LoginModel.js";
import fetchWithAuth from "../Services/fetchWithAuth.js";

// LOGIN FUNCTION
const userLogin = async ({ clientcode, password, totp, apiKey, brokerName }) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clientcode,
        password,
        totp,
        apiKey,
        brokerName
      }),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }
debugger
    const result = await response.json();
    LoginModel.jwtToken = result?.jwt || null;
    LoginModel.userName = result?.userName || null;
    LoginModel.clientcode = result?.clientcode || null;
    LoginModel.refreshToken = result?.refreshToken || null;
    LoginModel.brokerName =  result?.brokerName || null;
    // Store tokens in session
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

  fetchUserPromtData: (prompt) =>{
    const encodedPrompt = encodeURIComponent(prompt);
    return fetchWithAuth(`/promtAnalyzer/processPrompt?prompt=${encodedPrompt}`, { method: "GET" });
  }, 
};
 export default AngelOneApiCollection;

// PROFILE FETCH FUNCTION
// const fetchUserProfile = async () => {
//   try {
//     const response = await fetch(`${BASE_URL}/portfolio/profile`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         "apiKey": sessionStorage.getItem("apikey"),
//         "Clientcode": sessionStorage.getItem("clientcode"),
//         "Authorization": sessionStorage.getItem("jwt"),
//         "refresh": sessionStorage.getItem("refreshToken"),
//       },
//     });

//     if (!response.ok) {
//       throw new Error("Failed to fetch profile");
//     }

//     const result = await response.json();
//     return result;
//   } catch (error) {
//     console.error("Profile fetch error:", error.message);
//     throw error;
//   }
// };

// // ✅ EXPORT AS A COLLECTION
// const AngelOneApiCollection = {
//   loginUser,
//   fetchUserProfile,
// };

// export default AngelOneApiCollection;



// // BrokerPages/AngelOneApi.js
// import fetchWithAuth from "../services/fetchWithAuth.js";

// const AngelOneApiCollection = {
//   fetchUserProfile: () => fetchWithAuth("/portfolio/profile", { method: "GET" }),

//   fetchOrders: () => fetchWithAuth("/orders", { method: "GET" }),

//   placeOrder: (orderPayload) =>
//     fetchWithAuth("/orders/place", {
//       method: "POST",
//       body: JSON.stringify(orderPayload),
//     }),
// };

// export default AngelOneApiCollection;
