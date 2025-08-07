import "../Styles/Holdings.css";
import { useEffect, useState, useRef } from "react";
import AngelOneApiCollection from "../BrokerPages/AngelOneApi";
import HoldingsResponse from "../Model/HoldingsResponse";
import TotalHolding from "../Model/TotalHolding";
import GlobalConstant from "../Constants/constant";
import LoggedOutUser from "./Logout";
import { useNavigate } from 'react-router-dom';


export default function Holdings () {
      const [userHoldingsData, setUserHoldingsData] = useState([]);
      const [overAllHoldingsDetails, setOverAllHoldingsDetails] = useState(null);
      const [error, setError] = useState(null);
    const hasFetched = useRef(false);
      
      const navigate = useNavigate()


  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchAllData = async () => {
      try {
        const response = await AngelOneApiCollection.fetchUserHoldings();
        if(response.message === GlobalConstant.InvalidToken){
          LoggedOutUser(navigate);
        }
        const data = new HoldingsResponse(response);
        setUserHoldingsData(data.holdings || []);
        setOverAllHoldingsDetails(data.totalholding || new TotalHolding());
        if(data.totalholding != null){
          let result = data.totalholding.totalpnlpercentage<0?true:false;
        //   setIsNegative(result)
        }
        console.log("✅ All data fetched",data);
      } catch (err) {
        console.error("❌ Error fetching portfolio data:", err);
        setError("Failed to load portfolio data.");
      }
    };

    fetchAllData();
  }, []);


  return (
    <div className="holdings-container">
      <h2>Holdings <span className="badge">{userHoldingsData.length}</span></h2>

      <div className="table-wrapper">
        <table className="holdings-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Avg. Price</th>
              {/* <th>LTP</th> */}
              {/* <th>Inv. Amt.</th> */}
              <th>Current Val.</th>
              <th>Overall G/L</th>
              {/* <th>Day’s G/L</th> */}
            </tr>
          </thead>
          <tbody>
            {userHoldingsData.map((h, i) => (
              <tr key={i}>
                <td>{h.tradingsymbol}</td>
                <td>{h.quantity}</td>
                <td>{h.averageprice}</td>
                {/* <td>{h.ltp}</td> */}
                {/* <td>{h.invested}</td> */}
                <td>{h.ltp}</td>
                <td className={h.pnlpercentage < 0 ? "loss" : "profit"}>
                  {h.pnlpercentage.toFixed(2)}
                  <br />
                  <span>{h.pnlpercentage.toFixed(2)}%</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


    </div>
  );
};

// export default Holdings;
