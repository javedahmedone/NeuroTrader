// const BASE_URL = "http://127.0.0.1:8000";
// Read from environment variable, fallback to local
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://127.0.0.1:8000";


// const BASE_URL = "https://liteneurotrader.onrender.com"
// const BASE_URL = "https://lite-fastapi-app-production.up.railway.app"

export default BASE_URL;