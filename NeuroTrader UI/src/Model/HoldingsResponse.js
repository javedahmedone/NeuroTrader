import Holding from './HoldingsModel';
import TotalHolding from './TotalHolding';

export default class HoldingsResponse {
  constructor(apiResponse) {
    this.status = apiResponse.status;
    this.message = apiResponse.message;
    this.errorcode = apiResponse.errorcode;

    const data = apiResponse.data;
    this.holdings = data.holdings.map(item => new Holding(item));
    this.totalholding = new TotalHolding(data.totalholding);
  }
}
