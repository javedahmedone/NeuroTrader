import BASE_URL from "../config.js";

const fetchWithoutAuth = async (endpoint) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("❌ Fetch error:", error.message);
    throw error;
  }
};

export default fetchWithoutAuth;
