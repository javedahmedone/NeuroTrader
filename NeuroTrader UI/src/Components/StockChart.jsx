import { useState, useEffect, useMemo, useRef } from "react";
import Chart from "react-apexcharts";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import AngelOneApiCollection from "../BrokerPages/AngelOne/AngelOneApi";
import LoggedOutUser from "./Logout";
import "../Styles/StockChart.css";

const StockCandleChart = () => {
  const location = useLocation();
  const params = useParams();
  const { symbol } = params;
  const payload = location.state;
  const navigate = useNavigate();
  const hasFetched = useRef(false);

  const [selected, setSelected] = useState("ONEDAY");
  const [interval, setInterval] = useState("ONEDAY");
  const [isMarketOpen, setIsMarketOpen] = useState(false);
  const [candles, setCandles] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Main fetch function
  const fetchData = async (selectedInterval = interval) => {
    try {
      setLoading(true);

      const status = await AngelOneApiCollection.fetchMarketIsOpen();
      setIsMarketOpen(status);

      if (!status) {
        const res = await AngelOneApiCollection.fetchStocksDataById(
          payload.stockSymbol,
          payload.token,
          payload.isin,
          selectedInterval
        );

        if (res.statusCode === 401) {
          LoggedOutUser(navigate);
          return;
        }

        setCandles(res.data || []);
      } else {
        console.log("🟢 Market is live — switch to WebSocket feed instead");
      }
    } catch (err) {
      console.error("❌ Error fetching market data:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Initial fetch (only once)
  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    fetchData("ONEDAY");
  }, [payload, navigate]);

  // ✅ Interval change handler
  const handleSelect = (intervalRange) => {
    setSelected(intervalRange);
    setInterval(intervalRange);
    fetchData(intervalRange);
  };

// ✅ Transform API candle array → ApexCharts data format
const seriesData = useMemo(() => {
  if (!candles || candles.length === 0) return [];
  return candles.map(candle => ({
    x: new Date(candle[0]).toLocaleString("en-IN", { 
      day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit"
    }), // label only
    y: candle[4], // close price
  }));
}, [candles]);

// ✅ Decide chart color dynamically based on first & last candle
const chartColor = useMemo(() => {
  if (!candles || candles.length < 2) return "#04b488"; // default green
  const startPrice = candles[0][4];
  const endPrice = candles[candles.length - 1][4];
  return endPrice >= startPrice ? "#04b488" : "#ff4d4d"; // green or red
}, [candles]);

// ✅ ApexCharts Config
const chartData = useMemo(() => ({
  series: [
    {
      name: "Close Price",
      data: seriesData.map(item => item.y),
    },
  ],
  options: {
    chart: {
      type: "line",
      height: 350,
      zoom: { enabled: true },
    },
    title: {
      text:  payload?.stockSymbol,
      align: "left",
    },
    xaxis: {
      type: "category",
      categories: seriesData.map(item => item.x),
      labels: { show: false },
      axisTicks: { show: false },
      axisBorder: { show: false },
    },
    grid: {
      xaxis: { lines: { show: false } },
    },
    yaxis: {
      decimalsInFloat: 2,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    colors: [chartColor], // ✅ Dynamic color based on performance
    tooltip: {
      x: { show: true },
      y: { formatter: val => `₹${val}` },
    },
  },
}), [seriesData, chartColor, symbol, payload]);



  // ✅ Available intervals
  const intervals = [
    { label: "NSE", value: "NSE" },
    { label: "1D", value: "ONEDAY" },
    { label: "1W", value: "ONEWEEK" },
    { label: "1M", value: "ONEMONTH" },
    { label: "3M", value: "THREEMONTH" },
    { label: "6M", value: "SIXMONTH" },
    { label: "1Y", value: "ONEYEAR" },
    { label: "5Y", value: "FIVEYEAR" },
    { label: "All", value: "ALL" },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h3>Market is {isMarketOpen ? "Open 🟢" : "Closed 🔴"}</h3>

      <div>
        <Chart options={chartData.options} series={chartData.series} type="line" height={350} />

      </div>
      {/* {loading ? (
        <p>Loading stock data...</p>
      ) : (
        <Chart options={chartData.options} series={chartData.series} type="line" height={350} />
      )} */}

      {/* ✅ Time range buttons */}
      <div className="time-range-container" style={{ marginTop: "15px" }}>
        {intervals.map((item) => (
          <button
            key={item.value}
            className={`time-btn ${selected === item.value ? "active" : ""}`}
            onClick={() => handleSelect(item.value)}
            disabled={loading && selected === item.value}
          >
            {item.label}
          </button>
        ))}

        <button
          className={`time-btn icon-btn ${selected === "candlestick" ? "active" : ""}`}
          onClick={() => handleSelect("candlestick")}
          disabled={loading && selected === "candlestick"}
        >
          📊
        </button>

        <button
          className={`time-btn terminal-btn ${selected === "terminal" ? "active" : ""}`}
          onClick={() => handleSelect("terminal")}
          disabled={loading && selected === "terminal"}
        >
          ⚙️ Terminal
        </button>
      </div>
    </div>
  );
};

export default StockCandleChart;
