import GlobalConstant from "../../Constants/constant";
import BASE_URL from "../../config.js";

export function UseUpstoxLogin() {
  console.log(BASE_URL)
  let redirect_uri = BASE_URL+"/auth/callback/upstox";
  const encodedRedirectUri = encodeURIComponent(redirect_uri);

  const login = async (credentials) => {
    sessionStorage.setItem(GlobalConstant.APISECRET,credentials.apiSecret);
    sessionStorage.setItem(GlobalConstant.APIKEY,credentials.apiKey);

    const authUrl = `https://api.upstox.com/v2/login/authorization/dialog?response_type=code&client_id=${credentials.apiKey}&redirect_uri=${encodedRedirectUri}`;
    window.location.href = authUrl; // opens in same tab
  };

  return login;
}
