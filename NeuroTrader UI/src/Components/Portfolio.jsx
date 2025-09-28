import { useEffect, useState, useRef } from "react";
import {  PieChart,  Target,Aperture, IndianRupee} from "lucide-react";
import AngelOneApiCollection from "../BrokerPages/AngelOne/AngelOneApi";
import HoldingsResponse from "../Model/HoldingsResponse";
import TotalHolding from "../Model/TotalHolding";
import GlobalConstant from "../Constants/constant";
import LoggedOutUser from "./Logout";
import { useNavigate } from 'react-router-dom';
import Spinner from "../Components/Spinner"; 
import "../Styles/Portfolio.css";
import "../App.css"; 
import "../index.css"

export default function Portfolio() {
  const [userHoldingsData, setUserHoldingsData] = useState([]);
  const [overAllHoldingsDetails, setOverAllHoldingsDetails] = useState(null);
  const [topGainers, setTopGainers] = useState(null);
  const [topLosers, setTopLosers] = useState(null);
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
        if(response.message === GlobalConstant.InvalidToken || response.statusCode === 401){
          LoggedOutUser(navigate);
        }
        if(response.data != null && response.data.holdings != null){
          const data = new HoldingsResponse(response.data);
          setUserHoldingsData(response.data.holdings || []);
          setOverAllHoldingsDetails(response.data.totalholding || new TotalHolding());
          if(response.data.totalholding != null){
            let result = response.data.totalholding.totalpnlpercentage<0?true:false;
            setIsNegative(result);
            let marketData =  await AngelOneApiCollection.fetchMarketMovers()
            if(marketData != null && marketData.statusCode == 200 ){
              debugger
              setTopGainers(marketData.data[0].gainers);
              setTopLosers(marketData.data[1].losers);
            }

          }
          console.log("✅ All data fetched",data);
        }
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
    fetchAllData();
  }, []);

  if (error) {
    return <div className="portfolio-container"><p>{error}</p></div>;
  }

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
            ₹{overAllHoldingsDetails ? overAllHoldingsDetails.totalholdingvalue?.toFixed(2) : "0.00"}
          </h2>
        </div>

        <div className="change-card pointer" onClick={() => navigate("/Order")}>
          <div className="card-header">
            <Aperture className={`h-8 w-8 ${overAllHoldingsDetails?.totalprofitandloss >= 0 ? 'treding_up_green' : 'trending_red'}`} />
            <p className="title">Orders</p>
          </div>
          <h2 className="amount"></h2>
          <p className="percent">Click here to view open orders</p>
        </div>

        <div className={`gain-card ${overAllHoldingsDetails?.totalprofitandloss < 0 ? 'negative negative_bg' : ''}`}>
          <div className="card-header">
            <Target className={`h-8 w-8 ${isNegative ? 'trending_red' : 'postive'}`} />
            <p className={`title ${isNegative ? 'trending_red' : ''}`}>Total Gain/Loss</p>
          </div>
          <h2 className="amount">₹{overAllHoldingsDetails?.totalprofitandloss?.toFixed(2) ?? "+0.00"}</h2>
          <p className={`percent ${isNegative ? 'trending_red' : ''}`}>({overAllHoldingsDetails?.totalpnlpercentage?.toFixed(2) ?? 0}%)</p>
        </div>
        <div className="position-card" onClick={() =>{ 
            if (overAllHoldingsDetails) {
            navigate("/holdings");
            }
          }} >
          <div className="card-header">
            <PieChart className="h-8 w-8 text-purple-600" />
            <p className="position_title">Positions</p>
          </div>
          <h2 className="amount">{userHoldingsData.length}</h2>
          <p className="holding_text">Active Holdings</p>
        </div>
      </div>



      {/* Dashboard Sections (static for now) */}
      <div className="dashboard">
        <div className="section gainers">
          <div className="gainers-header">
            <h3 >Top Gainers</h3>
          </div>
          <div className="stocks-list">
            {topGainers && topGainers.map((holding, index) => (       
              <div className="stock" key={index}>
                <div className="info flex">
                  <span className="color_black ft_700">
                    {holding.stockName.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
                  </span>
                  <span>₹{holding.ltp}</span>
                </div>
                <div className="info flex mt_2p">
                  <span className="color_black">  {holding.symbol}     </span >
                  <span className="gain ft_700">{holding.todayPriceChange} ({holding.perChange}%)</span>
                </div>
              </div>
            ))}
          </div>

        </div>
        <div className="section losers">
          <div className="gainers-header">
            <h3 >Top Losers</h3>
          </div>
          <div className="stocks-list">
            {topLosers && topLosers.map((holding, index) => (       
              <div className="stock" key={index}>
                <div className="info flex">
                  <span className="color_black ft_700">
                    {holding.stockName.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
                  </span>
                  <span>₹{holding.ltp}</span>
                </div>
                <div className="info flex mt_2p">
                  <span className="color_black">  {holding.symbol}     </span >
                  <span className="loss ft_700">+ {holding.todayPriceChange} (+ {holding.perChange}%)</span>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Actions */}
        <div className="section actions">
          <h2>Quick Actions</h2>
          <button className="buy" onClick={() => navigate("/holdings")}>🛒 Buy Stocks</button>
          <button className="sell" onClick={() => navigate("/holdings")}>₹ Sell Stocks</button>

        </div>
      </div>
    </div>
  );
}
