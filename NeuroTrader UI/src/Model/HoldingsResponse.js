import BrokerConstant from '../Constants/BrokerConstants';
import GlobalConstant from '../Constants/constant';
import Holding from './HoldingsModel';
import TotalHolding from './TotalHolding';

export default class HoldingsResponse {
  constructor(apiResponse) {
    // this.status = apiResponse.status ?? null;
    // this.message = apiResponse.message ?? null;
    // this.errorcode = apiResponse.errorcode ?? null;

    // const data = apiResponse.data;
    // this.holdings = data.length >0 ? data.holdings.map(item => new Holding(item)) : null ;
    apiResponse.holdings.map(item => new Holding(item))
    if(sessionStorage.getItem(GlobalConstant.BROKERNAME === BrokerConstant.AngelOne)){
      this.totalholding = new TotalHolding(apiResponse.totalholding);
    }
  }
}
