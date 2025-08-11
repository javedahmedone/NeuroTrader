import { useEffect, useState, useRef } from "react";
import AngelOneApiCollection from "../BrokerPages/AngelOneApi";
import HoldingsResponse from "../Model/HoldingsResponse";
import GlobalConstant from "../Constants/constant";
import LoggedOutUser from "./Logout";
import { useNavigate } from 'react-router-dom';
import Spinner from "../Components/Spinner"; // ✅ Import the loader
import "../Styles/Holdings.css";

export default function Holdings() {
  const [userHoldingsData, setUserHoldingsData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ Loader state
  const hasFetched = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchAllData = async () => {
      try {
        const response = await AngelOneApiCollection.fetchUserHoldings();
        if (response.message === GlobalConstant.InvalidToken) {
          LoggedOutUser(navigate);
        }
        const data = new HoldingsResponse(response);
        setUserHoldingsData(data.holdings || []);
        console.log("✅ All data fetched", data);
      } catch (err) {
        console.error("❌ Error fetching portfolio data:", err);
        setError("Failed to load portfolio data.");
      } finally {
        setLoading(false); // ✅ Hide loader after fetch
      }
    };

    fetchAllData();
  }, []);

  // ✅ Show loader until data is fetched
  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="holdings-container">
      <h2>
        Holdings <span className="badge">{userHoldingsData.length}</span>
      </h2>

      <div className="table-wrapper">
        <table className="holdings-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Avg. Price</th>
              <th>Current Val.</th>
              <th>Overall G/L</th>
            </tr>
          </thead>
          <tbody>
            {userHoldingsData.map(
              (h, i) =>
                h.quantity !== 0 && (
                  <tr key={i}>
                    <td>{h.tradingsymbol}</td>
                    <td>{h.quantity}</td>
                    <td>{h.averageprice}</td>
                    <td>{h.ltp}</td>
                    <td className={h.pnlpercentage < 0 ? "loss" : "profit"}>
                      {h.pnlpercentage.toFixed(2)}
                      <br />
                      <span>{h.pnlpercentage.toFixed(2)}%</span>
                    </td>
                  </tr>
                )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
