import GlobalConstant from "../Constants/constant";

export default function ChatMessage({ message }) {
  debugger
  if (message.type === GlobalConstant.HOLDINGS) {
    const holdings = Array.isArray(message.data) ? message.data : [message.data];

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

  if (message.type === GlobalConstant.UNKNOWN) {
    return (
      <div>
        Sorry, I didn’t understand that
        {/* 📈 Current price of <strong>{stock}</strong> is ₹{price} */}
      </div>
    );
  }

  if (message.type === GlobalConstant.BUYORDER || message.type == GlobalConstant.GETORDERS || message.type == GlobalConstant.SELLORDER || message.type === GlobalConstant.CANCELORDER) {
    
    const orders = Array.isArray(message.data) ? message.data : [message.data];
    if(orders.length == 0){
      return(
        <div> No orders to show</div>
      );
    }
    if(orders[0].status === false){
      const message = orders[0].message
      return(
        <div>{message}</div>
      );
    }
    if(orders[0].success === false){
      const message = orders[0].message
      const errorMessage =  orders[0].error
      if(message.toLowerCase().includes("authorised") || message.toLowerCase().includes("edis") )
       return(
        <div> Please setup you TPIN from your app, or try to sell one order from your broker</div>
      );
      if(errorMessage === "CODE01" )
       return(
        <div>{message}</div>
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
