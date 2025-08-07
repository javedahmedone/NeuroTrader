// App.js
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./Components/LoginForm";
import Portfolio from "./Components/Portfolio";
import StockList from "./Components/UserStock";
import Holdings from "./Components/Holdings";
import GeminiPromptTester from "./Components/GeminiPromptTester";
import Layout from "./Layout"; // <- import layout with header
import Order from "./Components/Order";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Routes WITHOUT header */}
        <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/test" element={<GeminiPromptTester />} />

        
        {/* Routes WITH header */}
        <Route element={<Layout />}>
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/userStocks" element={<StockList />} />
          <Route path="/holdings" element={<Holdings />} />
          <Route path="/order" element={<Order />} />

        </Route>
      </Routes>
    </Router>
  );
}
