export default class Holding {
  constructor(data) {
    this.tradingsymbol = data.tradingsymbol;
    this.exchange = data.exchange;
    this.isin = data.isin;
    this.t1quantity = data.t1quantity;
    this.realisedquantity = data.realisedquantity;
    this.quantity = data.quantity;
    this.authorisedquantity = data.authorisedquantity;
    this.product = data.product;
    this.collateralquantity = data.collateralquantity;
    this.collateraltype = data.collateraltype;
    this.haircut = data.haircut;
    this.averageprice = data.averageprice;
    this.ltp = data.ltp;
    this.symboltoken = data.symboltoken;
    this.close = data.close;
    this.profitandloss = data.profitandloss;
    this.pnlpercentage = data.pnlpercentage;
  }
}


