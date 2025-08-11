import { useEffect, useState, useRef } from "react";
import AngelOneApiCollection from "../BrokerPages/AngelOneApi";
import GlobalConstant from "../Constants/constant";
import LoggedOutUser from "./Logout";
import { useNavigate } from 'react-router-dom';
import Spinner from "../Components/Spinner"; // ✅ Import the loader
import "../Styles/Order.css";

export default function Order () {
    const [userOrders, setUserOrders] = useState([]);
    const [error, setError] = useState(null);
    const hasFetched = useRef(false);  
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true); // ✅ Loader state

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchAllData = async () => {
      try {
        const response = await AngelOneApiCollection.fetchUserOrders();
        if(response.message === GlobalConstant.InvalidToken){
          LoggedOutUser(navigate);
        }
        if(response.length != 0){
          setUserOrders(response)
        }
        console.log("✅ All data fetched",response);
      } catch (err) {
        console.error("❌ Error fetching portfolio data:", err);
        setError("Failed to load portfolio data.");
      }finally {
        setLoading(false); // ✅ Hide loader after fetch
      }
    };

    fetchAllData();
  }, []);

  if (loading) {
    return <Spinner />;
  }
  return (
    <div className="orders-container">
      <h2>Orders <span className="badge">{userOrders.length}</span></h2>

    <div className="table-wrapper">
      <table className="orders-table">
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Order Status</th>
            <th>Order Time</th>
            <th>Transaction Type</th>
            <th>Cancel Order</th>

          </tr>
        </thead>
        <tbody>
          {userOrders.map((order, i) => (
            <tr key={i}>
              <td>{order.symbol}</td>
              <td>{order.name}</td>
              <td>{order.quantity}</td>
              <td>{order.status}</td>
              <td>{order.orderstatus}</td>
              <td>{order.updatetime}</td>
              
              <td>{order.transactiontype}</td>

              {/* <td><button value={order.orderid}>Cancel order</button></td> */}
            
             <td>
            {order.transactiontype === "open" ? (
              <button value={order.orderid}>Cancel order</button>
            ) : (
              <span title="you cannot cancel order which is processed by broker">Cancel order</span>
            )}
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
