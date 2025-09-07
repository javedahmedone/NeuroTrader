import { useEffect, useState, useRef } from "react";
import AngelOneApiCollection from "../BrokerPages/AngelOne/AngelOneApi";
import GlobalConstant from "../Constants/constant";
import LoggedOutUser from "./Logout";
import { useNavigate } from 'react-router-dom';
import Spinner from "../Components/Spinner"; // ✅ Import the loader
import "../Styles/Order.css";
import CancelOrderRequestModel from "../Model/CancelOrderModel";

export default function Order () {
    const [userOrders, setUserOrders] = useState([]);
    const [error, setError] = useState(null);
    const hasFetched = useRef(false);  
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true); // ✅ Loader state
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
    const fetchAllData = async () => {
      try {
        const response = await AngelOneApiCollection.fetchUserOrders();
        if(response.message === GlobalConstant.InvalidToken){
          LoggedOutUser(navigate);
        }
        if(response.data != null){
          setUserOrders(response.data)
        }
        console.log("✅ All data fetched",response);
      } catch (error) {
        if(error.message.includes('401')){
            LoggedOutUser(navigate);
        }
        console.error("❌ Error fetching portfolio data:", error);
        setError("Failed to load portfolio data.");
      }
      finally {
        setLoading(false); // ✅ Hide loader after fetch
      }
    };

    const cancelOrder = async (orderId) => {
      try {
        setLoading(true); // ✅ Show loader
        const obj =  CancelOrderRequestModel;
        obj.variety = "regular";  
        obj.orderid = orderId;
        const response = await AngelOneApiCollection.cancelUserOrders(obj);
        if(response !==null){
          alert("Order cancelled successfully");
          fetchAllData(); // Refresh orders after cancellation
        } else {
          alert("Failed to cancel order: " + response.message);
        }
      } catch (error) {
        console.error("❌ Error cancelling order:", error);
        alert("Error cancelling order. Please try again.");
      }
    };

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    fetchAllData();
  }, []);

  return (
    <div className="orders-container">
      <h2>Orders <span className="badge">{userOrders.length}</span></h2>

    <div className="table-wrapper">
      <table className="orders-table">
        <thead>
        <tr>
            <th className="font_18">Symbol</th>
            <th className="font_18">Name</th>
            <th className="font_18">Quantity</th>
            <th className="font_18">Status</th>
            <th className="font_18">Order Status</th>
            <th className="font_18">Order Time</th>
            <th className="font_18">Transaction Type</th>
            <th className="font_18">Cancel Order</th>
          </tr>
        </thead>
        <tbody>
          {userOrders.map((order, i) => (
            <tr key={i}>
              <td><b>{order.symbol}</b></td>
              <td>{order.name}</td>
              <td>{order.quantity}</td>
              <td>{order.status}</td>
              <td>{order.orderstatus}</td>
              <td>{order.updatetime}</td>
              
              <td>{order.transactiontype}</td>            
             <td>
            {order.status === "open" ? (
              <button onClick={() =>cancelOrder(order.orderid)} >Cancel order</button>
            ) : (
              <span title="you cannot cancel order which is processed by broker">Cancel order</span>
            )}
          </td>
            </tr>
          ))}
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
};

// export default Holdings;
