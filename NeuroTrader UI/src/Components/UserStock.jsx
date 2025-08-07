 import '../Styles/UserStock.css'; // CSS file for styling
export default function StockList({ holdings }) {
  return (
    <div className="stock_dashboard">
        <div className="w_full">
            <div>
            <h3>Your Stocks</h3>
            </div>
        <div className="stock">
        <div className="info">
            <strong>NVDA</strong>
            <span>NVIDIA Corporation</span>
        </div>
        <div className="price">
            <strong>$875.43</strong>
            <span className="gain">+45.23 (5.45%)</span>
        </div>
        </div>
    </div>
</div>

    //  <div className="dashboard">
    //     {/* Gainers */}
    //     <div className="section gainers">
    //       <div className="gainers-header">
    //         <h3>Top Gainers</h3>
    //         <span className="auto mr_10">Today</span>
    //       </div>
    //       <div className="stock">
    //         <div className="info">
    //           <strong>NVDA</strong><span>NVIDIA Corporation</span>
    //         </div>
    //         <div className="price">
    //           <strong>$875.43</strong>
    //           <span className="gain">+45.23 (5.45%)</span>
    //         </div>
    //       </div>
    //     </div>

    //   </div>
  );
}
