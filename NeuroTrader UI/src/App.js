// App.js
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./Components/LoginForm";
import Portfolio from "./Components/Portfolio";
import Holdings from "./Components/Holdings";
import Spinner from "./Components/Spinner";
import Layout from "./Layout"; 
import Order from "./Components/Order";
import AngelOneSetupGuide from "./BrokerPages/AngelOne/AngelOneSetup";
import UpstoxCallback from "./BrokerPages/Upstox/UpstoxCallback";
import StockChart from "./Components/StockChart";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Routes WITHOUT header */}
        <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/angelOneSetupGuide" element={<AngelOneSetupGuide />} />
        <Route path="/callback/upstox" element={<UpstoxCallback />} />


        {/* Routes WITH header */}
        <Route element={<Layout />}>
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/holdings" element={<Holdings />} />
          <Route path="/order" element={<Order />} />
          <Route path="/spinner" element={<Spinner />} />
          <Route path="/stock/:name" element={<StockChart />} />
        </Route>
      </Routes>
    </Router>
  );
}
