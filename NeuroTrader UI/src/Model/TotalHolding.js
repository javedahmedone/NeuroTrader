export default class TotalHolding {
  constructor(data) {
    this.totalholdingvalue = data !== undefined ? data.totalholdingvalue : 0;
    this.totalinvvalue = data !== undefined? data.totalinvvalue : 0;
    this.totalprofitandloss = data !== undefined ? data.totalprofitandloss : 0;
    this.totalpnlpercentage = data !== undefined ? data.totalpnlpercentage : 0;
  }
}
