import { useEffect, useState, useRef } from "react";
import {  TrendingUp, PieChart,  Target,  TrendingDown,Aperture, IndianRupee} from "lucide-react";
import AngelOneApiCollection from "../BrokerPages/AngelOneApi";
import HoldingsResponse from "../Model/HoldingsResponse";
import TotalHolding from "../Model/TotalHolding";
import GlobalConstant from "../Constants/constant";
import LoggedOutUser from "./Logout";
import { useNavigate } from 'react-router-dom';
import Spinner from "../Components/Spinner"; // ✅ Import the loader
import "../Styles/Portfolio.css";

export default function Portfolio() {
  const [uesrHoldingsData, setUserHoldingsData] = useState([]);
  const [overAllHoldingsDetails, setOverAllHoldingsDetails] = useState(null);
  const [error, setError] = useState(null);
  const hasFetched = useRef(false);
  const navigate = useNavigate();
  const [isNegative, setIsNegative] = useState(false);
  const [loading, setLoading] = useState(true); // ✅ Loader state

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
          setIsNegative(result)
        }
        console.log("✅ All data fetched",data);
      } catch (err) {
        console.error("❌ Error fetching portfolio data:", err);
        setError("Failed to load portfolio data.");
      } finally {
        setLoading(false); // ✅ Hide loader after fetch
      }
    };

    fetchAllData();
  }, []);

  if (error) {
    return <div className="portfolio-container"><p>{error}</p></div>;
  }

  // if (!overAllHoldingsDetails) {
  //   return <div className="portfolio-container"><p>Loading portfolio...</p></div>;
  // }
    if (loading) {
    return <Spinner />;
  }

  return (
    <div className="portfolio-container">
      <h2 className="section-title">Portfolio Overview</h2>

      <div className="summary-grid">
        <div className="portfolio-card">
          <div className="card-header">
            <IndianRupee className="h-8 w-8 blue" />
            <p className="title">Portfolio Value</p>
          </div>
          <h2 className="amount">
            ₹{overAllHoldingsDetails.totalholdingvalue?.toFixed(2) ?? "0.00"}
          </h2>
        </div>

        <div className="change-card pointer" onClick={() => navigate("/Order")}>
          <div className="card-header">
            <Aperture className={`h-8 w-8 ${overAllHoldingsDetails.totalprofitandloss >= 0 ? 'treding_up_green' : 'trending_red'}`} />
            <p className="title">Orders</p>
          </div>
          <h2 className="amount"></h2>
          <p className="percent">Click here to view open orders</p>
        </div>

        <div className={`gain-card ${overAllHoldingsDetails.totalprofitandloss < 0 ? 'negative negative_bg' : ''}`}>
          <span>isnegative : {isNegative}</span>
          <div className="card-header">
            <Target className={`h-8 w-8 ${isNegative ? 'trending_red' : 'postive'}`} />
            <p className={`title ${isNegative ? 'trending_red' : ''}`}>Total Gain/Loss</p>
          </div>
          <h2 className="amount">₹{overAllHoldingsDetails.totalprofitandloss?.toFixed(2) ?? "+0.00"}</h2>
          <p className={`percent ${isNegative ? 'trending_red' : ''}`}>({overAllHoldingsDetails.totalpnlpercentage?.toFixed(2) ?? 0}%)</p>
        </div>
        <div className="position-card" onClick={() => navigate("/holdings")} >
          <div className="card-header">
            <PieChart className="h-8 w-8 text-purple-600" />
            <p className="position_title">Positions</p>
          </div>
          <h2 className="amount">{uesrHoldingsData.length}</h2>
          <p className="holding_text">Active Holdings</p>
        </div>
      </div>



      {/* Dashboard Sections (static for now) */}
      <div className="dashboard">
        {/* Gainers */}
        <div className="section gainers">
          <div className="gainers-header">
            <TrendingUp className="h-8 w-8 treding_up_green" />
            <h3>Top Gainers</h3>
            <span className="auto mr_10">Today</span>
          </div>
          <div className="stock">
            <div className="info">
              <strong>NVDA</strong><span>NVIDIA Corporation</span>
            </div>
            <div className="price">
              <strong>$875.43</strong>
              <span className="gain">+45.23 (5.45%)</span>
            </div>
          </div>
        </div>

        {/* Losers */}
        <div className="section losers">
          <div className="gainers-header">
            <TrendingDown className="h-8 w-8 trending_red" />
            <h3>Top Losers</h3>
            <span className="auto mr_10">Top HOldings</span>
          </div>
          <div className="stock">
            <div className="info">
              <strong>META</strong><span>Meta Platforms Inc.</span>
            </div>
            <div className="price">
              <strong>$324.56</strong>
              <span className="loss">-15.43 (-4.54%)</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="section actions">
          <h2>Quick Actions</h2>
          <button className="buy">🛒 Buy Stocks</button>
          <button className="sell">💲 Sell Stocks</button>
          {/* <button className="ai">🤖 AI Trading Assistant</button> */}
          {/* <button className="ai" onClick={() => setChatOpen(true)}>
            🤖 AI Trading Assistant
          </button>
          <ChatWindow open={chatOpen} onClose={() => setChatOpen(false)} /> */}

        </div>
      </div>
    </div>
  );
}
