import GlobalConstant from "../Constants/constant";
export default function ChatMessage({ message }) {
  if (message.type === GlobalConstant.HOLDINGS) {
    const holdings = Array.isArray(message.data) ? message.data : [message.data];
    if(holdings.length == 0){
      return(
        <div className="font_18">You don't have any holdings</div>
      );
    }
   return (
  <div>
    <div className="font_18"><strong>📊 Holding Summary</strong></div>
    {holdings.filter(holding => holding.quantity !== 0).map((holding, index) => ( 
      <div key={index} style={{ marginBottom: '12px' }}>
        <div className="font_18"><b>#{index + 1}</b></div>
        <div className="font_18"><b>Stock:</b> {holding.symbol}</div>
        <div className="font_18"><b>Name:</b> {holding.name}</div>
        <div className="font_18"><b>Quantity:</b> {holding.quantity}</div>
        <div className="font_18"><b>Avg Price:</b> ₹{holding.average_price}</div>
        <div className="font_18"><b>Current Price:</b> ₹{holding.current_price}</div>
        <div className="font_18">  <b>Profit:</b> {(((holding.current_price - holding.average_price) / holding.average_price) * 100).toFixed(2)}%</div>
      </div>
    ))}
  </div>
);
}

  if (message.type === GlobalConstant.ANALYZEPORTFOLIO) {
   return (
    <div>
      {message.data.split("\n").map((line, i) => (
        <p key={i}>
          {line.split(/(\*\*.*?\*\*)/).map((part, j) => {
            if (part.startsWith("**") && part.endsWith("**")) {
              return <strong key={j}>{part.slice(2, -2)}</strong>;
            }
            return <span key={j}>{part}</span>;
          })}
        </p>
      ))}
    </div>
  );
  }

  if (message.type === GlobalConstant.CANCELORDERERROR) {
    const orders = Array.isArray(message.data) ? message.data : [message.data];
    return (
      <div className="font_18"><b>Error: </b>   {orders[0].errorMessage}</div>
    );
  }

   if (message.type === GlobalConstant.UNKNOWN) {
    return (
      <div>Sorry, I didn’t understand that </div>
    );
  }

    if (message.type === GlobalConstant.VALIDATIONERROR) {
    return (
      <div className="font_18"> <b>Error</b>:  {message.data.errorMessage} </div>
    );
  }

  if (message.type === GlobalConstant.BUYORDER || message.type == GlobalConstant.GETORDERS || message.type == GlobalConstant.SELLORDER || message.type === GlobalConstant.CANCELORDER) {
    if(message.data.status === GlobalConstant.ERROR){
      const errorMessage = message.data.errorMessage
      if(errorMessage.toLowerCase().includes("authorised") || errorMessage.toLowerCase().includes("edis")){
        return(
          <div> Please setup you TPIN from your app, or try to sell one order from your broker</div>
        );
      }
      else{
        return(
          <div className="font_18"><b>Error:</b> {errorMessage} </div>
        );
      }
    }
    const orders = Array.isArray(message.data.data) ? message.data.data : [message.data.data];

    if(orders.length == 0){
      return(
        <div> No orders to show</div>
      );
    }
   return (
  <div>
    <div className="font_18"><strong>📊 Order Summary</strong></div>
    {orders.map((item, index) => (
      <div key={index} style={{ marginBottom: '12px' }}>
        <div className="font_18"><b>#{index + 1}</b></div>
        <div className="font_18"><b>Stock:</b> {item.symbol}</div>
        <div className="font_18"><b>Name:</b> {item.name}</div>
        <div className="font_18"><b>Quantity:</b> {item.quantity}</div>
        <div className="font_18"><b>Status:</b> {item.status}</div>
        <div className="font_18"><b>Order Status:</b> {item.orderstatus}</div>
        <div className="font_18"><b>Order type:</b> {item.orderType}</div>
        <div className="font_18">
          <b>{item.transactiontype === GlobalConstant.BUY ? "Buy Price:" : "Sell Price:"}</b> ₹{item.price}
        </div>
        <div className="font_18"><b> Order Id:</b> {item.orderid}</div>
        <div className="font_18"><b>Transaction type:</b> {item.transactiontype}</div>
        {item.text && item.text.trim() !== "" && (
          <div className="font_18"><b>Rejection Reason:</b> {item.text}</div>
        )}
      </div>
    ))}
  </div>
);

  }

  // Default fallback
  return <div>{message.text}</div>;
}
