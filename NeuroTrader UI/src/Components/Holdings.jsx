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
  const [buyQuantities, setBuyQuantities] = useState({})
  const [sellQuantities, setSellQuantities] = useState({})

  const [loading, setLoading] = useState(true); // ✅ Loader state
  const hasFetched = useRef(false);
   const loaderOverlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(255,255,255,0.9)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    opacity : "80%"
  };
  const navigate = useNavigate();


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
        if(err.message.includes('401')){
          LoggedOutUser(navigate);
        }
        setError("Failed to load portfolio data.");
      } finally {
        setLoading(false); // ✅ Hide loader after fetch
      }
    };

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    fetchAllData();
  }, []);


const handleOrder = async (symbol, token, index, transactionType) => {
  setLoading(true); // ✅ Hide loader after fetch
  let quantities = [];
  if(transactionType === GlobalConstant.BUY){
    quantities = buyQuantities;
  }
  if(transactionType === GlobalConstant.SELL){
    quantities = sellQuantities;
  }
  const qty = parseInt(quantities[index] || 0, 10);
  const data = {
    symbol,
    name: "",
    instrumenttype: "",
    token,
    quantity: qty,
    transactionType: transactionType
  };
  try {
    const response = await AngelOneApiCollection.placeOrder(data); // ✅ waits here
    if (response && response.success === false) {
      alert(response.message);
    } else {
      console.log("Order placed successfully:", response);
      fetchAllData();
    }
  } catch (err) {
    if(error.message.includes('401')){
        LoggedOutUser(navigate);
    }
    console.error("Order placement failed:", err);
  }
  finally {
      setLoading(false); // ✅ Hide loader after fetch
  }
};


  // ✅ Show loader until data is fetched
  // if (loading) {
  //   return <Spinner />;
  // }

  return (
    <div className="holdings-container">
      <h2>
        Holdings <span className="badge">{userHoldingsData.length}</span>
      </h2>

      <div className="tab le-wrapper">
        <table className="holdings-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Avg. Price</th>
              <th>Current Val.</th>
              <th>Overall G/L</th>
              <th> Buy </th>
              <th> Sell </th>

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
                    <td className="w_15_p">
                      <input className="buy-qty-input "
                        type="number"
                        value={buyQuantities[i] || ""}
                        onChange={(e) => 
                          setBuyQuantities({
                            ...buyQuantities,
                            [i]:e.target.value
                          })}
                        placeholder="enter quantity to buy"
                      />
                      <button className="btn green" title="Click To Buy"
                        onClick={() => handleOrder(h.tradingsymbol, h.symboltoken, i, GlobalConstant.BUY)}>
                          Buy
                      </button>
                    </td>
                    <td className="w_15_p">
                      <input className="buy-qty-input"
                        type="number"
                        placeholder="enter quantity to sell"
                        value={sellQuantities[i] || ""}
                          onChange={(e) => 
                            setSellQuantities({
                              ...sellQuantities,
                              [i]:e.target.value
                          })}
                      />
                      <button className="btn red" title="Click Here to Sell"
                        onClick={() => handleOrder(h.tradingsymbol, h.symboltoken, i, GlobalConstant.SELL)}>
                          Sell
                      </button>
                    </td>
                    
                  </tr>
                )
            )}
          </tbody>
        </table>
      </div>
       {loading && (
          <div style={loaderOverlayStyle}>
            <Spinner />
          </div>
        )}
    </div>

  );
}
