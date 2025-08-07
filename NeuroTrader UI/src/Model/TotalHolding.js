export default class TotalHolding {
  constructor(data) {
    this.totalholdingvalue = data.totalholdingvalue || 0;
    this.totalinvvalue = data.totalinvvalue || 0;
    this.totalprofitandloss = data.totalprofitandloss || 0;
    this.totalpnlpercentage = data.totalpnlpercentage || 0;
  }
}
