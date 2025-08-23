import React, { useState, useEffect } from "react";
import "../Styles/SearchStocksModal.css";
import AngelOneApiCollection from "../BrokerPages/AngelOne/AngelOneApi";
import "../App.css"
import { TrendingUp } from "lucide-react";

const SearchStocksModal = ({ open, onClose }) => {
  const [query, setQuery] = useState("");         // input text
  const [suggestions, setSuggestions] = useState([]); // fetched stocks list

  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]); // reset if input too short
      return;
    }

    const fetchSuggestions = async () => {
      try {
        debugger
        const res = await AngelOneApiCollection.fetchStocks(query);
        if(res.length> 0){
            setSuggestions(res);  // ✅ store results in suggestions
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
          <span className="modal-title"><TrendingUp></TrendingUp> Search Stocks</span>
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
              <div key={idx} className="stock-item">
                <div className="w_50p">
                  <strong>{stock.symbol}</strong>
                </div>
                <div className="w_50p">
                  <span>{stock.company_name}</span  >
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
