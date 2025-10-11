import  { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AngelOneApiCollection from "../BrokerPages/AngelOne/AngelOneApi";
import "../Styles/SearchStocksModal.css";
import "../App.css";
import { TrendingUp } from "lucide-react";

const SearchStocksModal = ({ open, onClose }) => {
const [query, setQuery] = useState("");         // input text
const [suggestions, setSuggestions] = useState([]); // fetched stocks list
const navigate = useNavigate();

  // ✅ Move this OUTSIDE of useEffect
  const handleStockClick = (stock) => {
    console.log("Clicked stock:", stock);
    const payload = {
      stockSymbol: stock.stockSymbol,
      stockName: stock.stockName,
      isin: stock.isinNumber,
      token: stock.token,
    };
    navigate(`/stock/${stock.stockSymbol}`, { state: payload });
  };

  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]); // reset if input too short
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const res = await AngelOneApiCollection.fetchStocks(query);
        if (res.length > 0) {
          setSuggestions(res);
        }
      } catch (err) {
        console.error("Error fetching suggestions:", err);
      }
    };

    // debounce fetch (wait 300ms after typing stops)
    const delayDebounce = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(delayDebounce);
  }, [query]);

  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        {/* Header */}
        <div className="modal-header">
          <span className="modal-title">
            <TrendingUp /> Search Stocks
          </span>
          <button className="close-btn" onClick={onClose}>
            ✖
          </button>
        </div>

        {/* Search Bar */}
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by symbol or company name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* Stock List */}
        <div className="stock-list">
          <div className="flex">
            <p className="w_50p"><b>Stock Symbol</b></p>
            <p className="w_50p"><b>Company Name</b></p>
          </div>
          {suggestions.length === 0 && query.length >= 2 ? (
            <p className="no-results">No results found</p>
          ) : (
            suggestions.map((stock, idx) => (
              <div
                key={idx}
                className="stock-item cursor-pointer"
                onClick={() =>
                  handleStockClick({
                    stockSymbol: stock.stockSymbol,
                    stockName: stock.stockName,
                    isinNumber: stock.isinNumber,
                    token: stock.stockToken,
                  })
                }
              >
                <div className="w_50p">
                  <strong>{stock.stockSymbol}</strong>
                </div>
                <div className="w_50p">
                  <span>{stock.stockName}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchStocksModal;
